import React, { useCallback, useRef, ChangeEvent, useState } from 'react';

import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErros from '../../utils/getValidationErrors';
import { Input, Button } from '../../components';
import { Container, Content, AvatarInput } from './styles';

interface ProfileFormData {
   name: string;
   email: string;
   old_password: string;
   password: string;
   password_confirmation: string;
}

const Profile: React.FC = () => {
   const [loading, setLoading] = useState(false);
   const { addToast } = useToast();
   const { user, updateUser } = useAuth();
   const history = useHistory();

   const formRef = useRef<FormHandles>(null);

   const handleSubmit = useCallback(
      async (data: ProfileFormData): Promise<void> => {
         try {
            setLoading(true);
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
               name: Yup.string().required('Nome obrigatório'),
               email: Yup.string()
                  .required('E-mail obrigatório')
                  .email('Digite um e-mail válido'),
               old_password: Yup.string(),
               password: Yup.string().when('old_password', {
                  is: (val) => !!val.length,
                  then: Yup.string()
                     .required('Campo obrigatório')
                     .min(6, 'No mínimo 6 dígitos'),
                  otherwise: Yup.string(),
               }),
               password_confirmation: Yup.string()
                  .when('old_password', {
                     is: (val) => !!val.length,
                     then: Yup.string().required('Campo obrigatório'),
                     otherwise: Yup.string(),
                  })
                  .oneOf(
                     [Yup.ref('password'), null],
                     'As senhas não coincidem',
                  ),
            });

            await schema.validate(data, {
               abortEarly: false,
            });

            const {
               name,
               email,
               old_password,
               password,
               password_confirmation,
            } = data;

            const formData = {
               name,
               email,
               ...(old_password
                  ? {
                       old_password,
                       password,
                       password_confirmation,
                    }
                  : {}),
            };

            const response = await api.put('/profile', formData);

            updateUser(response.data);

            addToast({
               type: 'success',
               title: 'Perfil atualizado!',
               description: 'Suas informações foram atualizadas com sucesso!',
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
                  'Ocorreu um erro durante a atualização do perfil, tente novamente',
            });
         } finally {
            setLoading(false);
         }
      },
      [addToast, history, updateUser],
   );

   const handleAvatarChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         if (e.target.files) {
            const data = new FormData();

            data.append('avatar', e.target.files[0]);

            api.patch('/users/avatar', data).then((response) => {
               updateUser(response.data);

               addToast({
                  type: 'success',
                  title: 'Avatar Atualizado',
               });
            });
         }
      },
      [addToast, updateUser],
   );

   return (
      <Container>
         <header>
            <div>
               <Link to="/dashboard">
                  <FiArrowLeft />
               </Link>
            </div>
         </header>
         <Content>
            <Form
               ref={formRef}
               initialData={{ name: user.name, email: user.email }}
               onSubmit={handleSubmit}
            >
               <AvatarInput>
                  <img src={user.avatar_url} alt={user.name} />
                  <label htmlFor="avatar">
                     <FiCamera />

                     <input
                        type="file"
                        id="avatar"
                        onChange={handleAvatarChange}
                     />
                  </label>
               </AvatarInput>
               <h1>Meu Perfil</h1>
               <Input icon={FiUser} name="name" placeholder="Nome" />
               <Input icon={FiMail} name="email" placeholder="E-mail" />

               <Input
                  containerStyle={{ marginTop: 24 }}
                  icon={FiLock}
                  name="old_password"
                  type="password"
                  placeholder="Sua senha Secreta"
               />
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
                  placeholder="Confirmar senha"
               />

               <Button loading={loading} type="submit">
                  Confirmar Mudanças
               </Button>
            </Form>
         </Content>
      </Container>
   );
};

export default Profile;
