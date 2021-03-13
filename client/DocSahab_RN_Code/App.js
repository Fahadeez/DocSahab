/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import Home from './screens/Home';
import RegisterScreen from './screens/UserRegister';
import DocRegisterScreen from './screens/DoctorRegister';
import DoctorLogin from './screens/DoctorLogin';
import UserLogin from './screens/UserLogin';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{
          headerShown: null
        }} 
        name="Home" component={Home} 
        />
        <Stack.Screen name="DoctorLogin" component={DoctorLogin} />
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="UserRegister" component = {RegisterScreen}
        options={{
          title: 'Register as a Patient',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#2A2AC0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerPosition: {

          }
        }}
        />
        <Stack.Screen name="DoctorRegister" component = {DocRegisterScreen}
        options={{
          title: 'Register as a Doctor ',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#2A2AC0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerPosition: {

          }
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
