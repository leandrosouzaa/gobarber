import React, { useCallback, useEffect, useState, useMemo } from 'react';

import { FlatList, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
   Container,
   Header,
   BackButton,
   HeaderTitle,
   UserAvatar,
   Content,
   ProvidersListContainer,
   ProviderContainer,
   ProviderAvatar,
   ProviderName,
   Calendar,
   Title,
   OpenDatePickerButton,
   OpenDatePickerButtonText,
   Schedule,
   Section,
   SectionTitle,
   SectionContent,
   Hour,
   HourText,
} from './styles';

interface RouteParams {
   providerId: string;
}

export interface ProviderProps {
   id: string;
   name: string;
   avatar_url: string;
}

interface AvailabilityItem {
   hour: number;
   available: boolean;
}

const CreateAppointment: React.FC = () => {
   const route = useRoute();
   const routeParams = route.params as RouteParams;

   const [providers, setProviders] = useState<ProviderProps[]>([]);
   const [selectedProvider, setSelectedProvider] = useState(
      routeParams.providerId,
   );
   const [selectedDate, setSelectedDate] = useState(new Date());
   const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
   const [selectedHour, setSelectedHour] = useState(0);

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

   useEffect(() => {
      api.get(`providers/${selectedProvider}/day-availability`, {
         params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
         },
      }).then((res) => {
         setAvailability(res.data);
      });
   }, [selectedDate, selectedProvider]);

   const morningAvailability = useMemo(() => {
      return availability
         .filter(({ hour }) => hour < 12)
         .map(({ hour, available }) => {
            return {
               hour,
               available,
               hourFormatted: format(new Date().setHours(hour), 'HH:00'),
            };
         });
   }, [availability]);

   const afternoonAvailability = useMemo(() => {
      return availability
         .filter(({ hour }) => hour >= 12)
         .map(({ hour, available }) => {
            return {
               hour,
               available,
               hourFormatted: format(new Date().setHours(hour), 'HH:00'),
            };
         });
   }, [availability]);

   const handleSelectHour = useCallback((hour: number) => {
      setSelectedHour(hour);
   }, []);

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
         <Content>
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
                        <ProviderName
                           selected={provider.id === selectedProvider}
                        >
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

            <Schedule>
               <Title>Escolha um horário</Title>
               <Section>
                  <SectionTitle>Manhã</SectionTitle>
                  <SectionContent>
                     {morningAvailability.map(
                        ({ hourFormatted, available, hour }) => (
                           <Hour
                              enabled={available}
                              available={available}
                              key={hourFormatted}
                              onPress={() => handleSelectHour(hour)}
                              selected={selectedHour === hour}
                           >
                              <HourText selected={selectedHour === hour}>
                                 {hourFormatted}
                              </HourText>
                           </Hour>
                        ),
                     )}
                  </SectionContent>
               </Section>

               <Section>
                  <SectionTitle>Tarde</SectionTitle>
                  <SectionContent>
                     {afternoonAvailability.map(
                        ({ hourFormatted, available, hour }) => (
                           <Hour
                              available={available}
                              key={hourFormatted}
                              onPress={() => handleSelectHour(hour)}
                              selected={selectedHour === hour}
                           >
                              <HourText selected={selectedHour === hour}>
                                 {hourFormatted}
                              </HourText>
                           </Hour>
                        ),
                     )}
                  </SectionContent>
               </Section>
            </Schedule>
         </Content>
      </Container>
   );
};

export default CreateAppointment;
