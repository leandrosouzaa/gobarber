import React, { ButtonHTMLAttributes } from 'react';

import { FiLock } from 'react-icons/fi';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
   <Container isLoading={loading} type="button" {...rest}>
      {loading ? <FiLock size={20} /> : children}
   </Container>
);

export default Button;
