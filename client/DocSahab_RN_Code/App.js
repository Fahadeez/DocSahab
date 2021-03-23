import React from 'react';
import 'react-native-gesture-handler';
import login from './screens/Auth/login';
import signup from './screens/Auth/signup';
import doctordetails from './screens/Auth/DoctorDetails';
import forgetpassword from './screens/Auth/ForgetPassword';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from './screens/dashboard';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{
            headerShown: null
          }} 
          name="login" component={login}
          />

          <Stack.Screen options={{
            headerShown: null
          }} 
          name="signup" component={signup}
          />

          <Stack.Screen options={{
            headerShown: null
          }} 
          name="doctordetails" component={doctordetails}
          />

          <Stack.Screen options={{
            headerShown: null
          }} 
          name="forgetpassword" component={forgetpassword}
          />

          <Stack.Screen options={{
            headerShown: null
          }} 
          name="dashboard" component={DashboardScreen}
          />
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
