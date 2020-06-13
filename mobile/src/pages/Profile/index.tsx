import React, { useRef, useCallback } from 'react';

import {
   View,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   TextInput,
   Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-picker';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import getValidationErros from '../../utils/getValidationErros';
import { Button, Input } from '../../components';
import {
   Container,
   Title,
   UserAvatarButton,
   UserAvatar,
   BackButton,
} from './styles';

interface ProfileFormData {
   name: string;
   email: string;
   old_password: string;
   password: string;
   password_confirmation: string;
}

const Profile: React.FC = () => {
   const formRef = useRef<FormHandles>(null);
   const { user, updateUser } = useAuth();

   const emailInputRef = useRef<TextInput>(null);
   const passwordInputRef = useRef<TextInput>(null);
   const oldPasswordInputRef = useRef<TextInput>(null);
   const confirmPasswordInputRef = useRef<TextInput>(null);

   const navigation = useNavigation();

   const handleProfile = useCallback(
      async (data: ProfileFormData): Promise<void> => {
         try {
            formRef.current?.setErrors({});

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

            Alert.alert('Perfil atualizado com sucesso');

            navigation.goBack();
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErros(err);

               formRef.current?.setErrors(errors);
               return;
            }
            console.log(err);
            Alert.alert(
               'Aconteceu um erro',
               'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
            );
         }
      },
      [navigation, updateUser],
   );

   const handleUpdateAvatar = useCallback(async () => {
      ImagePicker.showImagePicker(
         {
            title: 'Selecione um avatar',
            cancelButtonTitle: 'Cancelar',
            takePhotoButtonTitle: 'Usar câmera',
            chooseFromLibraryButtonTitle: 'Escolher da Galeria',
         },
         (response) => {
            if (response.didCancel) {
               return;
            }
            if (response.error) {
               Alert.alert('Erro ao atualizar seu avatar');
               return;
            }

            const data = new FormData();

            data.append('avatar', {
               type: 'image/jpeg',
               name: `${user.id}.jpeg`,
               uri: response.uri,
            });

            api.patch('users/avatar', data).then((res) => {
               updateUser(res.data);
            });
         },
      );
   }, [user.id, updateUser]);

   const navigateBack = useCallback(() => {
      navigation.goBack();
   }, [navigation]);
   return (
      <>
         <KeyboardAvoidingView
            style={{ flex: 1 }}
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
         >
            <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
               <Container>
                  <BackButton onPress={navigateBack}>
                     <Icon name="chevron-left" size={24} color="#999591" />
                  </BackButton>
                  <UserAvatarButton onPress={handleUpdateAvatar}>
                     <UserAvatar source={{ uri: user.avatar_url }} />
                  </UserAvatarButton>

                  <View>
                     <Title>Meu Perfil</Title>
                  </View>
                  <Form
                     ref={formRef}
                     onSubmit={handleProfile}
                     initialData={user}
                  >
                     <Input
                        name="name"
                        autoCorrect
                        autoCapitalize="words"
                        icon="user"
                        placeholder="Nome"
                        returnKeyType="next"
                        onSubmitEditing={() => emailInputRef.current?.focus()}
                     />
                     <Input
                        ref={emailInputRef}
                        name="email"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        icon="mail"
                        placeholder="E-mail"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                           oldPasswordInputRef.current?.focus()
                        }
                     />
                     <Input
                        ref={oldPasswordInputRef}
                        secureTextEntry
                        name="old_password"
                        icon="lock"
                        placeholder="Senha Atual"
                        textContentType="newPassword"
                        returnKeyType="next"
                        containerStyle={{ marginTop: 16 }}
                        onSubmitEditing={() =>
                           passwordInputRef.current?.focus()
                        }
                     />

                     <Input
                        ref={passwordInputRef}
                        secureTextEntry
                        name="password"
                        icon="lock"
                        placeholder="Nova Senha"
                        textContentType="newPassword"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                           confirmPasswordInputRef.current?.focus()
                        }
                     />
                     <Input
                        ref={confirmPasswordInputRef}
                        secureTextEntry
                        name="confirmPassword"
                        icon="lock"
                        placeholder="Confirme sua nova senha"
                        returnKeyType="send"
                        onSubmitEditing={() => {
                           formRef.current?.submitForm();
                        }}
                     />

                     <Button
                        onPress={() => {
                           formRef.current?.submitForm();
                        }}
                     >
                        Confirmar mudanças
                     </Button>
                  </Form>
               </Container>
            </ScrollView>
         </KeyboardAvoidingView>
      </>
   );
};

export default Profile;
