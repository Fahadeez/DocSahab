import React, { useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity, 
    TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import NavigationHeaderWithBtn from '../../../src/components/navigationHeaderWithBtn';
import HeaderView from '../../../src/components/headerView';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Context as AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Signin from './login';

const VerifyEmailSchema = yup.object({
    code: yup.string()
        .required('Code is required')
        .max(40),
})

const Verifyemail = () => {
    const { state, verifyEmail } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <View style={globalStyles.containerColor}>

            <Formik
                initialValues={{ 
                                code: '', 
                            }}
                validationSchema={VerifyEmailSchema}
                onSubmit={(values, actions) => {
                    // verifyEmail(values);
                    actions.resetForm();
                    console.log(values);
                }}
            >
                {(props) => (
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                        <View style={globalStyles.containerColor}>

                            <NavigationHeaderWithBtn screenName={Signin}/>

                                <View style={{marginTop: '15%'}}>
                                    <HeaderView titletxt='Email Verification'/>
                                </View>

                                <View style={{marginTop: 50}}>
                                    <View style={globalStyles.subContainer}>

                                        <View style={globalStyles.inputLabel}>
                                            <Text style={globalStyles.inputLabelText}>
                                                Enter your Verification Code
                                            </Text>
                                        </View>

                                        <View style={globalStyles.inputViewForForgetPassword}>
                                            <TextInput
                                                keyboardType="number-pad"
                                                style={globalStyles.inputText}
                                                placeholder=""
                                                placeholderTextColor="#003f5c"
                                                onChangeText={props.handleChange('code')}
                                                value={props.values.code}
                                                onBlur={props.handleBlur('code')}
                                            />
                                        </View>
                                        <Text style={globalStyles.errorText}>{props.touched.code && props.errors.code}</Text>

                                        {/* {state ? (
                                            <View style={globalStyles.inputText}>
                                                <Text style={globalStyles.errorMessage}>{state}</Text>
                                            </View>
                                        ) : null
                                        } */}

                                        <TouchableOpacity 
                                            style={globalStyles.modifiedBtn}
                                            onPress={props.handleSubmit} >
                                            <Text style={globalStyles.buttonTxt}>Verify</Text>
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

export default Verifyemail;