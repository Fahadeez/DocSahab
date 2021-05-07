import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './index';
import DocSahabApi from '../api/DocSahabApi';
import {useNavigation} from '@react-navigation/native';
import {ToastAndroid} from 'react-native';
import * as RootNavigation from '../RootNavigation.js';

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case '':
      return;
    default:
      return state;
  }
};

const signUp = (dispatch) => {
  return async (navigate) => {
    try {
      // console.log("signup data", { email, password, firstName, lastName, contact, city, role })
      const jsonData = await AsyncStorage.getItem('SignUpData');
      if (jsonData) {
        const data = JSON.parse(jsonData);
        let {
          email,
          firstName,
          lastName,
          contact,
          city,
          gender,
          doctor,
          password,
        } = data;

        const response = await DocSahabApi.post('/auth/signup', {
          email,
          firstName,
          lastName,
          contact,
          city,
          gender,
          doctor,
          password,
        });
        console.log(response.data);
        if (response.data == "User's data added") {
          await AsyncStorage.setItem('userEmail', email);
          dispatch({
            type: 'add_error_for_signUp',
            payload: 'Registration Successfull!',
          });
          navigate();
        } else if (response.data == 'Email already exists') {
          dispatch({
            type: 'add_error_for_signUp',
            payload: 'Email Already Exists!',
          });
        } else if (response.data == "Doctor's data added") {
          await AsyncStorage.setItem('doctorSignUpEmail', email);
          await AsyncStorage.setItem('userEmail', email);
          navigate();
        } else {
          console.log('Error');
        }
      }
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: 'add_error_for_signUp',
        payload: 'Email Already Exists!',
      });
    }
  };
};

// action functions
export const {Provider, Context} = createDataContext(
  dashboardReducer,
  {signUp},
  // { isSignedIn: false, errorMessage: ''}
  {
    token: null,
    errorMessageForSignIn: '',
    errorMessageForSignUp: '',
    errorMessageUpdatePassword: '',
    user: {},
  },
);
