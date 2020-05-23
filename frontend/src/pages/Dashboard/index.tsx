import React from 'react';

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
   Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
   const { signOut, user } = useAuth();

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
            </Schedule>
            <Calendar />
         </Content>
      </Container>
   );
};

export default Dashboard;
