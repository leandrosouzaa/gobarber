import React, { useCallback, useRef } from 'react';

import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErros from '../../utils/getValidationErrors';
import { Input, Button } from '../../components';
import { Container, Content, Background, AnimationContainer } from './styles';

import logo from '../../assets/logo.svg';

interface SignUpFormData {
   name: string;
   email: string;
   password: string;
}

const SignUp: React.FC = () => {
   const { addToast } = useToast();
   const history = useHistory();

   const formRef = useRef<FormHandles>(null);

   const handleSubmit = useCallback(
      async (data: SignUpFormData): Promise<void> => {
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

            await api.post('/users', data);

            addToast({
               type: 'success',
               title: 'Cadastro realizado!',
               description: 'Você já pode fazer seu logon no GoBarber',
            });

            history.push('/');
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErros(err);

               formRef.current?.setErrors(errors);
               return;
            }

            addToast({
               type: 'error',
               title: 'Aconteceu um erro',
               description:
                  'Ocorreu um erro durante o cadastro, tente novamente',
            });
         }
      },
      [addToast, history],
   );

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
