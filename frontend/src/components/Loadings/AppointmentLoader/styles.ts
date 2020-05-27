import styled from 'styled-components';

export const Container = styled.div`
   display: flex;
   align-items: center;

   margin-bottom: 16px;

   .hour {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #f4ede8;
      width: 70px;

      span {
         margin-right: 3px;
      }
   }

   .content {
      flex: 1;

      background: #3e3b47;
      display: flex;
      align-items: center;
      padding: 16px 24px;
      border-radius: 10px;
      margin-left: 24px;

      strong {
         margin-left: 24px;
         color: #fff;
         display: flex;
         font-size: 20px;
      }
   }
`;
