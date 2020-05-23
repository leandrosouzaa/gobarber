import React from 'react';

import { FiPower } from 'react-icons/fi';

import { Container, Header, HeaderContent, Profile } from './styles';

import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
   return (
      <Container>
         <Header>
            <HeaderContent>
               <img src={logoImg} alt="GoBarber" />

               <Profile>
                  <img
                     src="https://avatars0.githubusercontent.com/u/51727533?s=460&u=db66dcd045f5e01193f7e162c4bbc193886ae348&v=4"
                     alt="Leandro Ribeiro"
                  />
                  <div>
                     <span>Bem Vindo</span>
                     <strong>Leandro Ribeiro</strong>
                  </div>
               </Profile>

               <button type="button">
                  <FiPower />
               </button>
            </HeaderContent>
         </Header>
      </Container>
   );
};

export default Dashboard;
