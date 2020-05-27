import styled from 'styled-components';

export const Container = styled.div`
   margin-top: 64px;

   .content {
      background: #3e3b47;
      display: flex;
      align-items: center;
      padding: 16px 24px;
      border-radius: 10px;
      margin-top: 24px;
      position: relative;

      &::before {
         position: absolute;
         height: 80%;
         width: 1px;
         top: 10%;
         left: 0;
         content: '';
         background: #494653;
      }

      .name {
         margin-left: 24px;
         color: #fff;
      }

      .hour {
         display: flex;
         align-items: center;
         color: #999591;
         margin-left: auto;

         span {
            margin-right: 5px;
         }
      }
   }
`;
