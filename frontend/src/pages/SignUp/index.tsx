import React, { useCallback, useRef } from 'react';

import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import getValidationErros from '../../utils/getValidationErrors';
import { Input, Button } from '../../components';
import { Container, Content, Background, AnimationContainer } from './styles';

import logo from '../../assets/logo.svg';

const SignUp: React.FC = () => {
   const formRef = useRef<FormHandles>(null);

   const handleSubmit = useCallback(async (data: object): Promise<void> => {
      try {
         formRef.current?.setErrors({});

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
         const errors = getValidationErros(err);
         formRef.current?.setErrors(errors);
      }
   }, []);

   return (
      <Container>
         <Background />
         <Content>
            <AnimationContainer>
               <img src={logo} alt="Go Barber" />
               <Form ref={formRef} onSubmit={handleSubmit}>
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
               <Link to="/">
                  <FiArrowLeft />
                  Voltar para o logon
               </Link>
            </AnimationContainer>
         </Content>
      </Container>
   );
};

export default SignUp;
