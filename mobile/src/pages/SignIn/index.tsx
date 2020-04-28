import React, { useCallback, useRef } from 'react';

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

import { useAuth } from '../../hooks/auth';
import { Button, Input } from '../../components';
import {
   Container,
   Title,
   ForgotPassword,
   ForgotPasswordText,
   CreateAccountButton,
   CreateAccountButtonText,
} from './styles';
import getValidationErros from '../../utils/getValidationErros';

import logoImg from '../../assets/logo.png';

interface SignInFormData {
   email: string;
   password: string;
}

const SignIn: React.FC = () => {
   const { signIn } = useAuth();
   const formRef = useRef<FormHandles>(null);
   const passwordInputRef = useRef<TextInput>(null);
   const navigation = useNavigation();

   const handleSignIn = useCallback(
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

            Alert.alert(
               'Erro na autenticação',
               'Ocorreu um erro ao fazer login, cheque as credenciais',
            );
         }
      },
      [navigation, signIn],
   );

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
                     <Title>Faça seu logon</Title>
                  </View>
                  <Form ref={formRef} onSubmit={handleSignIn}>
                     <Input
                        name="email"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        icon="mail"
                        placeholder="E-mail"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                           passwordInputRef.current?.focus();
                        }}
                     />
                     <Input
                        ref={passwordInputRef}
                        name="password"
                        icon="lock"
                        placeholder="Senha"
                        secureTextEntry
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
                        Entrar
                     </Button>
                  </Form>

                  <ForgotPassword
                     onPress={() => {
                        // console.log('salve');
                     }}
                  >
                     <ForgotPasswordText>
                        Esqueci minha senha
                     </ForgotPasswordText>
                  </ForgotPassword>
               </Container>
               <CreateAccountButton
                  onPress={() => {
                     navigation.navigate('SignUp');
                  }}
               >
                  <Icon name="log-in" size={20} color="#ff9900" />
                  <CreateAccountButtonText>Criar Conta</CreateAccountButtonText>
               </CreateAccountButton>
            </ScrollView>
         </KeyboardAvoidingView>
      </>
   );
};

export default SignIn;
