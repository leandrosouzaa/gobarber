import React, { useCallback, useEffect, useState } from 'react';

import { FlatList, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
   Container,
   Header,
   BackButton,
   HeaderTitle,
   UserAvatar,
   ProvidersListContainer,
   ProviderContainer,
   ProviderAvatar,
   ProviderName,
   Calendar,
   Title,
   OpenDatePickerButton,
   OpenDatePickerButtonText,
} from './styles';

interface RouteParams {
   providerId: string;
}

export interface ProviderProps {
   id: string;
   name: string;
   avatar_url: string;
}

const CreateAppointment: React.FC = () => {
   const route = useRoute();
   const routeParams = route.params as RouteParams;

   const [providers, setProviders] = useState<ProviderProps[]>([]);
   const [selectedProvider, setSelectedProvider] = useState(
      routeParams.providerId,
   );
   const [selectedDate, setSelectedDate] = useState(new Date());

   const { user } = useAuth();

   const { goBack } = useNavigation();

   const [showDatePicker, setShowDatePicker] = useState(false);

   const navigateBack = useCallback(() => {
      goBack();
   }, [goBack]);

   const handleSelectProvider = useCallback((providerId: string) => {
      setSelectedProvider(providerId);
   }, []);

   useEffect(() => {
      api.get('providers').then((res) => {
         setProviders(res.data);
      });
   }, []);

   const handleToggleDatePicker = useCallback(() => {
      setShowDatePicker(!showDatePicker);
   }, [showDatePicker]);

   const handleDateChanged = useCallback(
      (event: any, date: Date | undefined) => {
         if (Platform.OS === 'android') {
            setShowDatePicker(false);
         }

         if (date) {
            setSelectedDate(date);
         }
      },
      [],
   );

   return (
      <Container>
         <Header>
            <BackButton
               onPress={() => {
                  navigateBack();
               }}
            >
               <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <HeaderTitle>Cabeleireiros</HeaderTitle>

            <UserAvatar source={{ uri: user.avatar_url }} />
         </Header>
         <ProvidersListContainer>
            <FlatList
               horizontal
               showsHorizontalScrollIndicator={false}
               style={{
                  paddingVertical: 32,
                  paddingHorizontal: 24,
               }}
               data={providers}
               keyExtractor={(provider) => provider.id}
               renderItem={({ item: provider }) => (
                  <ProviderContainer
                     onPress={() => {
                        handleSelectProvider(provider.id);
                     }}
                     selected={provider.id === selectedProvider}
                  >
                     <ProviderAvatar source={{ uri: provider.avatar_url }} />
                     <ProviderName selected={provider.id === selectedProvider}>
                        {provider.name}
                     </ProviderName>
                  </ProviderContainer>
               )}
            />
         </ProvidersListContainer>

         <Calendar>
            <Title>Escolha a data</Title>

            <OpenDatePickerButton onPress={handleToggleDatePicker}>
               <OpenDatePickerButtonText>
                  Selecionar outra data
               </OpenDatePickerButtonText>
            </OpenDatePickerButton>

            {showDatePicker && (
               <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="calendar"
                  textColor="#f4ede8"
                  onChange={handleDateChanged}
                  onTouchCancel={() => {
                     setShowDatePicker(!showDatePicker);
                  }}
               />
            )}
         </Calendar>
      </Container>
   );
};

export default CreateAppointment;
