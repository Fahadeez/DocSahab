import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './index';
import DocSahabApi from '../api/DocSahabApi';
import {useNavigation} from '@react-navigation/native';
import {ToastAndroid} from 'react-native';
import IO from 'socket.io-client';

const API_URI = 'http://192.168.1.105:5000';
// export const API_URI = 'https://doc-sahab.herokuapp.com';

const meetingReducer = (state, action) => {
  switch (action.type) {
    case 'JOIN_CHAT':
      return {...state, errorMessageForSignIn: action.payload};
    case 'ADD_STREAM':
      console.log('Add stream reducer');
      return {...state.streams, streams: [...state.streams, action.payload]};
    case 'MY_STREAM':
      console.log('my stream reducer');
      return {...state, myStream: action.payload};
    case 'ADD_REMOTE_STREAM':
      console.log('remote Add stream reducer');
      return {
        ...state.remoteStreams,
        remoteStreams: [...state.remoteStreams, action.payload],
      };
    default:
      return state;
  }
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
  meetingReducer,
  {verifyEmail},
  // { isSignedIn: false, errorMessage: ''}
  {video: {}, streams: [], remoteStreams: []},
);
