import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './CreateContextData';
import DocSahabApi from '../api/DocSahabApi';
import { useNavigation } from '@react-navigation/native';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error_for_signIn':
            return { ...state, errorMessageForSignIn: action.payload };
        case 'add_error_for_signUp':
            return { ...state, errorMessageForSignUp: action.payload };
        case 'signIn':
            return { errorMessageForSignIn: '', token: action.payload };
        case 'add_error_for_forgetpassword':
            return { ...state, errorMessageForgetPassword: action.payload };
        default:
            return state;
    }
};

const signUp = (dispatch) => {
    return async ({ email, password, firstName, lastName, contact, city, role }, navigate) => {
        try {
            // console.log("signup data", { email, password, firstName, lastName, contact, city, role })
            const response = await DocSahabApi.post('/auth/signup', { email, firstName, lastName, contact, city, role, password })
            console.log(response.data);
            if(response.data == "User's data added"){
                dispatch({ type: 'add_error_for_signUp', payload: 'Registration Successfull!' })
            }
            else if (response.data == 'Email already exists') {
                dispatch({ type: 'add_error_for_signUp', payload: 'Email Already Exists!' })
            }
            else if (response.data == "Doctor's data added") {
                navigate()
            }
            else {
                console.log('Error')
            }
        } catch (err) {
            console.log(err.message);
            dispatch({ type: 'add_error_for_signUp', payload: 'Email Already Exists!' })
        }
    };
};

const signUpAsDoctor = (dispatch) => {
    return async ({ specialization, qualification, days, timeSlots, yearsOfExp, email, reg_no }) => {
        try {
            const response = await DocSahabApi.post('/auth/signup-as-doctor', { specialization, qualification, days, timeSlots, yearsOfExp, email, reg_no })
            console.log(response.data);
            if(response.data == "Doctor's details saved"){
                dispatch({ type: 'add_error_for_signUp', payload: 'Registration Successfull!' })
            }
            else if (response.data == "Unable to store doctor's details") {
                dispatch({ type: 'add_error_for_signUp', payload: 'Email Already Exists!' })
            }
            else {
                console.log('Error')
            }
        } catch (err) {
            console.log(err.message);
            dispatch({ type: 'add_error_for_signUp', payload: 'Email Already Exists!' })
        }

    };
};

const signIn = (dispatch) => {

    return async ({ email, password }, navigate) => {
        try {
            const response = await DocSahabApi.post('/auth/login', { email, password })
            // to get our token back
            // console.log(response.data.token);

            await AsyncStorage.setItem('token', response.data.token);
            // let token_value = await AsyncStorage.getItem('token');

            dispatch({ type: 'signIn', payload: response.data.token });
            // if user login
            navigate()

        } catch (err) {
            console.log(err.message);
            dispatch({ type: 'add_error_for_signIn', payload: 'Email or password is incorrect!' })
        }
    };
};

const signOut = (dispatch) => {
    return async (navigate) => {
        try {
            const response = await DocSahabApi.get('/auth/logout')
            await AsyncStorage.removeItem('token')
            navigate()
        } catch (err) {

        }
    };
};

const forgetPassword = (dispatch) => {
    return async ({ email }) => {
        try {
            const response = await DocSahabApi.post('/auth/forgot-password', { email })
            if (response.data == "Cannot find this email") {
                dispatch({ type: 'add_error_for_forgetpassword', payload: 'Cannot find this email!' })
            }
            else {
                console.log('error')
            }
        } catch (err) {
            console.log(err.message);
        }
    };
};

const resetPassword = (dispatch) => {
    return async ({ email }) => {
        try {
            const response = await DocSahabApi.post('/auth/', { email })
            if (response.data == "Cannot find this email") {
                dispatch({ type: 'add_error_for_resetPassword', payload: 'Cannot find this email!' })
            }
            else {
                console.log('error')
            }
        } catch (err) {
            console.log(err.message);
        }
    };
};

// action functions
export const { Provider, Context } = createDataContext(
    authReducer,
    { signUp, signUpAsDoctor, signIn, signOut, forgetPassword, resetPassword },
    // { isSignedIn: false, errorMessage: ''}
    { token: null, errorMessageForSignIn: '', errorMessageForSignUp: '', errorMessageForgetPassword: '' }
);