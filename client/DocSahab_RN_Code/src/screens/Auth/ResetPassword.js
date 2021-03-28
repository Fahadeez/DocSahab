import React from 'react';
import {
    Text, View, TextInput, TouchableOpacity,
    TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import NavigationHeaderWithBtn from '../../../src/components/navigationHeaderWithBtn';
import Signin from './login';
import HeaderView from '../../../src/components/headerView';
import { Formik } from 'formik';
import * as yup from 'yup';

// Forget Password validation schema
const ForgetPassSchema = yup.object({
    password: yup.string()
        .required('Password is required')
        .max(12),
})

const resetPassword = () => {
    return (
        <View style={globalStyles.containerColor}>

            <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={ForgetPassSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    console.log(values);
                }}
            >
                {(props) => (
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                        <View style={globalStyles.containerColor}>

                            <NavigationHeaderWithBtn screenName={Signin} />

                            <View style={{ marginTop: '15%' }}>
                                <HeaderView titletxt='Forgot Password' />
                            </View>

                            <View style={{ marginTop: 50 }}>
                                <View style={globalStyles.subContainer}>

                                    <View style={globalStyles.inputLabel}>
                                        <Text style={globalStyles.inputLabelText}>
                                            Enter your new password
                                            </Text>
                                    </View>

                                    <View style={globalStyles.inputView}>
                                        <TextInput
                                            style={globalStyles.inputText}
                                            placeholder="New password"
                                            placeholderTextColor="#003f5c"
                                            onChangeText={props.handleChange('password')}
                                            value={props.values.email}
                                            onBlur={props.handleBlur('password')}
                                        />
                                    </View>
                                    <View style={globalStyles.inputView}>
                                        <TextInput
                                            style={globalStyles.inputText}
                                            placeholder="Confrim password"
                                            placeholderTextColor="#003f5c"
                                            onChangeText={props.handleChange('password')}
                                            value={props.values.email}
                                            onBlur={props.handleBlur('password')}
                                        />
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>

                                    <TouchableOpacity
                                        style={globalStyles.Button}
                                        onPress={props.handleSubmit} >
                                        <Text style={globalStyles.buttonTxt}>Reset</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </View>

                    </TouchableWithoutFeedback>
                )}

            </Formik>
        </View>
    );
}

export default resetPassword;