import { renderHook } from '@testing-library/react-hooks';
import { useAuth, AuthProvider } from '../../hooks/auth';

describe('Auth hook', () => {
   it('shoud be able to signIn', () => {
      const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

      result.current.signIn({
         email: 'johndoe@example.com.br',
         password: '123456',
      });

      expect(result.current.user.email).toEqual('johndoe@example.com.br');
   });
});
