import React, {useState, useContext} from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, 
    TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import SignUp from '../Auth/signup';
import { globalStyles } from '../../styles/globalStyles';
import NavigationHeaderWithBtn from '../../components/navigationHeaderWithBtn';
import HeaderView from '../../components/headerView';
import { Formik, } from 'formik';
import * as yup from 'yup';
import RNPickerSelect from "react-native-picker-select";
import RNMultiSelect from "@freakycoder/react-native-multiple-select";
import { Context as AuthContext } from '../../context/AuthContext';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';

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
    days: yup.array()
        .required('Day is required'),
    startTime: yup.string()
        .required('Start time is required'),
    endTime: yup.string()
        .required('End time is required'),
})

var Day = [
    { id: 0, value: "Monday", isChecked: false },
    { id: 0, value: "Tuesday", isChecked: false },
    { id: 0, value: "Wednesday", isChecked: false },
    { id: 0, value: "Thursday", isChecked: false },
    { id: 0, value: "Friday", isChecked: false },
    { id: 0, value: "Saturday", isChecked: false },
    { id: 0, value: "Sunday", isChecked: false }
];

const doctordetails = () => {

    const { state, signUpAsDoctor } = useContext(AuthContext);
    const navigation = useNavigation();

    const [qualification, setQualification] = useState();
    const [specialization, setSpecialization] = useState();
    const [days, setDay] = useState([]);

    var date = new Date();
    var newDate = date.toLocaleString();
    const [startTime, setStartTime] = useState(newDate);
    const [endTime, setEndTime] = useState(newDate);
    const [visibilityStart, setVisibilityStart] = useState(false);
    const [visibilityEnd, setVisibilityEnd] = useState(false);
    
    const onPressStart = () => {
        setVisibilityStart({ visibilityStart: true });
    };

    const onPressStartCancel = () => {
        setVisibilityStart({ visibilityStart: false });
    };

    const onPressEnd = () => {
        setVisibilityEnd({ visibilityEnd: true });
    };

    const onPressEndCancel = () => {
        setVisibilityEnd({ visibilityEnd: false });
    };
    const navigate = () => {
     navigation.navigate('login')
    }

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
                                    startTime: '',
                                    endTime: '',
                                    days: []
                                }}
                    validationSchema={DocDetValSchema}
                    onSubmit={(values, actions) => {
                        signUpAsDoctor(values,navigate);
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

                                    {/* time range picker */}
                                    <View style={globalStyles.inputLabel}>
                                        <Text style={globalStyles.inputLabelText}>
                                            Select your consultation timings
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        style={ styles.Button }
                                        onPress={ onPressStart }
                                    >
                                        <Text style={globalStyles.buttonTxt}> Start time  </Text>
                                    </TouchableOpacity>

                                    <DateTimePickerModal
                                        isVisible = { startTime, visibilityStart }
                                        onConfirm = {
                                            (startTime) => { setStartTime(startTime), console.log('start time: ', startTime.toLocaleString()), props.values.startTime = startTime.toString() }
                                        }
                                        onCancel = { onPressStartCancel }
                                        mode = "time"
                                        is24Hour = { true } //for am and pm
                                        display = "spinner"
                                    />
{/* 
                                    <View style={ styles.inputLabel }>
                                        <Text style={globalStyles.inputLabelText}>
                                            Your Start Time: { startTime.toLocaleString().slice(13, 24) }
                                        </Text>
                                    </View> */}
                                    <Text style={globalStyles.errorText}>{props.touched.startTime && props.errors.startTime}</Text>

                                    <TouchableOpacity
                                        style={ styles.Button }
                                        onPress={ onPressEnd }
                                    >
                                        <Text style={globalStyles.buttonTxt}> End Time </Text>
                                    </TouchableOpacity>

                                    <DateTimePickerModal
                                        isVisible = { endTime, visibilityEnd }
                                        onConfirm = {
                                            (endTime) => { setEndTime(endTime), console.log('end time: ', endTime.toLocaleString()), props.values.endTime = endTime.toString() }
                                        }
                                        onCancel = { onPressEndCancel }
                                        mode = "time"
                                        is24Hour = { true } //for am and pm
                                        display = "spinner"
                                        timeZoneOffsetInSeconds = { 3600 }
                                    />
                                    

                                    {/* <View style={ styles.inputLabel }>
                                        <Text style={globalStyles.inputLabelText}>
                                            Your End Time: { endTime.toLocaleString().slice(13, 24) }
                                        </Text>
                                    </View> */}
                                    <Text style={globalStyles.errorText}>{props.touched.endTime && props.errors.endTime}</Text>


                                    {/* Day multiple selects start */}
                                    <View style={globalStyles.inputLabel}>
                                        <Text style={globalStyles.inputLabelText}>
                                            Select Your Available Days
                                        </Text>
                                    </View>

                                    <View style={globalStyles.MultiSelect}>
                                        
                                        <RNMultiSelect
                                            width= {'100%'}
                                            data={Day}
                                            placeholder={"Select days"}
                                            menuBarContainerHeight = {370}
                                            onSelect={(days) => {
                                                setDay(days)
                                                props.values.days = days
                                            }}
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

const styles = StyleSheet.create({ 

Button: {
    width:"50%",
    color: 'white',
    backgroundColor: '#2A2AC0',
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:5,
    marginBottom: '2%',
    alignSelf: 'center'
},
inputLabel: {
    width:"90%",
    backgroundColor:"#ECF1FA",
    height:40,
    marginBottom: '5%',
    padding:15,
},

});

export default doctordetails;