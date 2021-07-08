import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import NavigationBtn from '../../components/navigationBtn';
import { globalStyles } from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DocSahabApi from '../../api/DocSahabApi';

const UpdateAddress = ({navigation}) => {
const [userData, setUserData] = useState([]);
const [address, setAddress] = useState("");

useEffect(() => {
  setDetails();
  navigation.addListener('focus', () => setDetails());
}, []);


  const setDetails = async () => {
    try {
      const response = await DocSahabApi.get('/auth/current_user');
      setUserData(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const changeAddress = async () => {
    try {
      const res = await DocSahabApi.post("/api/change-address", { _id: userData._id, address, doctor: userData.doctor})
      if (res.status === 200) {
      ToastAndroid.show("Address Updated!.", ToastAndroid.SHORT);	
      }
    }
    catch (e) {
      console.log(e)
    }
  }

return (
    <View styles={globalStyles.containerColor}>
      <View
        style={{
          backgroundColor: '#ECF1FA',
        }}>
        <View
          style={{
            marginLeft: '5%',
          }}>
          <NavigationBtn
            styling={styles.headerNavigation}
            title="Update Address"
          />
        </View>
      </View>
      <View style = {{margin: 50}}>
      	<Text style= {{marginBottom: 10}}>{"Current Address: " + userData.address}</Text>
      <TextInput style = {styles.input}
		 underlineColorAndroid = "transparent"
		 placeholder = "New Address"
		 placeholderTextColor = "#9a73ef"
		 autoCapitalize = "none"
		 onChangeText = {(value) => {
		  setAddress(value);
		}}/>

		<TouchableOpacity onPress = {() => changeAddress()}>
		<View style = {styles.submitButton}>
		<Text style = {{color: 'white'}}>Update Address</Text>
		</View>
		</TouchableOpacity>
      </View>
      
    </View>
    )
}

const styles = StyleSheet.create({
 input: {
      marginVertical: 10,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      marginHorizontal: 10,
      marginBottom: 5,
      height: 40,
      alignSelf: 'center'
   },
   submitButtonText:{
      color: 'white'
   }
});

export default UpdateAddress;