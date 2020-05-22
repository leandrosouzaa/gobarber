import React, { useRef, useCallback } from 'react';

import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import getValidationErros from '../../utils/getValidationErrors';
import { Input, Button } from '../../components';
import { Container, Content, AnimationContainer } from './styles';

import logo from '../../assets/logo.svg';

interface ResetPasswordFormData {
   password: string;
   password_confirmation: string;
}

const SignIn: React.FC = () => {
   const history = useHistory();

   const formRef = useRef<FormHandles>(null);

   const { addToast } = useToast();

   const handleSubmit = useCallback(
      async (data: ResetPasswordFormData): Promise<void> => {
         try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
               password: Yup.string().required('Senha obrigatória'),
               password_confirmation: Yup.string().oneOf(
                  [Yup.ref('password'), null],
                  'As senhas não coincidem',
               ),
            });

            await schema.validate(data, {
               abortEarly: false,
            });

            history.push('/signin');
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErros(err);

               formRef.current?.setErrors(errors);
               return;
            }

            addToast({
               type: 'error',
               title: 'Erro ao resetar senha',
               description:
                  'Ocorreu um erro ao resetar sua senha, tente novamente',
            });
         }
      },
      [addToast, history],
   );

   return (
      <Container>
         <Content>
            <AnimationContainer>
               <img src={logo} alt="Go Barber" />
               <Form ref={formRef} onSubmit={handleSubmit}>
                  <h1>Resetar Senha</h1>
                  <Input
                     icon={FiLock}
                     name="password"
                     type="password"
                     placeholder="Sua nova senha Secreta"
                  />

                  <Input
                     icon={FiLock}
                     name="password_confirmation"
                     type="password"
                     placeholder="Confirme sua nova senha"
                  />
                  <Button type="submit">Alterar Senha</Button>
               </Form>
            </AnimationContainer>
         </Content>
      </Container>
   );
};

export default SignIn;
