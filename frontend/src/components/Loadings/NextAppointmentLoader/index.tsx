import React from 'react';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { Container } from './styles';

const NextAppointmentLoader: React.FC = () => {
   return (
      <SkeletonTheme color="#494653" highlightColor="#555161">
         <Container>
            <div className="content">
               <Skeleton width="80px" height="80px" circle />

               <span className="name">
                  <Skeleton width="200px" />
               </span>

               <span className="hour">
                  <span>
                     <Skeleton width="15px" />
                  </span>
                  <Skeleton width="40px" />
               </span>
            </div>
         </Container>
      </SkeletonTheme>
   );
};

export default NextAppointmentLoader;
