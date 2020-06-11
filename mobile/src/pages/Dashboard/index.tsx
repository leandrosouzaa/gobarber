import React, { useCallback, useEffect, useState } from 'react';

import { StatusBar, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
   Container,
   Header,
   HeaderTitle,
   UserName,
   ProfileButton,
   UserAvatar,
} from './styles';

export interface ProviderProps {
   id: string;
   name: string;
   avatar_url: string;
}

const Dashboard: React.FC = () => {
   const [providers, setProviders] = useState<ProviderProps[]>([]);
   const { user } = useAuth();

   const { navigate } = useNavigation();

   const navigateToProfile = useCallback(() => {
      navigate('Profile');
   }, [navigate]);

   useEffect(() => {
      api.get('providers').then((res) => {
         setProviders(res.data);
      });
   }, []);

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
         <FlatList
            data={providers}
            keyExtractor={(provider) => provider.id}
            renderItem={({ item }) => <UserName>{item.name}</UserName>}
         />
      </Container>
   );
};

export default Dashboard;
