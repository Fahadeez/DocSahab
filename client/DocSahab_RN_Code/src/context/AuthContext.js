import createDataContext from './CreateContextData';
import DocSahabApi from '../api/DocSahabApi';

const authReducer = (state, action) => {
    switch (action.type){
        default:
            return state;
    }
};

const signUpAsUser = (dispatch) => {
    return async ({ email, password, firstName, lastName, contact, city, role }) => {
        try{
            const response = await DocSahabApi.post('/auth/signup', {email, firstName, lastName, contact, city, role, password})
            // to get our token back
            console.log(response.data);
        } catch (err) {
            console.log(err.message);
        }
    };
};

const signUpAsDoctor = (dispatch) => {
    return async ({ email, password, firstName, lastName, contact, city, role, reg_No, exp, qualification, specialization, timeSlot }) => {
        try{
            const response = await DocSahabApi.post('/auth/signup')
        } catch (err) {

        }
    };
};

const signInAsUser = (dispatch) => {
    return async ({ email, password }) => {
        try{
            const response = await DocSahabApi.post('/auth/login', { email, password})
            // to egt our token back
            console.log(response.data);
        } catch (err) {
            console.log(err.message);
        }
    };
};

const signInAsDoctor = (dispatch) => {
    return async ({ email, password }) => {
        try{
            const response = await DocSahabApi.post('/auth/login')
        } catch (err) {

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
    { signUpAsUser, signUpAsDoctor, signInAsUser, signInAsDoctor, signOut },
    { isSignedIn: false}
);