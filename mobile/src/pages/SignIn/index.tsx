import React from 'react';

import {
   Image,
   View,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

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
   const navigation = useNavigation();
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

                  <Input name="email" icon="mail" placeholder="E-mail" />
                  <Input name="password" icon="lock" placeholder="Senha" />

                  <Button
                     onPress={() => {
                        console.log('foi');
                     }}
                  >
                     Entrar
                  </Button>
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
