import React, { useState, useCallback } from 'react';

import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiPower, FiClock } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import {
   Container,
   Header,
   HeaderContent,
   Profile,
   Content,
   Schedule,
   NextAppointment,
   Section,
   Appointment,
   Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
   const [selectedDate, setSelectedDate] = useState(new Date());

   const { signOut, user } = useAuth();

   const handleDateChange = useCallback((day, modifiers: DayModifiers) => {
      if (modifiers.available) {
         setSelectedDate(day);
      }
   }, []);

   return (
      <Container>
         <Header>
            <HeaderContent>
               <img src={logoImg} alt="GoBarber" />

               <Profile>
                  <img src={user.avatar_url} alt={user.name} />
                  <div>
                     <span>Bem Vindo</span>
                     <strong>{user.name}</strong>
                  </div>
               </Profile>

               <button type="button" onClick={signOut}>
                  <FiPower />
               </button>
            </HeaderContent>
         </Header>

         <Content>
            <Schedule>
               <h1>Horários Agendados</h1>
               <p>
                  <span>Hoje</span>
                  <span>Dia 06</span>
                  <span>Segunda Feira</span>
               </p>

               <NextAppointment>
                  <strong>Atendimento a seguir</strong>
                  <div>
                     <img src={user.avatar_url} alt="Nome" />

                     <strong>Leandro Ribeiro</strong>

                     <span>
                        <FiClock />
                        08:00
                     </span>
                  </div>
               </NextAppointment>

               <Section>
                  <strong>Manhã</strong>

                  <Appointment>
                     <span>
                        <FiClock />
                        8:00
                     </span>

                     <div>
                        <img src={user.avatar_url} alt="Nome" />

                        <strong>Leandro Ribeiro</strong>
                     </div>
                  </Appointment>

                  <Appointment>
                     <span>
                        <FiClock />
                        8:00
                     </span>

                     <div>
                        <img src={user.avatar_url} alt="Nome" />

                        <strong>Leandro Ribeiro</strong>
                     </div>
                  </Appointment>
               </Section>

               <Section>
                  <strong>Tarde</strong>

                  <Appointment>
                     <span>
                        <FiClock />
                        8:00
                     </span>

                     <div>
                        <img src={user.avatar_url} alt="Nome" />

                        <strong>Leandro Ribeiro</strong>
                     </div>
                  </Appointment>

                  <Appointment>
                     <span>
                        <FiClock />
                        8:00
                     </span>

                     <div>
                        <img src={user.avatar_url} alt="Nome" />

                        <strong>Leandro Ribeiro</strong>
                     </div>
                  </Appointment>
               </Section>
            </Schedule>
            <Calendar>
               <DayPicker
                  weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                  fromMonth={new Date()}
                  disabledDays={[{ daysOfWeek: [0, 6] }]}
                  modifiers={{
                     available: { daysOfWeek: [1, 2, 3, 4, 5] },
                  }}
                  onDayClick={handleDateChange}
                  months={[
                     'Janeiro',
                     'Fevereiro',
                     'Março',
                     'Abril',
                     'Maio',
                     'Junho',
                     'Julho',
                     'Agosto',
                     'Setembro',
                     'Outubro',
                     'Novembro',
                     'Dezembro',
                  ]}
                  selectedDays={selectedDate}
               />
            </Calendar>
         </Content>
      </Container>
   );
};

export default Dashboard;
