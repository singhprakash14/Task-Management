// Navigation.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminPanel from './pages/AdminDashboard';
import UserPanel from './pages/UserPanel';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AdminPanel" component={AdminPanel} />
        <Stack.Screen name="UserPanel" component={UserPanel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
