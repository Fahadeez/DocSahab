import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './index';
import DocSahabApi from '../api/DocSahabApi';
import { useNavigation } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';
import IO from 'socket.io-client';
import Peer from 'react-native-peerjs';

const API_URI = 'http://192.168.10.4:5000';
// export const API_URI = 'https://doc-sahab.herokuapp.com';

const meetingReducer = (state, action) => {
    switch (action.type) {
        case 'JOIN_CHAT':
            return { ...state, errorMessageForSignIn: action.payload };
        case 'ADD_STREAM':
            console.log("Add stream reducer")
            return { ...state.streams, streams: [...state.streams, action.payload] };
        case 'MY_STREAM':
            console.log("my stream reducer")
            return { ...state, myStream: action.payload };
        case 'ADD_REMOTE_STREAM':
            console.log("remote Add stream reducer")
            return { ...state.remoteStreams, remoteStreams: [...state.remoteStreams, action.payload] };
        default:
            return state;
    }
};
const socket = IO(API_URI, {
    forceNew: true,
})
socket.on('connection', () => {
    console.log("****client connected*****")
})

socket.on('myevent', ({ value }) => {
    console.log("value", value)
})

socket.emit('emitEvent', { code: '4321' })

const peerServer = new Peer()

peerServer.on('error', console.log)

const joinRoom = (dispatch) => {
    return (stream) => {
        const roomId = "asdzxczxcvsf2312asd"
        console.log("stream in actions", stream);
        //my own stream
        dispatch({ type: 'MY_STREAM', payload: stream })
        //Open a connection to our server
        console.log("opening peer connection...")
        peerServer.on('open', (userId) => {
            console.log("peer server connection opened", userId)
            socket.emit('join-room', { userId, roomId })
        })
        socket.on('user-connected', (userId) => {
            console.log("user connected", userId)
            connectToNewUser(userId, stream, dispatch)
        })
        
        //Recieve a call 
        peerServer.on('call', (call) => {
            call.answer(stream);
            //Stream back the call
            call.on('stream', (stream) => {
                dispatch({ type: 'ADD_STREAM', payload: stream })
            })
        })
    };
};


function connectToNewUser(userId, stream, dispatch) {
    const call = peerServer.call(userId, stream);
    call.on('stream', (remoteVideoStream) => {
        console.log("remote video stream call")
        if (remoteVideoStream) {
            dispatch({ type: 'ADD_REMOTE_STREAM', payload: remoteVideoStream })
        }
    })
}

export const verifyEmail = (dispatch) => {
    return async ({ email, doctor }, navigate) => {
        try {
            const response = await DocSahabApi.post('/auth/verify-email', { email, doctor })
            if (response.data.code) {
                console.log("code", response.data.code)
                await AsyncStorage.setItem('verifyEmailCode', JSON.stringify(response.data.code))
                ToastAndroid.show("We have sent you a verification code via email, Please enter that code here",
                    ToastAndroid.LONG);
                navigate()

            }
        } catch (err) {
            console.log(err.message);
        }
    };
};

// action functions
export const { Provider, Context } = createDataContext(
    meetingReducer,
    { verifyEmail, joinRoom },
    // { isSignedIn: false, errorMessage: ''}
    { video: {}, streams: [], remoteStreams: [] }
);
