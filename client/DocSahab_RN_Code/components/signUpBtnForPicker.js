import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const SignUpBtnForPicker = (props) => {
    return (
            <TouchableOpacity 
                style={globalStyles.Button}
                onPress={props.handleSubmit}
                >
                <Text style={globalStyles.buttonTxt}>Sign Up</Text>
            </TouchableOpacity>
    );
};

export default SignUpBtnForPicker;