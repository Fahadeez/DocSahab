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
import { useNavigation } from '@react-navigation/native';

// Forget Password validation schema
const ForgetPassSchema = yup.object({
    password: yup.string()
        .required('Password is required')
        .min(8, ({ min }) => `Password must be at least ${min} characters`),
    confirmPassword: yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf(
        [yup.ref("password")],
        "Both password need to be the same")
    }),
})

const resetPassword = () => {

    return (
        <View style={globalStyles.containerColor}>

            <Formik
                initialValues={{
                    password: '',
                    confirmPassword: '',
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
                                <HeaderView titletxt='Reset Password' />
                            </View>

                            <View style={{ marginTop: 50 }}>
                                <View style={globalStyles.subContainer}>

                                    <View style={globalStyles.inputLabel}>
                                        <Text style={globalStyles.inputLabelText}>
                                            Enter your new password
                                            </Text>
                                    </View>

                                    <View style={globalStyles.modifiedinputView}>
                                        <TextInput
                                            style={globalStyles.inputText}
                                            secureTextEntry
                                            placeholder="New password"
                                            placeholderTextColor="#003f5c"
                                            onChangeText={props.handleChange('password')}
                                            value={props.values.password}
                                            onBlur={props.handleBlur('password')}
                                        />
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>

                                    <View style={globalStyles.modifiedinputView}>
                                        <TextInput
                                            style={globalStyles.inputText}
                                            secureTextEntry
                                            placeholder="Confrim password"
                                            placeholderTextColor="#003f5c"
                                            onChangeText={props.handleChange('confirmPassword')}
                                            value={props.values.confirmPassword}
                                            onBlur={props.handleBlur('confirmPassword')}
                                        />
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.confirmPassword && props.errors.confirmPassword}</Text>

                                    <TouchableOpacity
                                        style={globalStyles.modifiedBtn}
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