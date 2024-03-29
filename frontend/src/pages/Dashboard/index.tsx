import React, { useState, useCallback, useEffect, useMemo } from 'react';

import { isToday, isAfter, format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Link } from 'react-router-dom';
import { FiPower, FiClock } from 'react-icons/fi';

import NextAppointmentLoader from '../../components/Loadings/NextAppointmentLoader';
import AppointmentLoader from '../../components/Loadings/AppointmentLoader';

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
import api from '../../services/api';

interface MonthAvailabilityItem {
   day: number;
   available: boolean;
}

interface Appointment {
   id: string;
   date: string;
   hourFormatted: string;
   user: {
      name: string;
      avatar_url: string;
   };
}

const Dashboard: React.FC = () => {
   const { signOut, user } = useAuth();

   const [loading, setLoading] = useState(false);
   const [selectedDate, setSelectedDate] = useState(new Date());
   const [currentMonth, setCurrentMonth] = useState(new Date());
   const [monthAvailability, setMonthAvailability] = useState(
      [] as MonthAvailabilityItem[],
   );
   const [appointments, setAppointments] = useState<Appointment[]>([]);

   const handleDateChange = useCallback(
      (day: Date, modifiers: DayModifiers) => {
         if (modifiers.available && !modifiers.disabled) {
            setSelectedDate(day);
         }
      },
      [],
   );

   const handleMonthChange = useCallback((month: Date) => {
      setCurrentMonth(month);
   }, []);

   useEffect(() => {
      setLoading(true);

      api.get(`/providers/${user.id}/month-availability`, {
         params: {
            year: currentMonth.getFullYear(),
            month: currentMonth.getMonth() + 1,
         },
      }).then((response) => {
         setMonthAvailability(response.data);
      });
   }, [currentMonth, user.id]);

   const disabledDays = useMemo(() => {
      const dates = monthAvailability
         .filter((monthDay) => monthDay.available === false)
         .map((monthDay) => {
            const year = currentMonth.getFullYear();
            const month = currentMonth.getMonth();

            return new Date(year, month, monthDay.day);
         });

      return dates;
   }, [currentMonth, monthAvailability]);

   const selectedDateAsText = useMemo(() => {
      return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR });
   }, [selectedDate]);

   const selectWeekDay = useMemo(() => {
      return format(selectedDate, 'cccc', { locale: ptBR });
   }, [selectedDate]);

   useEffect(() => {
      api.get<Appointment[]>('/appointments/me', {
         params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
         },
      }).then((response) => {
         const appointmentsFormatted = response.data.map((appointment) => {
            if (appointment.user.avatar_url === null) {
               appointment.user.avatar_url =
                  'https://api.adorable.io/avatars/800/b3c5f6c3fdd85798590175b953e10217.png';
            }

            return {
               ...appointment,

               hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
            };
         });
         setLoading(false);
         setAppointments(appointmentsFormatted);
      });
   }, [selectedDate]);

   const morningAppointments = useMemo(() => {
      return appointments.filter((appointment) => {
         return parseISO(appointment.date).getHours() < 12;
      });
   }, [appointments]);

   const afternoonAppointments = useMemo(() => {
      return appointments.filter((appointment) => {
         return parseISO(appointment.date).getHours() >= 12;
      });
   }, [appointments]);

   const nextAppointment = useMemo(() => {
      return appointments.find((appointment) =>
         isAfter(parseISO(appointment.date), new Date()),
      );
   }, [appointments]);

   return (
      <Container>
         <Header>
            <HeaderContent>
               <img src={logoImg} alt="GoBarber" />

               <Profile>
                  <img src={user.avatar_url} alt={user.name} />
                  <div>
                     <span>Bem Vindo</span>
                     <Link to="/profile">
                        <strong>{user.name}</strong>
                     </Link>
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
                  {isToday(selectedDate) && <span>Hoje</span>}
                  <span>{selectedDateAsText}</span>
                  <span>{selectWeekDay}</span>
               </p>

               {loading && <NextAppointmentLoader />}

               {isToday(selectedDate) && nextAppointment && (
                  <NextAppointment>
                     <strong>Agendamento a seguir</strong>
                     <div>
                        <img
                           src={nextAppointment.user.avatar_url}
                           alt={nextAppointment.user.name}
                        />

                        <strong>{nextAppointment.user.name}</strong>

                        <span>
                           <FiClock />
                           {nextAppointment.hourFormatted}
                        </span>
                     </div>
                  </NextAppointment>
               )}

               <Section>
                  <strong>Manhã</strong>

                  {loading && (
                     <>
                        <AppointmentLoader />
                        <AppointmentLoader />
                     </>
                  )}

                  {morningAppointments.length === 0 && !loading && (
                     <p>Nenhum agendamento neste período</p>
                  )}

                  {morningAppointments.map((appointment) => (
                     <Appointment key={appointment.id}>
                        <span>
                           <FiClock />
                           {appointment.hourFormatted}
                        </span>

                        <div>
                           <img
                              src={appointment.user.avatar_url}
                              alt={appointment.user.name}
                           />

                           <strong>{appointment.user.name}</strong>
                        </div>
                     </Appointment>
                  ))}
               </Section>

               <Section>
                  <strong>Tarde</strong>

                  {afternoonAppointments.length === 0 && !loading && (
                     <p>Nenhum agendamento neste período</p>
                  )}

                  {loading && (
                     <>
                        <AppointmentLoader />
                        <AppointmentLoader />
                     </>
                  )}

                  {afternoonAppointments.map((appointment) => (
                     <Appointment key={appointment.id}>
                        <span>
                           <FiClock />
                           {appointment.hourFormatted}
                        </span>

                        <div>
                           <img
                              src={appointment.user.avatar_url}
                              alt={appointment.user.name}
                           />

                           <strong>{appointment.user.name}</strong>
                        </div>
                     </Appointment>
                  ))}
               </Section>
            </Schedule>
            <Calendar>
               <DayPicker
                  weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                  fromMonth={new Date()}
                  disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
                  modifiers={{
                     available: { daysOfWeek: [1, 2, 3, 4, 5] },
                  }}
                  onDayClick={handleDateChange}
                  onMonthChange={handleMonthChange}
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
