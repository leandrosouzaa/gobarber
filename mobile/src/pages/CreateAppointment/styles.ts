import styled from 'styled-components/native';

interface ProviderContainerProps {
   selected: boolean;
}

interface ProviderNameProps {
   selected: boolean;
}

export const Container = styled.View`
   flex: 1;
`;

export const Header = styled.View`
   padding: 24px;
   background: #28262e;

   flex-direction: row;
   justify-content: space-between;
   align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
   color: #f4ede8;
   font-family: 'RobotoSlab-Medium';
   font-size: 20px;
   margin-left: 16px;
`;

export const UserAvatar = styled.Image`
   width: 56px;
   height: 56px;
   border-radius: 28px;
   margin-left: auto;
`;

export const ProvidersListContainer = styled.View`
   height: 112px;
`;

export const ProviderContainer = styled.TouchableOpacity<
   ProviderContainerProps
>`
   background: ${(props) => (props.selected ? '#ff9000' : '#3e3b47')};
   padding: 8px 12px;
   align-items: center;
   flex-direction: row;
   margin-right: 16px;
   border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
   width: 32px;
   height: 32px;
   border-radius: 16px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
   margin-left: 8px;
   font-family: 'RobotoSlab-Medium';
   font-size: 16px;
   color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
`;
