import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './index';
import DocSahabApi from '../api/DocSahabApi';
import {useNavigation} from '@react-navigation/native';
import {ToastAndroid} from 'react-native';
import * as RootNavigation from '../RootNavigation.js';
import uuid from 'react-native-uuid';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error_for_signIn':
      return {...state, errorMessageForSignIn: action.payload};
    case 'add_error_for_signUp':
      return {...state, errorMessageForSignUp: action.payload};
    case 'signIn':
      return {errorMessageForSignIn: '', token: action.payload};
    case 'add_error_for_updatepassword':
      return {...state, errorMessageUpdatePassword: action.payload};
    case 'add_error_for_updatepassword':
      return {...state, errorMessageUpdatePassword: action.payload};
    case 'fetch_user':
      return {...state, user: action.payload};
    default:
      return state;
  }
};

const fetchUser = (dispatch) => {
  return async () => {
    try {
      const response = await DocSahabApi.get('/auth/current_user');
      dispatch({type: 'fetch_user', payload: response.data});
    } catch (err) {}
  };
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

const signUpAsDoctor = (dispatch) => {
  return async (
    {
      specialization,
      qualification,
      days,
      startTime,
      endTime,
      yearsOfExp,
      reg_no,
    },
    navigate,
  ) => {
    console.log('authContext: ', {
      specialization,
      qualification,
      days,
      startTime,
      endTime,
      yearsOfExp,
      reg_no,
    });
    try {
      const email = await AsyncStorage.getItem('doctorSignUpEmail');

      const response = await DocSahabApi.post('/auth/signup-as-doctor', {
        specialization,
        qualification,
        days,
        startTime,
        endTime,
        yearsOfExp,
        email,
        reg_no,
      });
      console.log(response.data);
      if (response.data == "Doctor's details saved") {
        dispatch({
          type: 'add_error_for_signUp',
          payload: 'Registration Successfull!',
        });
        navigate();
      } else if (response.data == "Unable to store doctor's details") {
        dispatch({
          type: 'add_error_for_signUp',
          payload: 'Email Already Exists!',
        });
      } else {
        console.log('Error');
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

const signIn = (dispatch) => {
  return async ({email, password}) => {
    try {
      const response = await DocSahabApi.post('/auth/login', {email, password});
      // to get our token back
      // console.log(response.data.token);
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem(
        'userData',
        JSON.stringify(response.data.user),
      );
      console.log(response.data.user)

      // save the email on signIn
      await AsyncStorage.setItem('signInData', email);
      // let token_value = await AsyncStorage.getItem('token');

      // set the random id for the chat purpose
      const id = uuid.v4();
      await AsyncStorage.setItem('user_Id', id);

      // let token_value = await AsyncStorage.getItem('token');

      dispatch({type: 'signIn', payload: response.data.token});
      // if user login
      RootNavigation.navigate('root');

      dispatch({type: 'signIn', payload: response.data.token});
      // if user login
      RootNavigation.navigate('root');
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: 'add_error_for_signIn',
        payload: 'Email or password is incorrect!',
      });
    }
  };
};

const signOut = (dispatch) => {
  return async (navigate) => {
    try {
      const response = await DocSahabApi.get('/auth/logout');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userData');
      // commented to test the chat from login screen
      // await AsyncStorage.removeItem('signInData');
      // await AsyncStorage.removeItem('user_Id');
      navigate();
    } catch (err) {}
  };
};

const forgetPassword = (dispatch) => {
  return async ({email}) => {
    try {
      const response = await DocSahabApi.post('/auth/forgot-password', {email});
      if (response.data == 'Cannot find this email') {
        dispatch({
          type: 'add_error_for_forgetpassword',
          payload: 'Cannot find this email!',
        });
      } else {
        ToastAndroid.show(
          'We have sent you a link through email, Check you email please',
          ToastAndroid.LONG,
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

const updatePassword = (dispatch) => {
  return async ({password}, navigate) => {
    try {
      const email = await AsyncStorage.getItem('userEmail');

      const response = await DocSahabApi.post('/auth/updatePassword', {
        email,
        password,
      });

      if (response.data == 'Cannot find this email') {
        dispatch({
          type: 'add_error_for_updatepassword',
          payload: 'Cannot find this email!',
        });
      } else {
        ToastAndroid.show('Password updated successfully!', ToastAndroid.LONG);
        navigate();
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const verifyEmail = (dispatch) => {
  return async ({email, doctor}, navigate) => {
    try {
      const response = await DocSahabApi.post('/auth/verify-email', {
        email,
        doctor,
      });
      if (response.data.code) {
        console.log('code', response.data.code);
        await AsyncStorage.setItem(
          'verifyEmailCode',
          JSON.stringify(response.data.code),
        );
        ToastAndroid.show(
          'We have sent you a verification code via email, Please enter that code here',
          ToastAndroid.LONG,
        );
        navigate();
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

// action functions
export const {Provider, Context} = createDataContext(
  authReducer,
  {
    signUp,
    signUpAsDoctor,
    signIn,
    signOut,
    forgetPassword,
    updatePassword,
    verifyEmail,
    fetchUser,
  },
  // { isSignedIn: false, errorMessage: ''}
  {
    token: null,
    errorMessageForSignIn: '',
    errorMessageForSignUp: '',
    errorMessageUpdatePassword: '',
    user: {},
  },
);
