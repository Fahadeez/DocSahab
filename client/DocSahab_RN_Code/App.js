import React, { Component } from 'react';
import 'react-native-gesture-handler';
import login from './src/screens/Auth/login';
import signup from './src/screens/Auth/signup';
import doctordetails from './src/screens/Auth/DoctorDetails';
import forgetpassword from './src/screens/Auth/ForgetPassword';
import SearchDocScreen from './src/screens/SearchDoc';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from './src/screens/Dashboard/dashboard';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as DashboardProvider } from './src/context/dashboardContext';
import { Provider as MeetingProvider } from './src/context/MeetingContext';
import { DrawerContent } from './src/screens/Drawer/DrawerContent';
import resetPassword from './src/screens/Auth/ResetPassword';
import { Linking } from 'react-native';
import { navigationRef } from './src/RootNavigation';
import Verifyemail from './src/screens/Auth/VerifyEmail';
import BookAppoinment from './src/screens/Dashboard/bookAppointment';
import FeedBack from './src/screens/Dashboard/FeedBack';
import AppointmentConfirm from './src/screens/Dashboard/AppointmentConfirm';
import MedicalRecord from './src/screens/Dashboard/MedicalRecord';
import Help from './src/screens/Dashboard/Help';
import Chat from './src/screens/Dashboard/Chat';
import MyAppointment from './src/screens/Dashboard/MyAppointment';
import PaymentScreen from './src/screens/payment';
import MartScreen from './src/screens/Mart/Mart';
import VideoScreen from './src/screens/Dashboard/VIDEO_SCREEN/Meeting';
import ChatRoom from './src/screens/Dashboard/chatRoom';
import PatientHistory from './src/screens/Dashboard/PatientHistory';
import PatientRecords from './src/screens/Dashboard/PatientRecords';
import RecordMeeting from './src/screens/Dashboard/RecordMeeting';
import ProductDetails from './src/screens/Mart/ProductDetails';
import Checkout from './src/screens/Mart/Checkout';
import Prescription from './src/screens/Dashboard/Prescription';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const config = {
  screens: {
    resetPassword: 'resetpassword',
  },
};

const linking = {
  prefixes: ['docsahab://'],
  config,
};

function Root({ route, navigation }) {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          headerShown: null,
        }}
        name="DashboardScreen"
        component={DashboardScreen}
      />
      <Drawer.Screen
        options={{
          headerShown: null,
        }}
        name="SearchDoc"
        component={SearchDocScreen}
      />
      <Drawer.Screen
        options={{
          headerShown: null,
        }}
        name="MedicalRecord"
        component={MedicalRecord}
      />
      <Drawer.Screen
        options={{
          headerShown: null,
        }}
        name="BookAppoinment"
        component={BookAppoinment}
      />
      <Drawer.Screen
        options={{
          headerShown: null,
        }}
        name="aboutUs"
        component={Help}
      />

      <Drawer.Screen
        options={{
          headerShown: null,
        }}
        name="MyAppointment"
        component={MyAppointment}
      />

      <Drawer.Screen
        options={{
          headerShown: null,
        }}
        name="Mart"
        component={MartScreen}
      />

      <Drawer.Screen
        options={{
          headerShown: null,
        }}
        name="patientHistory"
        component={PatientHistory}
      />

      <Drawer.Screen
        options={{
          headerShown: null,
        }}
        name="patientRecords"
        component={PatientRecords}
      />

    </Drawer.Navigator>
  );
}

function Auth() {
  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      {/* drawerContent = {props => <DrawerContent{...props}/> */}
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="login"
          component={login}
        />

        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="signup"
          component={signup}
        />

        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="doctordetails"
          component={doctordetails}
        />

        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="forgetpassword"
          component={forgetpassword}
        />

        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="resetPassword"
          component={resetPassword}
        />

        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="Verifyemail"
          component={Verifyemail}
        />

        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="root"
          component={Root}
        />

        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="BookAppoinment"
          component={BookAppoinment}
        />

        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="FeedBack"
          component={FeedBack}
        />

        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="AppointmentConfirm"
          component={AppointmentConfirm}
        />

        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="MedicalRecord"
          component={MedicalRecord}
        />

        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="Chat"
          component={Chat}
        />

        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="Meeting"
          component={VideoScreen}
        />

        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="payment"
          component={PaymentScreen}
        />

        {/* testing purpose */}
        <Stack.Screen
          options={{ headerShown: null }}
          name="ChatRoom"
          component={ChatRoom}
        />

        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="RecordMeeting"
          component={RecordMeeting}
        />

        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="productDetails"
          component={ProductDetails}
        />
        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="checkout"
          component={Checkout}
        />
        <Stack.Screen
          options={{
            headerShown: null,
          }}
          name="prescription"
          component={Prescription}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const CustomApp = Auth;

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    Linking.getInitialURL()
      .then((url) => {
        if (url) {
          console.log(`Initial url is: ${url}`);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  render() {
    return (
      <AuthProvider>
        <DashboardProvider>
          <MeetingProvider>
            <CustomApp />
          </MeetingProvider>
        </DashboardProvider>
      </AuthProvider>
    );
  }
}
