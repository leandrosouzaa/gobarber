import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
   > header {
      width: 100%;
      height: 144px;
      background: #28262e;

      display: flex;
      align-items: center;

      div {
         width: 100%;
         max-width: 1120px;
         margin: 0 auto;

         svg {
            color: #999591;
            width: 24px;
            height: 24px;
         }
      }
   }
`;

export const Content = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   margin: -176px auto 0;

   place-content: center;
   width: 100%;

   form {
      margin: 80px 0;
      width: 340px;
      text-align: center;
      align-items: center;

      display: flex;
      flex-direction: column;

      h1 {
         margin-bottom: 24px;
         font-size: 20px;
         text-align: left;
      }

      a {
         color: #f4ede8;
         display: block;
         margin-top: 24px;
         text-decoration: none;
         transition: color 0.2s;

         &:hover {
            color: ${shade(0.2, '#f4ede8')};
         }
      }

      input[name='old_password'] {
         margin-top: 24px;
      }
   }
`;

export const AvatarInput = styled.div`
   margin-bottom: 32px;
   position: relative;
   width: 186px;

   img {
      width: 186px;
      height: 186px;
      border-radius: 50%;
   }

   label {
      position: absolute;
      width: 48px;
      height: 48px;
      background: #ff9000;
      border-radius: 50%;
      right: 0;
      bottom: 0;
      border: 0;
      transition: background-color 0.2s;
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      input {
         display: none;
      }

      svg {
         height: 20;
         width: 20;
         color: #312e38;
      }

      &:hover {
         background: ${shade(0.2, '#ff9000')};
      }
   }
`;
