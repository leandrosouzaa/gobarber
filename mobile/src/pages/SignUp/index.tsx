import React, { useRef, useCallback } from 'react';

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
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

import logoImg from '../../assets/logo.png';

const SignUp: React.FC = () => {
   const formRef = useRef<FormHandles>(null);

   const emailInputRef = useRef<TextInput>(null);
   const passwordInputRef = useRef<TextInput>(null);
   const confirmPasswordInputRef = useRef<TextInput>(null);

   const navigation = useNavigation();

   const handleSignUp = useCallback((data: object) => {
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
