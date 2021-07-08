import React, { useState, useContext, useEffect } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    LogBox,
    ToastAndroid
} from 'react-native';
import SignUp from '../Auth/signup';
import { globalStyles } from '../../styles/globalStyles';
import NavigationHeaderWithBtn from '../../components/navigationHeaderWithBtn';
import HeaderView from '../../components/headerView';
import { Formik } from 'formik';
import * as yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';
import RNMultiSelect from '@freakycoder/react-native-multiple-select';
import { Context as AuthContext } from '../../context/AuthContext';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import DocSahabApi from '../../api/DocSahabApi';
import moment from 'moment';

// Sign Up validation schema
const DocDetValSchema = yup.object({
    reg_no: yup.string().required('Registration is required').min(7),
    yearsOfExp: yup.number().required('Experience is required').min(1),
    qualification: yup.string().required('Qualification is required'),
    specialization: yup.string().required('Specialization is required'),
    days: yup.array().required('Day is required'),
    startTime: yup.string().required('Start time is required'),
    endTime: yup.string().required('End time is required'),
    account_no: yup.string().required('Account no is required'),
    fees: yup.string().required('Fees is required'),

});

var Day = [
    { id: 0, value: 'Monday', isChecked: false },
    { id: 0, value: 'Tuesday', isChecked: false },
    { id: 0, value: 'Wednesday', isChecked: false },
    { id: 0, value: 'Thursday', isChecked: false },
    { id: 0, value: 'Friday', isChecked: false },
    { id: 0, value: 'Saturday', isChecked: false },
    { id: 0, value: 'Sunday', isChecked: false },
];

const doctordetails = () => {
    const { state, signUpAsDoctor } = useContext(AuthContext);
    const navigation = useNavigation();

    const [qualification, setQualification] = useState();
    const [bank, setBank] = useState();

    const [specialization, setSpecialization] = useState();
    const [yearsOfExp, setYearsOfExp] = useState();
    const [fees, setFees] = useState();
    const [accountNo, setAccountNo] = useState();


    const [days, setDay] = useState([]);
    const [newDays, setNewDay] = useState([]);

    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [startTimeShow, setStartTimeShow] = useState();
    const [endTimeShow, setEndTimeShow] = useState();

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
        navigation.navigate('login');
    };
    onSubmitData = async (data) => {
        try {
            const res = await DocSahabApi.post("/api/update-docProfile", { data })
            if(res.status === 200){
                ToastAndroid.show("Information updated successfully",ToastAndroid.LONG)
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const currentUser = async () => {
        try {
            const response = await DocSahabApi.get('/auth/current_user');
            console.log(response.data);
            const { fees, qualification, specialization, startCheckupTime, endCheckupTime, days, Bank, accountNo, yearsOfExp } = response.data;
            setYearsOfExp(yearsOfExp)
            setFees(fees)
            setSpecialization(specialization);
            setDay(days)
            setBank(Bank);
            setQualification(qualification);
            setAccountNo(accountNo)
            setStartTimeShow(moment(startCheckupTime).format('HH:mm'));
            setEndTimeShow(moment(endCheckupTime).format('HH:mm'));
            setStartTime(startCheckupTime)
            setEndTime(endCheckupTime)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        currentUser()
    }, [])

    LogBox.ignoreLogs([
        'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
        'Failed prop type: Invalid prop `isVisible` of type `object` supplied to `<<anonymous>>`, expected `boolean`.',
        'Deprecation warning: value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions.',
    ]);
    return (
        <View style={globalStyles.containerColor}>
            <ScrollView
                style={globalStyles.scrollView}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <Formik
                    enableReinitialize
                    initialValues={{
                        yearsOfExp: yearsOfExp,
                        qualification: qualification,
                        specialization: specialization,
                        startTime: startTime,
                        endTime: endTime,
                        newDays: newDays,
                        bank: bank,
                        account_no: accountNo,
                        fees: fees
                    }}
                    validationSchema={DocDetValSchema}
                    onSubmit={(values, actions) => {
                        onSubmitData(values)
                        console.log("VALUES:", values);
                    }}>
                    {(props) => (
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={globalStyles.containerColor}>
                                <NavigationHeaderWithBtn screenName={"root"} />

                                <View style={{ marginTop: '15%' }}>
                                    <HeaderView titletxt="My Profile" />
                                </View>

                                <View style={{ marginTop: 50 }}>
                                    <View style={globalStyles.container}>
                                        <View style={globalStyles.inputView}>
                                            <TextInput
                                                style={globalStyles.inputText}
                                                placeholder="Years Of Experience"
                                                placeholderTextColor="#003f5c"
                                                onChangeText={(text) => {
                                                    setYearsOfExp(text)
                                                    props.values.yearsOfExp = text
                                                }}
                                                value={props.values.yearsOfExp}
                                                onBlur={props.handleBlur('yearsOfExp')}
                                            />
                                        </View>
                                        <Text style={globalStyles.errorText}>
                                            {props.touched.yearsOfExp && props.errors.yearsOfExp}
                                        </Text>

                                        <View style={globalStyles.inputView}>
                                            <TextInput
                                                style={globalStyles.inputText}
                                                placeholder="Fees"
                                                placeholderTextColor="#003f5c"
                                                onChangeText={(text) => {
                                                    setFees(text)
                                                    props.values.fees = text
                                                }}
                                                value={props.values.fees}
                                                onBlur={props.handleBlur('fees')}
                                            />
                                        </View>
                                        <Text style={globalStyles.errorText}>
                                            {props.touched.fees && props.errors.fees}
                                        </Text>

                                        {/* qualification drop down */}
                                        <View style={globalStyles.inputLabel}>
                                            <Text style={globalStyles.inputLabelText}>
                                                Change your qualification
                                            </Text>
                                        </View>

                                        <View style={globalStyles.pickerView}>
                                            <RNPickerSelect
                                                style={{ inputAndroid: { color: 'black' } }}
                                                placeholder={{
                                                    label: 'Select your Qualification',
                                                    value: '',
                                                }}
                                                onValueChange={(qualification, value) => {
                                                    setQualification(qualification);
                                                    props.values.qualification = qualification;
                                                }}
                                                pickerProps={{
                                                    selectedValue: qualification
                                                }}
                                                items={[
                                                    { label: 'MBBS', value: 'MBBS' },
                                                    { label: 'Pharm.D', value: 'Pharm.D' },
                                                    { label: 'B.Sc (Hons) MMG', value: 'B.Sc (Hons) MMG' },
                                                    {
                                                        label: 'B.Sc (Hons) Biotechnology',
                                                        value: 'B.Sc (Hons) Biotechnology',
                                                    },
                                                    { label: 'DPT', value: 'DPT' },
                                                    { label: 'DVM', value: 'DVM' },
                                                    {
                                                        label: 'B.Sc (Hons) Microbiology',
                                                        value: 'B.Sc (Hons) Microbiology',
                                                    },
                                                    {
                                                        label: 'B.Sc (Hons) DMLS',
                                                        value: 'B.Sc (Hons) DMLS',
                                                    },
                                                    {
                                                        label: 'Sc (Hons) Dental Technology',
                                                        value: 'Sc (Hons) Dental Technology',
                                                    },
                                                    {
                                                        label: 'Sc (Hons) Doctor Optometry (OD)',
                                                        value: 'Sc (Hons) Doctor Optometry (OD)',
                                                    },
                                                    {
                                                        label: 'Sc (Hons) Surgery Technology',
                                                        value: 'Sc (Hons) Surgery Technology',
                                                    },
                                                ]}
                                            />
                                        </View>
                                        <Text style={globalStyles.errorText}>
                                            {props.touched.qualification &&
                                                props.errors.qualification}
                                        </Text>

                                        {/* Specialization drop down */}
                                        <View style={globalStyles.inputLabel}>
                                            <Text style={globalStyles.inputLabelText}>
                                                Change your specialization
                                            </Text>
                                        </View>

                                        <View style={globalStyles.pickerView}>
                                            <RNPickerSelect
                                                style={{ inputAndroid: { color: 'black' } }}
                                                placeholder={{
                                                    label: 'Select your Specialization',
                                                    value: '',
                                                }}
                                                onValueChange={(specialization, value) => {
                                                    setSpecialization(specialization);
                                                    props.values.specialization = specialization;
                                                }}
                                                pickerProps={{
                                                    selectedValue: specialization
                                                }}
                                                items={[
                                                    { label: 'Heart Surgeon', value: 'Heart Surgeon' },
                                                    { label: 'Cardiologists', value: 'Cardiologists' },
                                                    { label: 'Dermatologists', value: 'Dermatologists' },
                                                    {
                                                        label: 'Family Physicians',
                                                        value: 'Family Physicians',
                                                    },
                                                    {
                                                        label: 'Allergists/Immunologists',
                                                        value: 'Allergists/Immunologists',
                                                    },
                                                    { label: 'Neurologists', value: 'Neurologists' },
                                                    { label: 'Pathologists', value: 'Pathologists' },
                                                    { label: 'Pediatricians', value: 'Pediatricians' },
                                                    { label: 'Physiatrists', value: 'Physiatrists' },
                                                    { label: 'Podiatrists', value: 'Podiatrists' },
                                                    {
                                                        label: 'General Surgeons',
                                                        value: 'General Surgeons',
                                                    },
                                                    { label: 'Urologists', value: 'Urologists' },
                                                    { label: 'Gynecologist', value: 'Gynecologist' },
                                                    { label: 'Rheumatologist', value: 'Rheumatologist' },
                                                    { label: 'ENT Specialist', value: 'ENT Specialist' },
                                                    {
                                                        label: 'Fertility Specialist',
                                                        value: 'Fertility Specialist',
                                                    },
                                                    {
                                                        label: 'Gastroenterologist',
                                                        value: 'Gastroenterologist',
                                                    },
                                                    { label: 'Hepatologist', value: 'Hepatologist' },
                                                    { label: 'Nutritionist', value: 'Nutritionist' },
                                                ]}
                                            />
                                        </View>
                                        <Text style={globalStyles.errorText}>
                                            {props.touched.specialization &&
                                                props.errors.specialization}
                                        </Text>

                                        <View style={globalStyles.inputView}>
                                            <TextInput
                                                style={globalStyles.inputText}
                                                placeholder="Bank account number"
                                                placeholderTextColor="#003f5c"
                                                onChangeText={(text) => {
                                                    setAccountNo(text)
                                                    props.values.account_no = text
                                                }}
                                                value={props.values.account_no}
                                                onBlur={props.handleBlur('account_no')}
                                            />
                                        </View>
                                        <Text style={globalStyles.errorText}>
                                            {props.touched.account_no && props.errors.account_no}
                                        </Text>

                                        {/* Bank drop down */}
                                        <View style={globalStyles.inputLabel}>
                                            <Text style={globalStyles.inputLabelText}>
                                                Change bank
                                            </Text>
                                        </View>

                                        <View style={globalStyles.pickerView}>
                                            <RNPickerSelect
                                                style={{ inputAndroid: { color: 'black' } }}
                                                placeholder={{
                                                    label: 'Select your bank',
                                                    value: '',
                                                }}
                                                onValueChange={(bank, value) => {
                                                    setBank(bank);
                                                    props.values.bank = bank;
                                                }}
                                                pickerProps={{
                                                    selectedValue: bank
                                                }}
                                                items={[
                                                    { label: 'Bank Alfalah', value: 'Bank Alfalah' },
                                                    { label: 'Meezan Bank', value: 'Meezan Bank' },
                                                    { label: 'Habib Bank', value: 'Habib Bank' },
                                                    {
                                                        label: 'UBL',
                                                        value: 'UBL',
                                                    },
                                                    { label: 'Standard chartered', value: 'Standard chartered' },
                                                    { label: 'Askari Bank', value: 'Askari Bank' },
                                                    {
                                                        label: 'Bank Al-Habib',
                                                        value: 'Bank Al-Habib',
                                                    },
                                                    {
                                                        label: 'Faysal Bank',
                                                        value: 'Faysal Bank',
                                                    },
                                                ]}
                                            />
                                        </View>
                                        <Text style={globalStyles.errorText}>
                                            {props.touched.qualification &&
                                                props.errors.qualification}
                                        </Text>


                                        {/* time range picker */}
                                        <View style={globalStyles.inputLabel}>
                                            <Text style={globalStyles.inputLabelText}>
                                                Change your consultation timings
                                            </Text>
                                        </View>
                                        <Text style={{ marginTop: 20, marginBottom: 10 }}>Start time: {startTimeShow}</Text>

                                        <TouchableOpacity
                                            style={styles.Button}
                                            onPress={onPressStart}>
                                            <Text style={globalStyles.buttonTxt}> Start time </Text>
                                        </TouchableOpacity>



                                        <DateTimePickerModal
                                            isVisible={(startTime, visibilityStart)}
                                            onConfirm={(startTime) => {
                                                setStartTime(startTime)
                                                setStartTimeShow(moment(startTime).format('HH:mm'))
                                                    (props.values.startTime = startTime);
                                            }}
                                            onCancel={onPressStartCancel}
                                            mode="time"
                                            is24Hour={true} //for am and pm
                                            display="spinner"
                                        />

                                        {/* <View style={styles.inputLabel}>
                      <Text style={globalStyles.inputLabelText}>
                        Your Start Time:{' '}
                        {startTime.toLocaleString().slice(13, 24)}
                      </Text>
                    </View> */}
                                        <Text style={globalStyles.errorText}>
                                            {props.touched.startTime && props.errors.startTime}
                                        </Text>
                                        <Text style={{ marginTop: 20, marginBottom: 10 }}>End time: {endTimeShow} </Text>
                                        <TouchableOpacity
                                            style={styles.Button}
                                            onPress={onPressEnd}>
                                            <Text style={globalStyles.buttonTxt}> End Time </Text>
                                        </TouchableOpacity>

                                        <DateTimePickerModal
                                            isVisible={(endTime, visibilityEnd)}
                                            onConfirm={(endTime) => {
                                                setEndTime(endTime)
                                                setEndTimeShow(moment(endTime).format('HH:mm'))
                                                    (props.values.endTime = endTime);
                                            }}
                                            onCancel={onPressEndCancel}
                                            mode="time"
                                            is24Hour={true} //for am and pm
                                            display="spinner"
                                        // timeZoneOffsetInSeconds={3600}
                                        />
                                        <Text style={globalStyles.errorText}>
                                            {props.touched.endTime && props.errors.endTime}
                                        </Text>

                                        {/* Day multiple selects start */}
                                        <View style={globalStyles.inputLabel}>
                                            <Text style={globalStyles.inputLabelText}>
                                                Change your consultation days
                                            </Text>
                                        </View>

                                        <View style={[globalStyles.inputLabel, { marginBottom: 100 }]}>
                                            <Text style={globalStyles.inputLabelText}>
                                                Current days:
                                            </Text>
                                            {days.map(day => {
                                                return (
                                                    <Text>{day.value}</Text>
                                                )
                                            })}
                                        </View>

                                        <View style={[globalStyles.MultiSelect, { marginTop: 30 }]}>
                                            <RNMultiSelect
                                                width={'100%'}
                                                data={Day}
                                                placeholder={'Select days'}
                                                menuBarContainerHeight={370}
                                                onSelect={(days) => {
                                                    setNewDay(days);
                                                    props.values.newDays = days;
                                                }}
                                            />
                                        </View>
                                        <Text style={globalStyles.errorText}>
                                            {props.touched.days && props.errors.days}
                                        </Text>
                                        {/* Day multiple selects ends */}

                                        <TouchableOpacity
                                            style={globalStyles.Button}
                                            onPress={() => onSubmitData(props.values)}>
                                            <Text style={globalStyles.buttonTxt}>Update</Text>
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
};

const styles = StyleSheet.create({
    Button: {
        width: '50%',
        color: 'white',
        backgroundColor: '#2A2AC0',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: '2%',
        alignSelf: 'center',
    },
    inputLabel: {
        width: '90%',
        backgroundColor: '#ECF1FA',
        height: 40,
        marginBottom: '5%',
        padding: 15,
    },
});

export default doctordetails;
