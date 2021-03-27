import React from 'react';
import 'react-native-gesture-handler';
import login from './src/screens/Auth/login';
import signup from './src/screens/Auth/signup';
import doctordetails from './src/screens/Auth/DoctorDetails';
import forgetpassword from './src/screens/Auth/ForgetPassword';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from './src/screens/Dashboard/dashboard';
import { Provider as AuthProvider} from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';

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

const CustomApp = App;

export default () => {
  return (
    <AuthProvider>
      <CustomApp ref={(navigator) => { setNavigator(navigator) }}/>
  </AuthProvider>
  );
};