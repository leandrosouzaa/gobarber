import React, { useCallback } from 'react';

import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Input, Button } from '../../components';
import { Container, Content, Background } from './styles';

import logo from '../../assets/logo.svg';

const SignUp: React.FC = () => {
   const handleSubmit = useCallback(async (data: object): Promise<void> => {
      try {
         const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            email: Yup.string()
               .required('E-mail obrigatório')
               .email('Digite um e-mail válido'),
            password: Yup.string().min(6, 'No mínimo 6 dígitos'),
         });

         await schema.validate(data, {
            abortEarly: false,
         });
      } catch (err) {
         console.log(err);
      }
   }, []);

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
