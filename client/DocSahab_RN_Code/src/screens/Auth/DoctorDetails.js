import React, {useState, useContext} from 'react';
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
import { Context as AuthContext } from '../../context/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';

// Sign Up validation schema
const DocDetValSchema = yup.object({
    reg_no: yup.string()
        .required('Registration is required')
        .min(7),
    yearsOfExp: yup.number()
        .required('Experience is required')
        .min(1),
    qualification: yup.string()
        .required('Qualification is required'),
    specialization: yup.string()
        .required('Specialization is required'),
    timeSlots: yup.array()
        .required('Available Time is required'),
    days: yup.array()
        .required('Day is required'),
})

// Data for the MutiSelect Time Slot
var Time = [
    {
        id: 0,
        value: "8:00 am - 9:00 am",
        isChecked: false, },
    {
        id: 1,
        value: "9:00 am - 10:00 am",
        isChecked: false, },
    {
        id: 2,
        value: "10:00 am - 11:00 am",
        isChecked: false, },
    {
        id: 3,
        value: "12:00 am - 1:00 pm",
        isChecked: false, },
    {
        id: 4,
        value: "1:00 pm - 2:00 pm",
        isChecked: false, },
    {
        id: 5,
        value: "2:00 pm - 3:00 pm",
        isChecked: false, },
    {
        id: 6,
        value: "3:00 pm - 4:00 pm",
        isChecked: false, },
    {
        id: 7,
        value: "4:00 pm - 5:00 pm",
        isChecked: false, },
    {
        id: 8,
        value: "5:00 pm - 6:00 pm",
        isChecked: false, },
    {
        id: 9,
        value: "6:00 pm - 7:00 pm",
        isChecked: false, },
    {
        id: 10,
        value: "8:00 pm - 9:00 pm",
        isChecked: false, },
    {
        id: 11,
        value: "9:00 pm - 10:00 pm",
        isChecked: false, },
  ];

var Day = [
    {   
        id: 0,
        value: "Monday",
        isChecked: false
    },
    {   
        id: 0,
        value: "Tuesday",
        isChecked: false
    },
    {   
        id: 0,
        value: "Wednesday",
        isChecked: false
    },
    {   
        id: 0,
        value: "Thursday",
        isChecked: false
    },
    {   
        id: 0,
        value: "Friday",
        isChecked: false
    },
    {   
        id: 0,
        value: "Saturday",
        isChecked: false
    },
    {   
        id: 0,
        value: "Sunday",
        isChecked: false
    }
];

const doctordetails = () => {

    const { state, signUpAsDoctor } = useContext(AuthContext);

    const [qualification, setQualification] = useState();
    const [specialization, setSpecialization] = useState();
    const [timeSlots, setTimeSlot] = useState([]);
    const [days, setDay] = useState([]);

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
                                    reg_no: '', 
                                    yearsOfExp: '', 
                                    qualification:'', 
                                    specialization: '', 
                                    timeSlots: [],
                                    days: []
                                }}
                    validationSchema={DocDetValSchema}
                    onSubmit={(values, actions) => {
                        signUpAsDoctor(values);
                        console.log(values);
                        actions.resetForm();

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

                                    {/* <View style={globalStyles.modifiedinputView} >
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
                                         */}

                                    <View style={globalStyles.inputView} >
                                        <TextInput  
                                            style={globalStyles.inputText}
                                            placeholder="PMC Verification No"
                                            placeholderTextColor="#003f5c"
                                            onChangeText={props.handleChange('reg_no')}
                                            value={props.values.reg_no}
                                            onBlur={props.handleBlur('reg_no')}
                                            />
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.reg_no && props.errors.reg_no}</Text>

                                    <View style={globalStyles.inputView} >
                                        <TextInput
                                        style={globalStyles.inputText}
                                        placeholder="Years Of Experience"
                                        placeholderTextColor="#003f5c"
                                        onChangeText={props.handleChange('yearsOfExp')}
                                        value={props.values.yearsOfExp}
                                        onBlur={props.handleBlur('yearsOfExp')}
                                        />
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.yearsOfExp && props.errors.yearsOfExp}</Text>

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
                                    <View style={globalStyles.inputLabel}>
                                        <Text style={globalStyles.inputLabelText}>
                                            Select Your Available Time Slots
                                        </Text>
                                    </View>

                                    <View style={globalStyles.MultiSelect}>
                                        
                                        <RNMultiSelect
                                            // disableAbsolute
                                            width= {'100%'}
                                            data={Time}
                                            placeholder={"10:00 am - 11:00 am"}
                                            menuBarContainerHeight = {600}
                                            onSelect={(timeSlots) => {
                                                setTimeSlot(timeSlots)
                                                props.values.timeSlots = timeSlots
                                            }} 
                                            // onDoneButtonPress={}
                                            />                                       
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.timeSlots && props.errors.timeSlots}</Text>
                                    {/* Time Slot multiple selects ends */}

                                    {/* Day multiple selects start */}
                                    <View style={globalStyles.inputLabel}>
                                        <Text style={globalStyles.inputLabelText}>
                                            Select Your Available Days
                                        </Text>
                                    </View>

                                    <View style={globalStyles.MultiSelect}>
                                        
                                        <RNMultiSelect
                                            // disableAbsolute
                                            width= {'100%'}
                                            data={Day}
                                            placeholder={"Monday"}
                                            menuBarContainerHeight = {370}
                                            onSelect={(days) => {
                                                setDay(days)
                                                props.values.days = days
                                            }} 
                                            // onDoneButtonPress={}
                                            />                                       
                                    </View>
                                    <Text style={globalStyles.errorText}>{props.touched.days && props.errors.days}</Text>
                                    {/* Day multiple selects ends */}

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