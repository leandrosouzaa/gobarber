import React from 'react';

import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';

import { Input, Button } from '../../components';
import { Container, Content, Background } from './styles';

import logo from '../../assets/logo.svg';

const SignUp: React.FC = () => (
   <Container>
      <Background />
      <Content>
         <img src={logo} alt="Go Barber" />
         <form>
            <h1>Faça seu cadastro</h1>
            <Input icon={FiUser} name="name" placeholder="Nome" />
            <Input icon={FiMail} name="email" placeholder="E-mail" />
            <Input
               icon={FiLock}
               name="password"
               type="password"
               placeholder="Sua senha Secreta"
            />
            <Button type="submit">Cadastrar</Button>
         </form>
         <a href="forgot">
            <FiArrowLeft />
            Voltar para o logon
         </a>
      </Content>
   </Container>
);

export default SignUp;
