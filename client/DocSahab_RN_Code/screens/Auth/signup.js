import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity, ScrollView,
 TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import NavigationHeaderWithBtn from '../../components/navigationHeaderWithBtn';
import { globalStyles } from '../../styles/globalStyles';
import Signin from '../Auth/login';
import HeaderView from '../../components/headerView';
import ProceedToDocDetBtn from '../../components/proceedToDocDetBtnForPicker';
import { Formik, } from 'formik';
import * as yup from 'yup';
import RNPickerSelect from "react-native-picker-select";
import { boolean } from 'yup';

// Sign Up validation schema
const SignUpValSchema = yup.object({
    email: yup.string()
        .required('Email is required')
        .email("Please enter valid email")
        .max(40),
    password: yup.string()
        .required('Password is required')
        .min(8, ({ min }) => `Password must be at least ${min} characters`),
    confirmPassword: yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf(
        [yup.ref("password")],
        "Both password need to be the same")
    }),
    firstName: yup.string()
        .required('First Name is required')
        .min(4),
    lastName: yup.string()
        .required('Last Name is required')
        .min(4),
    contact: yup.string()
        .required('contact Number is required')
        .min(11, ({ min }) => `contact No must be at least ${min} characters`),
    city: yup.string()
        .required('City is required'),
    // No Need For Now.
    // address: yup.string()
    //     .required('address is required')
    //     .max(100),
})

const signup = () => {
    const [role, setRole] = useState(false)
    const [city, setSelectedCity] = useState();
  
    return (
        <View style={globalStyles.containerColor}>
            <ScrollView 
                style={globalStyles.scrollView}
                showsVerticalScrollIndicator ={false}
                showsHorizontalScrollIndicator={false}
                >

                    <Formik
                        initialValues={{ 
                                        email: '', 
                                        password: '', 
                                        confirmPassword:'', 
                                        firstName: '', 
                                        lastName: '', 
                                        contact: '', 
                                        city: '',
                                        role: ''
                                        // No Need For Now.
                                        // address: ''
                                    }}
                        validationSchema={SignUpValSchema}
                        onSubmit={(values, actions) => {
                            actions.resetForm();
                            console.log(values);
                        }}
                    >
                    {(props) => (

                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                            <View style={globalStyles.containerColor}>

                                <NavigationHeaderWithBtn screenName={Signin}/>
                            
                                <View style={{marginTop: '15%'}}>
                                    <HeaderView titletxt='Sign Up'/>
                                </View>

                                <View style={{marginTop: 50}}>
                                    <View style={globalStyles.container}>

                                    <View style={globalStyles.modifiedinputView} >
                                        <TextInput  
                                            style={globalStyles.inputText}
                                            placeholder="First Name"
                                            placeholderTextColor="#003f5c"
                                            onChangeText={props.handleChange('firstName')}
                                            value={props.values.firstName}
                                            onBlur={props.handleBlur('firstName')}
                                            />
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.firstName && props.errors.firstName}</Text>


                                    <View style={globalStyles.modifiedinputView} >
                                        <TextInput  
                                            style={globalStyles.inputText}
                                            placeholder="Last Name"
                                            placeholderTextColor="#003f5c"
                                            onChangeText={props.handleChange('lastName')}
                                            value={props.values.lastName}
                                            onBlur={props.handleBlur('lastName')}
                                            />
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.lastName && props.errors.lastName}</Text>

                                    <View style={globalStyles.modifiedinputView} >
                                        <TextInput
                                        style={globalStyles.inputText}
                                        keyboardType="number-pad"
                                        placeholder="Contact No"
                                        placeholderTextColor="#003f5c"
                                        onChangeText={props.handleChange('contact')}
                                        value={props.values.contact}
                                        onBlur={props.handleBlur('contact')}
                                        />
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.contact && props.errors.contact}</Text>


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



                                    {/* city drop down */}
                                    <View style={globalStyles.inputLabel}>
                                        <Text style={globalStyles.inputLabelText}>
                                            Select Your City
                                        </Text>
                                    </View>

                                    <View style={globalStyles.pickerView}>
                                        
                                        <RNPickerSelect 
                                                style={{ inputAndroid: { color: 'black' } }}
                                                placeholder={{ label: "Select your City", value: '' }}
                                                onValueChange={(city, value) => {
                                                setSelectedCity(value)
                                                props.values.city = city
                                                }
                                            }

                                             selectedValue={city}
                                             items={[
                                                 { label: "Lahore", value: "Lahore" },
                                                 { label:"Karachi", value:"Karachi" },
                                                 { label:"Islamabad", value:"Islamabad" },
                                                 { label:"Peshawar", value:"Peshawar" },
                                                 { label:"Multan", value:"Multan" },
                                                 { label:"Rawalpindi", value:"Rawalpindi" },
                                                 { label:"Faisalabad", value:"Faisalabad"} ,
                                                 { label:"Quetta", value:"Quetta" },
                                                 { label:"Hyderabad", value:"Hyderabad" },
                                                 { label:"Thatta", value:"Thatta" },
                                             ]}
                                         />
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.city && props.errors.city}</Text>

                                    {/* No Need For Now. */}
                                    {/* <View style={globalStyles.modifiedinputView}>
                                        <TextInput
                                        style={globalStyles.inputText}
                                        numberOfLines={4}
                                        multiline = {true}
                                        placeholder="Address"
                                        placeholderTextColor="#003f5c"
                                        onChangeText={props.handleChange('address')}
                                        value={props.values.address}
                                        onBlur={props.handleBlur('address')}
                                        />
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.address && props.errors.address}</Text> */}


                                    <View style={globalStyles.modifiedinputView} >
                                        <TextInput
                                        style={globalStyles.inputText}
                                        placeholder="Password"
                                        secureTextEntry
                                        placeholderTextColor="#003f5c"
                                        onChangeText={props.handleChange('password')}
                                        value={props.values.password}
                                        onBlur={props.handleBlur('password')}
                                        />
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>


                                    <View style={globalStyles.modifiedinputView} >
                                        <TextInput
                                        style={globalStyles.inputText}
                                        placeholder="Confirm Password"
                                        secureTextEntry
                                        placeholderTextColor="#003f5c"
                                        onChangeText={props.handleChange('confirmPassword')}
                                        value={props.values.confirmPassword}
                                        onBlur={props.handleBlur('confirmPassword')}
                                        />
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.confirmPassword && props.errors.confirmPassword}</Text>


                                    <View style={globalStyles.checkboxContainer}>
                                        <Text style={globalStyles.label}>Are you a doctor?</Text>
                                        <CheckBox
                                            disabled={false}
                                            value={role}
                                            onValueChange={(value) => {
                                                setRole(value, console.log('Role', value))
                                                props.values.role = role
                                                }
                                            }
                                        />
                                    </View>

                                    {
                                        role ? <ProceedToDocDetBtn />: <TouchableOpacity 
                                        style={globalStyles.Button}
                                        onPress={props.handleSubmit}
                                    >
                                        <Text style={globalStyles.buttonTxt}>Sign Up</Text>
                                    </TouchableOpacity>
                                    }
                                                            
                                    </View>
                                </View>

                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </Formik>

            </ScrollView>
        </View>
    );
}

export default signup;