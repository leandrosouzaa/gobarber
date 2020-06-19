import { renderHook } from '@testing-library/react-hooks';
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
});
