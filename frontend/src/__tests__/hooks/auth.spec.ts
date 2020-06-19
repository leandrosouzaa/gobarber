import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { useAuth, AuthProvider } from '../../hooks/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
   it('shoud be able to signIn', async () => {
      apiMock.onPost('sessions').reply(200, {
         user: {
            id: '1',
            email: 'johndoe@example.com',
            name: 'John Doe',
         },
         token: 'token-123',
      });

      const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
         wrapper: AuthProvider,
      });

      const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

      result.current.signIn({
         email: 'johndoe@example.com',
         password: '123456',
      });

      await waitForNextUpdate();

      expect(setItemSpy).toHaveBeenCalled();
      expect(setItemSpy).toHaveBeenCalled();
   });

   it('should restore saved data from storage when auth inits', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
         switch (key) {
            case '@GoBarber:token':
               return 'token-123';
            case '@GoBarber:user':
               return JSON.stringify({
                  user: {
                     id: '1',
                     email: 'johndoe@example.com',
                     name: 'John Doe',
                  },
               });
            default:
               return null;
         }
      });

      const { result } = renderHook(() => useAuth(), {
         wrapper: AuthProvider,
      });

      expect(result.current.user.email).toEqual('johndoe@example.com');
   });

   it('should be able to sign out', async () => {
      jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
         switch (key) {
            case '@GoBarber:token':
               return 'token-123';
            case '@GoBarber:user':
               return JSON.stringify({
                  user: {
                     id: '1',
                     email: 'johndoe@example.com',
                     name: 'John Doe',
                  },
               });
            default:
               return null;
         }
      });

      const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

      const { result } = renderHook(() => useAuth(), {
         wrapper: AuthProvider,
      });

      act(() => {
         result.current.signOut();
      });

      expect(removeItemSpy).toBeCalledTimes(2);
      expect(result.current.user).toBeUndefined();
   });

   it('should be able to update user data', async () => {
      const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

      const { result } = renderHook(() => useAuth(), {
         wrapper: AuthProvider,
      });

      const user = {
         id: '1',
         email: 'johndoe@example.com',
         name: 'John Doe',
         avatar_url: 'image',
      };

      act(() => {
         result.current.updateUser(user);
      });

      expect(setItemSpy).toHaveBeenCalledWith(
         '@GoBarber:user',
         JSON.stringify(user),
      );

      expect(result.current.user).toEqual(user);
   });
});
