import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
   return {
      useHistory: () => ({ push: mockedHistoryPush }),
      Link: ({ children }: { children: React.ReactNode }) => children,
   };
});

describe('SignIn Page', () => {
   it('shoud be able to sign in', () => {
      const { getByPlaceholderText, getByText } = render(<SignIn />);

      const emailField = getByPlaceholderText('E-mail');
      const passwordField = getByPlaceholderText('Sua senha Secreta');
      const buttonElement = getByText('Entrar');

      fireEvent.change(emailField, {
         target: { value: 'johndoe@example.com' },
      });
      fireEvent.change(passwordField, {
         target: { value: 'secretpassword' },
      });

      fireEvent.click(buttonElement);

      expect(mockedHistoryPush).toHaveBeenCalledWith('/Dashboard');
   });
});
