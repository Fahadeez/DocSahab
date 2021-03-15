import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import SignUp from '../Auth/signup';
import { globalStyles } from '../../styles/globalStyles';
import NavigationHeaderWithBtn from '../../components/navigationHeaderWithBtn';
import HeaderView from '../../components/headerView';
import {Picker} from '@react-native-picker/picker';


const doctordetails = () => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    return (
        <View style={globalStyles.containerColor}>
            <ScrollView style={globalStyles.scrollView}>

            <NavigationHeaderWithBtn screenName={SignUp}/>
            
            <View style={{marginTop: '15%'}}>
                <HeaderView titletxt='Doctor Details'/>
            </View>

            <View style={{marginTop: 50}}>
                <View style={globalStyles.container}>
                    


                <View style={globalStyles.inputView} >
                    <TextInput  
                        style={globalStyles.inputText}
                        placeholder="PMC Verification No"
                        placeholderTextColor="#003f5c"
                        />
                </View>

                <View style={globalStyles.inputView} >
                    <TextInput
                    style={globalStyles.inputText}
                    placeholder="Years Of Experience"
                    placeholderTextColor="#003f5c"
                    />
                </View>

                {/* qualification drop down */}
                <View style={globalStyles.inputLabel}>
                    <Text style={globalStyles.inputLabelText}>
                        Select Your Qualification
                    </Text>
                </View>

                <View style={globalStyles.pickerView}>
                    <Picker
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="MBBS" value="MBBS" />
                        <Picker.Item label="MBBS" value="MBBS" />
                    </Picker>
                </View>

                {/* Specialization drop down */}
                <View style={globalStyles.inputLabel}>
                    <Text style={globalStyles.inputLabelText}>
                        Select Your Specialization
                    </Text>
                </View>

                <View style={globalStyles.pickerView}>
                    <Picker
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Heart Surgeon" value="Heart Surgeon" />
                        <Picker.Item label="Heart Surgeon" value="Heart Surgeon" />
                    </Picker>
                </View>

                {/* Time Slot multiple selects */}
                <View style={globalStyles.inputView} >
                    <TextInput  
                        style={globalStyles.inputText}
                        placeholder="Select Your Time Slots (multiple Selects)"
                        placeholderTextColor="#003f5c"
                        />
                </View>


                <TouchableOpacity style={globalStyles.Button}>
                    <Text style={globalStyles.buttonTxt}>Sign Up</Text>
                </TouchableOpacity>
                
                </View>
            </View>

            </ScrollView>
        </View>
    );
}

export default doctordetails;