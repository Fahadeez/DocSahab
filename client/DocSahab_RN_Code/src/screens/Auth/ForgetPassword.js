import React, { useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity, 
    TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import NavigationHeaderWithBtn from '../../../src/components/navigationHeaderWithBtn';
import Signin from './login';
import HeaderView from '../../../src/components/headerView';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Context as AuthContext } from '../../context/AuthContext';
// import resetPassword from '../Auth/ResetPassword';
import { useNavigation } from '@react-navigation/native';

// Forget Password validation schema
const ForgetPassSchema = yup.object({
    email: yup.string()
        .required('Email is required')
        .email("Please enter valid email")
        .max(40),
})

const forgetpassword = () => {
    const { state, forgetPassword } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <View style={globalStyles.containerColor}>

            <Formik
                initialValues={{ 
                                email: '', 
                            }}
                validationSchema={ForgetPassSchema}
                onSubmit={(values, actions) => {
                    forgetPassword(values);
                    actions.resetForm();
                    console.log(values);
                }}
            >
                {(props) => (
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                        <View style={globalStyles.containerColor}>

                            <NavigationHeaderWithBtn screenName={Signin}/>

                                <View style={{marginTop: '15%'}}>
                                    <HeaderView titletxt='Forgot Password'/>
                                </View>

                                <View style={{marginTop: 50}}>
                                    <View style={globalStyles.subContainer}>

                                        <View style={globalStyles.inputLabel}>
                                            <Text style={globalStyles.inputLabelText}>
                                                Enter your email address
                                            </Text>
                                        </View>

                                        <View style={globalStyles.inputViewForForgetPassword}>
                                            <TextInput  
                                                style={globalStyles.inputText}
                                                placeholder="nabeelsiddiqui86@gmail.com"
                                                placeholderTextColor="#003f5c"
                                                onChangeText={props.handleChange('email')}
                                                value={props.values.email}
                                                onBlur={props.handleBlur('email')}
                                            />
                                        </View>
                                        <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}</Text>

                                        {state.errorMessageForgetPassword ? (
                                            <View style={globalStyles.inputText}>
                                                <Text style={globalStyles.errorMessage}>{state.errorMessageForgetPassword}</Text>
                                            </View>
                                        ) : null
                                        }

                                        <TouchableOpacity 
                                            style={globalStyles.modifiedBtn}
                                            onPress={props.handleSubmit} >
                                            <Text style={globalStyles.buttonTxt}>Reset</Text>
                                        </TouchableOpacity>

                                        {/* for testing the reset password screen */}

                                        {/* <TouchableOpacity 
                                            style={globalStyles.Button}
                                            onPress={() => navigation.navigate(resetPassword)} >
                                            <Text style={globalStyles.buttonTxt}>Reset Screen</Text>
                                        </TouchableOpacity> */}

                                    </View>
                                </View>

                        </View>

                    </TouchableWithoutFeedback>
                )}
                            
            </Formik>
        </View>
    );
}

export default forgetpassword;