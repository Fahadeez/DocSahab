import React from 'react';
import { CheckBox, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterDetails = ({loginBtnText, screen}) => {
  const [isSelected, setSelection] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={globalStyles.inputView} >
        <TextInput  
          style={globalStyles.inputText}
          placeholder="First Name"
          placeholderTextColor="#003f5c"
          />
      </View>

      <View style={globalStyles.inputView} >
        <TextInput
          style={globalStyles.inputText}
          placeholder="Contact"
          placeholderTextColor="#003f5c"
          />
      </View>

      <View style={globalStyles.inputView} >
        <TextInput
          style={globalStyles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          />
      </View>

      <View style={globalStyles.inputView} >
        <TextInput
          style={globalStyles.inputText}
          numberOfLines={4}
          multiline = {true}
          placeholder="Address"
          placeholderTextColor="#003f5c"
          />
      </View>

      <View style={globalStyles.inputView} >
        <TextInput
          style={globalStyles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          />
      </View>

      <View style={globalStyles.inputView} >
        <TextInput
          style={globalStyles.inputText}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
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