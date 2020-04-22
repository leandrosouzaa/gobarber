import React from 'react';

import { FiLogIn } from 'react-icons/fi';

import { Container, Content, Background } from './styles';

import logo from '../../assets/logo.svg';

const SignIn: React.FC = () => (
   <Container>
      <Content>
         <img src={logo} alt="Go Barber" />
         <form>
            <h1>Faça seu logon</h1>
            <input placeholder="E-mail" />

            <input type="password" placeholder="Sua senha Secreta" />

            <button type="submit">Entrar</button>

            <a href="forgot">Esqueci Minha senha</a>
         </form>
         <a href="forgot">
            <FiLogIn />
            Criar Conta
         </a>
      </Content>
      <Background />
   </Container>
);

export default SignIn;
