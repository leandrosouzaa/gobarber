import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
   isLoading?: boolean;
}

export const Container = styled.button<ContainerProps>`
   background: #ff9000;
   border-radius: 10px;
   border: 0;
   height: 56px;
   padding: 0 16px;
   width: 100%;
   color: #312e38;
   font-weight: 500;
   margin-top: 16px;
   transition: background-color 0.2s;

   &:hover {
      background: ${shade(0.2, '#ff9000')};
   }
   ${(props) =>
      props.isLoading &&
      css`
         background: ${shade(0.4, '#ff9000')};

         &:hover {
            background: ${shade(0.4, '#ff9000')};
         }
      `}
`;
