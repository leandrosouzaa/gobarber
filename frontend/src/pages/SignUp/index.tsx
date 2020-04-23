import React from 'react';

import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';

import { Input, Button } from '../../components';
import { Container, Content, Background } from './styles';

import logo from '../../assets/logo.svg';

const SignUp: React.FC = () => {
   function handleSubmit(data: object): void {
      console.log(data);
   }

   return (
      <Container>
         <Background />
         <Content>
            <img src={logo} alt="Go Barber" />
            <Form onSubmit={handleSubmit}>
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
            </Form>
            <a href="forgot">
               <FiArrowLeft />
               Voltar para o logon
            </a>
         </Content>
      </Container>
   );
};

export default SignUp;
