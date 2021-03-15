import React, {useState} from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import NavigationHeaderWithBtn from '../../components/navigationHeaderWithBtn';
import Signin from './login';
import HeaderView from '../../components/headerView';

const forgetpassword = () => { 
    return (
        <View style={globalStyles.containerColor}>

            <NavigationHeaderWithBtn screenName={Signin}/>

            <View style={{marginTop: '15%'}}>
                <HeaderView titletxt='Reset Password'/>
            </View>

            <View style={{marginTop: 50}}>
                <View style={globalStyles.subContainer}>

                    <View style={globalStyles.inputLabel}>
                        <Text style={globalStyles.inputLabelText}>
                            Enter your email address
                        </Text>
                    </View>

                    <View style={globalStyles.inputView}>
                        <TextInput  
                            style={globalStyles.inputText}
                            placeholder="nabeelsiddiqui86@gmail.com"
                            placeholderTextColor="#003f5c"
                        />
                    </View>

                    <TouchableOpacity style={globalStyles.Button}>
                        <Text style={globalStyles.buttonTxt}>Reset</Text>
                    </TouchableOpacity>

            </View>
            </View>


        </View>
    );
}

export default forgetpassword;