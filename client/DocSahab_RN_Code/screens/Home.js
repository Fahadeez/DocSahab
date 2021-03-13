import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';


const Home = ({navigation}) => {
  return <View style = {styles.container}>
  <View style = {styles.header}>
  <Image source={require('../assets/docsahab.png')} style = {{height: 250, width: 250}} />
  </View>
  <View style = {{flexDirection: 'row'}}>
  <TouchableOpacity onPress = {() => navigation.navigate('UserRegister')}>
     <Text style={styles.text}>Patient</Text>
     <Image source={require('../assets/patient.png')} style = {{height: 160, width: 150}} />
  </TouchableOpacity>

  <TouchableOpacity onPress = {() => navigation.navigate('DoctorRegister')}>
     <Text style={styles.text}>Doctor</Text>
     <Image source={require('../assets/doctor.png')} style = {{height: 200, width: 200}} />
  </TouchableOpacity>
  </View>

  </View>
};

const styles = StyleSheet.create({
header: {
	marginBottom: '15%',
	backgroundColor: '#2A2AC0',
	alignSelf: 'stretch',
	alignItems: 'center',
	borderBottomLeftRadius: 200,
	borderBottomRightRadius: 200 
},
logo:{
	fontWeight:"bold",
	fontSize:50,
	color:"#2A2AC0",
	marginBottom:40,
	alignSelf: 'center',
	justifyContent: 'space-around',
	bottom: '5%'
},

text:{
    fontWeight:"bold",
    fontSize:20,
    color:"#2A2AC0",
    alignSelf: 'center',
    marginTop: 20
  },
container: {
    backgroundColor: '#ECF1FA',
    alignItems: 'center',
    justifyContent: 'center'
  }
});


export default Home;
