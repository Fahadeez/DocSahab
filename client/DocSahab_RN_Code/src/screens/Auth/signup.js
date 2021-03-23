import React, {useState, useContext} from 'react';
import {Text, View, TextInput, TouchableOpacity, ScrollView,
 TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import NavigationHeaderWithBtn from '../../../src/components/navigationHeaderWithBtn';
import { globalStyles } from '../../styles/globalStyles';
import Signin from './login';
import HeaderView from '../../../src/components/headerView';
import ProceedToDocDetBtn from '../../../src/components/proceedToDocDetBtnForPicker';
import RNPickerSelect from "react-native-picker-select";
import { Context as AuthContext } from '../../context/AuthContext';

const signup = () => {
    const { state, signUp } = useContext(AuthContext);

    // remaining states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [contact, setContact] = useState('')
    const [role, setRole] = useState()
    const [city, setSelectedCity] = useState(false);

    
    return (
        <View style={globalStyles.containerColor}>
            <ScrollView 
                style={globalStyles.scrollView}
                showsVerticalScrollIndicator ={false}
                showsHorizontalScrollIndicator={false}
                >
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
                                        value={firstName}
                                        onChangeText={setfirstName}
                                    />
                                </View>


                                <View style={globalStyles.modifiedinputView} >
                                    <TextInput  
                                        style={globalStyles.inputText}
                                        placeholder="Last Name"
                                        placeholderTextColor="#003f5c"
                                        value={lastName}
                                        onChangeText={setlastName}
                                        />
                                </View>

                                <View style={globalStyles.modifiedinputView} >
                                    <TextInput
                                    style={globalStyles.inputText}
                                    keyboardType="number-pad"
                                    placeholder="Contact No"
                                    placeholderTextColor="#003f5c"
                                    value={contact}
                                    onChangeText={setContact}
                                    />
                                </View>


                                <View style={globalStyles.modifiedinputView} >
                                    <TextInput
                                    style={globalStyles.inputText}
                                    placeholder="Email"
                                    placeholderTextColor="#003f5c"
                                    value={email}
                                    onChangeText={setEmail}
                                    />
                                </View>

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
                                            selectedValue={city}
                                            onValueChange={setSelectedCity}
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

                                <View style={globalStyles.modifiedinputView} >
                                    <TextInput
                                    style={globalStyles.inputText}
                                    placeholder="Password"
                                    secureTextEntry
                                    placeholderTextColor="#003f5c"
                                    value={password}
                                    onChangeText={setPassword}
                                    />
                                </View>

                                <View style={globalStyles.checkboxContainer}>
                                    <Text style={globalStyles.label}>Are you a doctor?</Text>
                                    <CheckBox
                                        disabled={false}
                                        value={role}
                                        onValueChange={setRole}
                                    />
                                </View>

                                {
                                    role ? <ProceedToDocDetBtn />: <TouchableOpacity
                                    style={globalStyles.Button}
                                    onPress={() => signUp({ email, password, firstName, lastName, contact, city, role })} 
                                    
                                >
                                    <Text style={globalStyles.buttonTxt}>Sign Up</Text>
                                </TouchableOpacity>
                                }
                                                        
                                </View>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                    
            </ScrollView>
        </View>
    );
}

export default signup;