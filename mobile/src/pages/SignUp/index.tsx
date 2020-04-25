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
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

import logoImg from '../../assets/logo.png';

const SignUp: React.FC = () => {
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
                     <Title>Crie sua conta</Title>
                  </View>

                  <Input name="name" icon="user" placeholder="Nome" />
                  <Input name="email" icon="mail" placeholder="E-mail" />
                  <Input name="password" icon="lock" placeholder="Senha" />
                  <Input
                     name="confirmPassword"
                     icon="lock"
                     placeholder="Confirme sua senha"
                  />

                  <Button
                     onPress={() => {
                        console.log('foi');
                     }}
                  >
                     Criar conta
                  </Button>
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
