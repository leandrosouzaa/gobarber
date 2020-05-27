import React from 'react';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { Container } from './styles';

const AppointmentLoader: React.FC = () => {
   return (
      <SkeletonTheme color="#494653" highlightColor="#555161">
         <Container>
            <span className="hour">
               <Skeleton width="15px" />
               <Skeleton width="30px" />
            </span>

            <div className="content">
               <Skeleton width="56px" height="56px" circle />

               <strong>
                  <Skeleton width="250px" />
               </strong>
            </div>
         </Container>
      </SkeletonTheme>
   );
};

export default AppointmentLoader;
