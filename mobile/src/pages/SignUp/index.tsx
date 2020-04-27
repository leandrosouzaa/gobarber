import React, { useRef, useCallback } from 'react';

import {
   Image,
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

import getValidationErros from '../../utils/getValidationErros';
import { Button, Input } from '../../components';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

import logoImg from '../../assets/logo.png';

interface SignUpFormData {
   name: string;
   email: string;
   password: string;
   confirmPassword: string;
}

const SignUp: React.FC = () => {
   const formRef = useRef<FormHandles>(null);

   const emailInputRef = useRef<TextInput>(null);
   const passwordInputRef = useRef<TextInput>(null);
   const confirmPasswordInputRef = useRef<TextInput>(null);

   const navigation = useNavigation();

   const handleSignUp = useCallback(async (data: SignUpFormData): Promise<
      void
   > => {
      try {
         formRef.current?.setErrors({});

         const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            email: Yup.string()
               .required('E-mail obrigatório')
               .email('Digite um e-mail válido'),
            password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            confirmPassword: Yup.string().oneOf(
               [Yup.ref('password'), null],
               'As senhas não coincidem',
            ),
         });

         await schema.validate(data, {
            abortEarly: false,
         });

         // await api.post('/users', data);

         Alert.alert(
            'Cadastro realizado!',
            'Vocẽ já pode fazer logon no GoBarber',
         );
      } catch (err) {
         if (err instanceof Yup.ValidationError) {
            const errors = getValidationErros(err);

            formRef.current?.setErrors(errors);
            return;
         }

         Alert.alert(
            'Aconteceu um erro',
            'Ocorreu um erro durante o cadastro, tente novamente',
         );
      }
   }, []);
   return (
      <>
         <KeyboardAvoidingView
            style={{ flex: 1 }}
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
         >
            <ScrollView
               keyboardShouldPersistTaps="handled"
               contentContainerStyle={{ flex: 1 }}
            >
               <Container>
                  <Image source={logoImg} />

                  <View>
                     <Title>Crie sua conta</Title>
                  </View>
                  <Form ref={formRef} onSubmit={handleSignUp}>
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
                           passwordInputRef.current?.focus()
                        }
                     />
                     <Input
                        ref={passwordInputRef}
                        secureTextEntry
                        name="password"
                        icon="lock"
                        placeholder="Senha"
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
                        placeholder="Confirme sua senha"
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
                        Criar conta
                     </Button>
                  </Form>
               </Container>
               <BackToSignIn
                  onPress={() => {
                     navigation.goBack();
                  }}
               >
                  <Icon name="arrow-left" size={20} color="#fff" />
                  <BackToSignInText>Voltar para o logon</BackToSignInText>
               </BackToSignIn>
            </ScrollView>
         </KeyboardAvoidingView>
      </>
   );
};

export default SignUp;
