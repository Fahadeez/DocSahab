import React, { Component } from 'react';
import 'react-native-gesture-handler';
import login from './src/screens/Auth/login';
import signup from './src/screens/Auth/signup';
import doctordetails from './src/screens/Auth/DoctorDetails';
import forgetpassword from './src/screens/Auth/ForgetPassword';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from './src/screens/Dashboard/dashboard';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import { DrawerContent } from './src/screens/Drawer/DrawerContent'
import resetPassword from './src/screens/Auth/ResetPassword';
import { Linking } from 'react-native';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const config = {
  screens: {
    resetPassword: 'resetpassword',
    // resetPassword: 'resetPassword',
  },
};

const linking = {
  prefixes: ['docsahab://'],
  config,
};

function Root() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent{...props} />}>
      <Drawer.Screen options={{
        headerShown: null
      }}
        name="dashboard" component={DashboardScreen}
      />
    </Drawer.Navigator>
  );
}

function Auth() {
  return (
    <NavigationContainer>
      {/* drawerContent = {props => <DrawerContent{...props}/> */}
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
          name="resetPassword" component={resetPassword}
        />

        <Stack.Screen options={{
          headerShown: null
        }}
          name="root" component={Root}
          />          
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const CustomApp = Auth;

export default class App extends Component {
  componentDidMount = () => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('Initial url is: ' + url);
      }
    }).catch(err => console.error('An error occurred', err));
  };

  render() {
    return (
      <AuthProvider>
        <CustomApp />
      </AuthProvider>
    );
  }

};