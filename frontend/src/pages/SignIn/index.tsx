import React from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Input, Button } from '../../components';
import { Container, Content, Background } from './styles';

import logo from '../../assets/logo.svg';

const SignIn: React.FC = () => (
   <Container>
      <Content>
         <img src={logo} alt="Go Barber" />
         <form>
            <h1>Faça seu logon</h1>
            <Input icon={FiMail} name="email" placeholder="E-mail" />

            <Input
               icon={FiLock}
               name="password"
               type="password"
               placeholder="Sua senha Secreta"
            />
            <Button type="submit">Entrar</Button>

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
