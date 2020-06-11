import React, { useCallback, useEffect, useState } from 'react';

import { StatusBar, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
   Container,
   Header,
   HeaderTitle,
   UserName,
   ProfileButton,
   UserAvatar,
   ProviderContainer,
   ProviderAvatar,
   ProviderInfo,
   ProviderName,
   ProviderMeta,
   ProviderMetaText,
   ProvidersListTitle,
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

   const navigateToCreateAppointment = useCallback(
      (providerId: string) => {
         navigate('CreateAppointment', { providerId });
      },
      [navigate],
   );

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
            style={{ paddingTop: 32, paddingHorizontal: 24, paddingBottom: 16 }}
            data={providers}
            keyExtractor={(provider) => provider.id}
            ListHeaderComponent={
               <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
            }
            renderItem={({ item: provider }) => (
               <ProviderContainer
                  onPress={() => {
                     navigateToCreateAppointment(provider.id);
                  }}
               >
                  <ProviderAvatar source={{ uri: provider.avatar_url }} />
                  <ProviderInfo>
                     <ProviderName>{provider.name}</ProviderName>
                     <ProviderMeta>
                        <Icon name="calendar" size={14} color="#ff9000" />
                        <ProviderMetaText>Segunda à sexta</ProviderMetaText>
                     </ProviderMeta>
                     <ProviderMeta>
                        <Icon name="clock" size={14} color="#ff9000" />
                        <ProviderMetaText>8h às 18h</ProviderMetaText>
                     </ProviderMeta>
                  </ProviderInfo>
               </ProviderContainer>
            )}
         />
      </Container>
   );
};

export default Dashboard;
