import createDataContext from './CreateContextData';
import DocSahabApi from '../api/DocSahabApi';

const authReducer = (state, action) => {
    switch (action.type){
        case 'add_error':
            return { ...state, errorMessage: action.payload };
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
            dispatch({ type: 'add_error', payload: 'Please fill all the credentials!' })
        }
    };
};

const signIn = (dispatch) => {
    return async ({email, password}) => {
        try{
            const response = await DocSahabApi.post('/auth/login', {email, password})
            // to get our token back
            console.log(response.data);
        } catch (err) {
            console.log(err.message);
            dispatch({ type: 'add_error', payload: 'Email or password is incorrect!' })
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
    { isSignedIn: false, errorMessage: ''}
);