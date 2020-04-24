import React, { useRef, useCallback } from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErros from '../../utils/getValidationErrors';
import { Input, Button } from '../../components';
import { Container, Content, Background } from './styles';

import logo from '../../assets/logo.svg';

interface SignInFormData {
   email: string;
   password: string;
}

const SignIn: React.FC = () => {
   const formRef = useRef<FormHandles>(null);

   const { signIn } = useAuth();
   const { addToast } = useToast();

   const handleSubmit = useCallback(
      async (data: SignInFormData): Promise<void> => {
         try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
               email: Yup.string()
                  .required('E-mail obrigatório')
                  .email('Digite um e-mail válido'),
               password: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, {
               abortEarly: false,
            });

            await signIn({ email: data.email, password: data.password });
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErros(err);

               formRef.current?.setErrors(errors);
               return;
            }

            addToast({
               type: 'error',
               title: 'Erro na autenticação',
               description:
                  'Ocorreu um erro ao fazer login, cheque as credenciais',
            });
         }
      },
      [signIn, addToast],
   );

   return (
      <Container>
         <Content>
            <img src={logo} alt="Go Barber" />
            <Form ref={formRef} onSubmit={handleSubmit}>
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
            </Form>
            <a href="forgot">
               <FiLogIn />
               Criar Conta
            </a>
         </Content>
         <Background />
      </Container>
   );
};

export default SignIn;
