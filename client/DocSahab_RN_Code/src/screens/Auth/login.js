import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import HeaderView from '../../../src/components/headerView';
import { globalStyles } from '../../styles/globalStyles';
import Signup from './signup';
import ForgetPassword from './ForgetPassword';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';

// login validation schema
const loginValSchema = yup.object({
    email: yup.string()
        .required('Email is required')
        .email("Please enter valid email")
        .max(40),
    password: yup.string()
        .required('Password is required')
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
})

const login = () => {
    const navigation = useNavigation();
    return (
        <View style={globalStyles.containerColor}>

            <ScrollView 
                style={globalStyles.scrollView}
                showsVerticalScrollIndicator ={false}
                showsHorizontalScrollIndicator={false}
                >
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={loginValSchema}
                        onSubmit={(values, actions) => {
                            actions.resetForm();
                            console.log(values.email, values.password);
                        }}
                    >
                    {(props) => (
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            
                            <View style={globalStyles.container}>
                                
                                <View style={globalStyles.logoView}>
                                    <Image source={require('../../../assets/docsahab.png')} style = {{height: 150, width: 150}} />
                                </View>

                                <HeaderView titletxt='Welcome'/>
                                
                                <Text style={globalStyles.subHeaderTxt}>Sign in to continue</Text>
                                
                                <View style={globalStyles.modifiedinputView} >
                                <TextInput  
                                    style={globalStyles.inputText}
                                    placeholder="Email"
                                    placeholderTextColor="#003f5c"
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                    onBlur={props.handleBlur('email')}
                                    />
                                </View>
                                <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}</Text>
                                
                                <View style={globalStyles.modifiedinputView} >
                                <TextInput
                                    secureTextEntry
                                    style={globalStyles.inputText}
                                    placeholder="Password"
                                    placeholderTextColor="#003f5c"
                                    onChangeText={props.handleChange('password')}
                                    value={props.values.password}
                                    onBlur={props.handleBlur('password')}
                                    />
                                </View>
                                <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>
                                
                                <View style={ { alignSelf: 'flex-end', right: 25 } }>
                                    <TouchableOpacity onPress={() => navigation.navigate(ForgetPassword)}>
                                        <Text style={globalStyles.forgetPassLinkTxt}>Forgot Password?</Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity 
                                    style={globalStyles.Button}
                                    onPress={props.handleSubmit}
                                >
                                    <Text style={globalStyles.buttonTxt}>Sign In</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={globalStyles.Button}
                                    onPress={() => navigation.navigate('dashboard')}
                                >
                                    <Text style={globalStyles.buttonTxt}>Dashboard</Text>
                                </TouchableOpacity>
                                
                                <View style={ { marginTop: '10%' } }>
                                    <View style={{flex: 1, flexDirection: 'row'} }>
                                        <Text>
                                            Doesn't have account?
                                        </Text>
                                        <TouchableOpacity onPress={() => navigation.navigate(Signup)}>
                                            <Text style={{color: "#2A2AC0"}}> Sign up </Text>
                                        </TouchableOpacity>
                                        <Text>
                                            here
                                        </Text>
                                    </View>
                                </View>

                        </View>

                    </TouchableWithoutFeedback>
                    )}
                        
                    </Formik>

        </ScrollView>
        
    </View>
    
    );
};

export default login;