import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './CreateContextData';
import DocSahabApi from '../api/DocSahabApi';
import { navigate } from '../navigationRef';
import { useNavigation } from '@react-navigation/native';
import DashboardScreen from '../screens/Dashboard/dashboard';

const authReducer = (state, action) => {
    switch (action.type){
        case 'add_error_for_signIn':
            return { ...state, errorMessageForSignIn: action.payload };
        // case 'add_error_for_signUp':
        //     return { ...state, errorMessageForSignUp: action.payload };
        case 'signIn':
            return { errorMessageForSignIn: '', token: action.payload };
        default:
            return state;
    }
};

const signUp = (dispatch) => {
    return async ({ email, password, firstName, lastName, contact, city, role }) => {
        try{
            const response = await DocSahabApi.post('/auth/signup', {email, firstName, lastName, contact, city, role, password})
            console.log(response.data);
        } catch (err) {
            console.log(err.message);
            dispatch({ type: 'add_error_for_signUp', payload: 'Please fill all the credentials!' })
        }
    };
};

const signIn = (dispatch) => {
    // const navigation = useNavigation();
    return async ({email, password}) => {
        try{
            const response = await DocSahabApi.post('/auth/login', {email, password})
            // to get our token back
            // console.log(response.data.token);

            await AsyncStorage.setItem('token', response.data.token);
            // let token_value = await AsyncStorage.getItem('token');

            dispatch({ type: 'signIn', payload: response.data.token });

            // if user login
            navigate("dashboard");
            // if ( token_value != null){
            //     // navigate('dashboard');
            //     const navigation = useNavigation();
            //     navigation.navigate(DashboardScreen);
            // }
            // else{
            //     console.log('no token');
            // }

            
            
        } catch (err) {
            console.log(err.message);
            dispatch({ type: 'add_error_for_signIn', payload: 'Email or password is incorrect!' })
        }
    };
};

const signOut = (dispatch) => {
    return async () => {
        try{
            const response = await DocSahabApi.post('/auth/logout')
        } catch (err) {

        }
    };
};

// action functions
export const { Provider, Context } = createDataContext(
    authReducer,
    { signUp, signIn, signOut },
    // { isSignedIn: false, errorMessage: ''}
    { token: null, errorMessageForSignIn: ''}
);