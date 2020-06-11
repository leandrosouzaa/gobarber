import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import {
   Dashboard,
   CreateAppointment,
   Profile,
   AppointmentCreated,
} from '../pages';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
   <App.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
         headerShown: false,
         cardStyle: { backgroundColor: '#312e38' },
      }}
   >
      <App.Screen name="Profile" component={Profile} />

      <App.Screen name="Dashboard" component={Dashboard} />
      <App.Screen name="CreateAppointment" component={CreateAppointment} />
      <App.Screen name="AppointmentCreated" component={AppointmentCreated} />
   </App.Navigator>
);

export default AppRoutes;
