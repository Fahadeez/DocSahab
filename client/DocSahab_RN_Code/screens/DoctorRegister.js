import React from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';
import RegisterDetails from '../components/regDetails';

const DocRegisterScreen = () => {
  return <>
  <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Specialities"
          placeholderTextColor="#003f5c"/>
  </View>
  <RegisterDetails loginBtnText = "Proceed to PMC verification" screen = "DoctorLogin"/>
  </>
}

const styles = StyleSheet.create({
inputView:{
    width:"80%",
    backgroundColor:"white",
    borderRadius:15,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    alignSelf: 'center',
    top: 60,
    zIndex: 500
  },
  inputText:{
    height:50,
    color:"black"
  }
});

export default DocRegisterScreen;