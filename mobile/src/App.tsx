import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'

import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';

import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
   useEffect(() => {

      SplashScreen.hide();
   }, [])

   return (
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
   )
};

export default App;
