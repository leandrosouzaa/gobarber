import React, {
   createContext,
   useCallback,
   useState,
   useContext,
   useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface SignInCredentials {
   password: string;
   email: string;
}

interface AuthContextData {
   signIn(credentials: SignInCredentials): Promise<void>;
   signOut(): void;
   user: User;
   loading: boolean;
}

interface AuthState {
   token: string;
   user: User;
}

interface User {
   id: string;
   name: string;
   email: string;
   avatar_url: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
   const [data, setData] = useState<AuthState>({} as AuthState);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function loadStoragedData(): Promise<void> {
         const [token, user] = await AsyncStorage.multiGet([
            '@GoBarber:token',
            '@GoBarber:user',
         ]);

         if (token[1] && user[1]) {
            setData({ token: token[1], user: JSON.parse(user[1]) });
            api.defaults.headers.authorization = `Bearer ${token[1]}`;
         }

         setLoading(false);
      }

      loadStoragedData();
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

      api.defaults.headers.authorization = `Bearer ${token}`;

      await AsyncStorage.multiSet([
         ['@GoBarber:token', token],
         ['@GoBarber:user', JSON.stringify(user)],
      ]);

      setData({ token, user });
   }, []);

   const signOut = useCallback(async () => {
      await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

      setData({} as AuthState);
   }, []);

   return (
      <AuthContext.Provider
         value={{ user: data.user, loading, signIn, signOut }}
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
