import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import Doctordetails from '../screens/Auth/DoctorDetails';

const ProceedToDocDetBtn = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate(Doctordetails)}
            style={globalStyles.Button}>
            <Text style={globalStyles.buttonTxt}>Proceed To Doctor Details</Text>
        </TouchableOpacity>
    );
};

export default ProceedToDocDetBtn;