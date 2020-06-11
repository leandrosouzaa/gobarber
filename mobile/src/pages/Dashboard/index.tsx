import React, { useCallback } from 'react';

import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';
import {
   Container,
   Header,
   HeaderTitle,
   UserName,
   ProfileButton,
   UserAvatar,
} from './styles';

const Dashboard: React.FC = () => {
   const { user } = useAuth();

   const { navigate } = useNavigation();

   const navigateToProfile = useCallback(() => {
      navigate('Profile');
   }, [navigate]);

   return (
      <Container>
         <StatusBar barStyle="light-content" backgroundColor="#28262e" />

         <Header>
            <HeaderTitle>
               Bem Vindo, {'\n'}
               <UserName>{user.name}</UserName>
            </HeaderTitle>
            <ProfileButton onPress={() => navigateToProfile()}>
               <UserAvatar source={{ uri: user.avatar_url }} />
            </ProfileButton>
         </Header>
      </Container>
   );
};

export default Dashboard;
