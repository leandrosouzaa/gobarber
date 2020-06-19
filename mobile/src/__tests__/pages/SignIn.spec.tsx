import React from 'react';
import { render } from 'react-native-testing-library';

import { SignIn } from '../../pages';

jest.mock('@react-navigation/native', () => {
   return {
      useNavigation: jest.fn(),
   };
});

jest.mock('react-native-image-picker', () => ({}));

describe('SignIn page', () => {
   it('should contains email/password inputs', () => {
      const { getByPlaceholder } = render(<SignIn />);

      expect(getByPlaceholder('E-mail')).toBeTruthy();
      expect(getByPlaceholder('Senha')).toBeTruthy();
   });
});
