import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterDetails = ({loginBtnText,screen}) => {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="First and Last Name..."
            placeholderTextColor="#003f5c"
            />
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="City"
            placeholderTextColor="#003f5c"
            />
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="CNIC No."
            placeholderTextColor="#003f5c"
            />
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Phone No."
            placeholderTextColor="#003f5c"
            />
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Age"
            placeholderTextColor="#003f5c"
            />
        </View>

        <View style={styles.inputView} >
          <TextInput
            numberOfLines={4}
            style={styles.inputText}
            placeholder="Enter your complete Address"
            placeholderTextColor="#003f5c"
            multiline = {true}
            />
        </View>



        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>{loginBtnText}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(screen)}>
          <Text style={{color: "#2A2AC0"}}>Already have an account? Login instead.</Text>
        </TouchableOpacity>


      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF1FA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputView:{
    width:"80%",
    backgroundColor:"white",
    borderRadius:15,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black"
  },
  forgot:{
    color:"#2A2AC0",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#2A2AC0",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    marginBottom:10
  },
  loginText:{
    color:"white",
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default RegisterDetails;