import React, {
   createContext,
   useCallback,
   useState,
   useContext,
   useEffect,
} from 'react';

import api from '../services/api';
import { useToast } from './toast';

interface SignInCredentials {
   password: string;
   email: string;
}

interface User {
   id: string;
   avatar_url: string;
   name: string;
   email: string;
}

interface AuthContextData {
   signIn(credentials: SignInCredentials): Promise<void>;
   signOut(): void;
   user: User;
   updateUser(user: User): void;
}

interface AuthState {
   token: string;
   user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
   const { addToast } = useToast();
   const [data, setData] = useState<AuthState>(() => {
      const token = localStorage.getItem('@GoBarber:token');
      const user = localStorage.getItem('@GoBarber:user');

      if (token && user) {
         api.defaults.headers.authorization = `Bearer ${token}`;

         return { token, user: JSON.parse(user) };
      }

      return {} as AuthState;
   });

   const signIn = useCallback(async ({ email, password }) => {
      const response = await api.post('/sessions', {
         email,
         password,
      });
      const { token, user } = response.data;

      if (user.avatar_url === null) {
         user.avatar_url =
            'https://api.adorable.io/avatars/800/b3c5f6c3fdd85798590175b953e10217.png';
      }

      localStorage.setItem('@GoBarber:token', token);
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });
   }, []);

   const signOut = useCallback(() => {
      localStorage.removeItem('@GoBarber:token');
      localStorage.removeItem('@GoBarber:user');

      setData({} as AuthState);
   }, []);

   const updateUser = useCallback(
      (user: User) => {
         setData({
            token: data.token,
            user,
         });

         localStorage.setItem('@GoBarber:user', JSON.stringify(user));
      },
      [data.token, setData],
   );

   useEffect(() => {
      if (!data.token) {
         return;
      }

      api.get('/sessions/validate').catch(() => {
         signOut();

         alert('Sessão expirada, entre novamente');
      });
   }, [addToast, data.token, signOut]);

   return (
      <AuthContext.Provider
         value={{ user: data.user, signIn, signOut, updateUser }}
      >
         {children}
      </AuthContext.Provider>
   );
};

function useAuth(): AuthContextData {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }

   return context;
}

export { AuthProvider, useAuth };
