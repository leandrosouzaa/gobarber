import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';

import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => (
   <NavigationContainer>
      <StatusBar
         barStyle="light-content"
         backgroundColor="#312e38"
         translucent
      />
      <AppProvider>
         <View style={{ backgroundColor: '#312e38', flex: 1 }}>
            <Routes />
         </View>
      </AppProvider>
   </NavigationContainer>
);

export default App;
