import React, { useRef, useCallback } from 'react';

import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import getValidationErros from '../../utils/getValidationErrors';
import { Input, Button } from '../../components';
import { Container, Content, Background, AnimationContainer } from './styles';

import logo from '../../assets/logo.svg';
import api from '../../services/api';

interface ForgotPasswordFormData {
   email: string;
}

const ForgotPassword: React.FC = () => {
   const history = useHistory();

   const formRef = useRef<FormHandles>(null);

   const { addToast } = useToast();

   const handleSubmit = useCallback(
      async (data: ForgotPasswordFormData): Promise<void> => {
         try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
               email: Yup.string()
                  .required('E-mail obrigatório')
                  .email('Digite um e-mail válido'),
            });

            await schema.validate(data, {
               abortEarly: false,
            });

            await api.post('/password/forgot', {
               email: data.email,
            });

            addToast({
               type: 'success',
               title: 'E-mail de recuperação enviado',
               description:
                  'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
            });
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErros(err);

               formRef.current?.setErrors(errors);
               return;
            }

            addToast({
               type: 'error',
               title: 'Erro na recuperação de senha',
               description:
                  'Ocorreu um erro ao solicitar a recuperação de senha, tente novamente',
            });
         }
      },
      [addToast],
   );

   return (
      <Container>
         <Content>
            <AnimationContainer>
               <img src={logo} alt="Go Barber" />
               <Form ref={formRef} onSubmit={handleSubmit}>
                  <h1>Recuperar Senha</h1>
                  <Input icon={FiMail} name="email" placeholder="E-mail" />

                  <Button type="submit">Recuperar</Button>
               </Form>

               <Link to="/signin">
                  <FiLogIn />
                  Voltar ao logon
               </Link>
            </AnimationContainer>
         </Content>
      </Container>
   );
};

export default ForgotPassword;
