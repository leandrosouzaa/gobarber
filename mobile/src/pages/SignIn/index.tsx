import React, { useCallback, useRef } from 'react';

import {
   Image,
   View,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Button, Input } from '../../components';
import {
   Container,
   Title,
   ForgotPassword,
   ForgotPasswordText,
   CreateAccountButton,
   CreateAccountButtonText,
} from './styles';

import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
   const formRef = useRef<FormHandles>(null);
   const passwordInputRef = useRef<TextInput>(null);
   const navigation = useNavigation();

   const handleSignIn = useCallback((data: object) => {
      console.log(data);
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
                        console.log('foi');
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
