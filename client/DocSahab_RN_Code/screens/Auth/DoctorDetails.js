import React, {useState} from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, 
    TouchableWithoutFeedback, Keyboard } from 'react-native';
import SignUp from '../Auth/signup';
import { globalStyles } from '../../styles/globalStyles';
import NavigationHeaderWithBtn from '../../components/navigationHeaderWithBtn';
import HeaderView from '../../components/headerView';
import { Formik, } from 'formik';
import * as yup from 'yup';
import RNPickerSelect from "react-native-picker-select";
import RNMultiSelect from "@freakycoder/react-native-multiple-select";
import { object } from 'yup/lib/locale';


// Sign Up validation schema
const DocDetValSchema = yup.object({
    reg_No: yup.string()
        .required('Registration is required')
        .min(8),
    exp: yup.number()
        .required('Experience is required')
        .min(1),
    qualification: yup.string()
        .required('Qualification is required'),
    specialization: yup.string()
        .required('Specialization is required'),
    timeSlot: yup.array()
        .required('Available Time is required'),
})

// Data for the MutiSelect Time Slot
var Time = [
    {
        id: 0,
        value: "10:00 am",
        isChecked: false, },
    {
        id: 1,
        value: "12:00 pm",
        isChecked: false, },
    {
        id: 2,
        value: "2:00 pm",
        isChecked: false, },
    {
        id: 3,
        value: "4:00 pm",
        isChecked: false, },
    {
        id: 4,
        value: "6:00 pm",
        isChecked: false, },
    {
        id: 5,
        value: "8:00 pm",
        isChecked: false, },
    {
        id: 6,
        value: "10:00 pm",
        isChecked: false, },
  ];

const doctordetails = () => {
    const [qualification, setQualification] = useState();
    const [specialization, setSpecialization] = useState();
    const [timeSlot, setTimeSlot] = useState([]);

    return (
        <View style={globalStyles.containerColor}>

            <ScrollView 
                style={globalStyles.scrollView}
                showsVerticalScrollIndicator ={false}
                showsHorizontalScrollIndicator={false} 
            >

                <Formik
                    enableReinitialize
                    initialValues={{ 
                                    reg_No: '', 
                                    exp: '', 
                                    qualification:'', 
                                    specialization: '', 
                                    timeSlot: '',
                                }}
                    validationSchema={DocDetValSchema}
                    onSubmit={(values, actions) => {
                        actions.resetForm();
                        console.log(values);
                    }}
                >
                    {(props) => (
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={globalStyles.containerColor}>
                                
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
                                            onChangeText={props.handleChange('reg_No')}
                                            value={props.values.reg_No}
                                            onBlur={props.handleBlur('reg_No')}
                                            />
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.reg_No && props.errors.reg_No}</Text>

                                    <View style={globalStyles.inputView} >
                                        <TextInput
                                        style={globalStyles.inputText}
                                        placeholder="Years Of Experience"
                                        placeholderTextColor="#003f5c"
                                        onChangeText={props.handleChange('exp')}
                                        value={props.values.exp}
                                        onBlur={props.handleBlur('exp')}
                                        />
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.exp && props.errors.exp}</Text>

                                    {/* qualification drop down */}
                                    <View style={globalStyles.inputLabel}>
                                        <Text style={globalStyles.inputLabelText}>
                                            Select Your Qualification
                                        </Text>
                                    </View>

                                    <View style={globalStyles.pickerView}>
                                        <RNPickerSelect
                                            style={{ inputAndroid: { color: 'black' } }}
                                            placeholder={{ label: "Select your Qualification", value: '' }}
                                            onValueChange={(qualification, value) => {
                                                setQualification(value)
                                                props.values.qualification = qualification 
                                            } 
                                        }

                                            selectedValue={qualification}

                                            items={[
                                                { label: "MBBS", value: "MBBS" },
                                                { label:"Pharm.D", value:"Pharm.D" },
                                                { label:"B.Sc (Hons) MMG", value:"B.Sc (Hons) MMG" },
                                                { label:"B.Sc (Hons) Biotechnology", value:"B.Sc (Hons) Biotechnology" },
                                                { label:"DPT", value:"DPT" },
                                                { label:"DVM", value:"DVM" },
                                                { label:"B.Sc (Hons) Microbiology", value:"B.Sc (Hons) Microbiology" },
                                                { label:"B.Sc (Hons) DMLS", value:"B.Sc (Hons) DMLS" },
                                                { label:"Sc (Hons) Dental Technology", value:"Sc (Hons) Dental Technology" },
                                                { label:"Sc (Hons) Doctor Optometry (OD)", value:"Sc (Hons) Doctor Optometry (OD)" },
                                                { label:"Sc (Hons) Surgery Technology", value:"Sc (Hons) Surgery Technology" },
                                            ]}
                                        />
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.qualification && props.errors.qualification}</Text>

                                    {/* Specialization drop down */}
                                    <View style={globalStyles.inputLabel}>
                                        <Text style={globalStyles.inputLabelText}>
                                            Select Your Specialization
                                        </Text>
                                    </View>

                                    <View style={globalStyles.pickerView}>
                                        <RNPickerSelect
                                            style={{ inputAndroid: { color: 'black' } }}
                                            placeholder={{ label: "Select your Specialization", value: '' }}
                                            onValueChange={(specialization, value) => {
                                                setSpecialization(value)
                                                props.values.specialization = specialization 
                                            } 
                                        }

                                            selectedValue={specialization}

                                            items={[
                                                { label: "Heart Surgeon", value: "Heart Surgeon" },
                                                { label:"Cardiologists", value:"Cardiologists" },
                                                { label:"Dermatologists", value:"Dermatologists" },
                                                { label:"Family Physicians", value:"Family Physicians" },
                                                { label:"Allergists/Immunologists", value:"Allergists/Immunologists" },
                                                { label:"Neurologists", value:"Neurologists" },
                                                { label:"Pathologists", value:"Pathologists" },
                                                { label:"Pediatricians", value:"Pediatricians" },
                                                { label:"Physiatrists", value:"Physiatrists" },
                                                { label:"Podiatrists", value:"Podiatrists" },
                                                { label:"General Surgeons", value:"General Surgeons" },
                                                { label:"Urologists", value:"Urologists" },
                                                { label:"Gynecologist", value:"Gynecologist" },
                                                { label:"Rheumatologist", value:"Rheumatologist" },
                                                { label:"ENT Specialist", value:"ENT Specialist" },
                                                { label:"Fertility Specialist", value:"Fertility Specialist" },
                                                { label:"Gastroenterologist", value:"Gastroenterologist" },
                                                { label:"Hepatologist", value:"Hepatologist" },
                                                { label:"Nutritionist", value:"Nutritionist" },
                                            ]}
                                        />
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.specialization && props.errors.specialization}</Text>

                                    {/* Time Slot multiple selects start */}                                    

                                    {/* Time Slot Mutliple Select */}
                                    <View style={globalStyles.inputLabel}>
                                        <Text style={globalStyles.inputLabelText}>
                                            Select Your Available Time Slots
                                        </Text>
                                    </View>

                                    <View style={globalStyles.MultiSelect}>
                                        
                                        <RNMultiSelect
                                            // disableAbsolute
                                            data={Time}
                                            placeholder={"Karachi"}
                                            menuBarContainerHeight = {370}
                                            onSelect={(timeSlot) => {
                                                setTimeSlot(timeSlot)
                                                props.values.timeSlot = timeSlot
                                            }} 
                                            // onDoneButtonPress={}
                                            />
                                                                                    
                                    </View>
                                    
                                    {/* validation not working */}
                                    <Text style={globalStyles.errorText}>{props.touched.timeSlot && props.errors.timeSlot}</Text>

                                    {/* Time Slot multiple selects ends */}

                                    <TouchableOpacity 
                                        style={globalStyles.Button}
                                        onPress={props.handleSubmit}
                                    >
                                        <Text style={globalStyles.buttonTxt}>Sign Up</Text>
                                    </TouchableOpacity>
                                    
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

export default doctordetails;