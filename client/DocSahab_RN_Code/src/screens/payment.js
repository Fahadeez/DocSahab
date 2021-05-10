import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import NavigationBtn from '../components/navigationBtn';
import {globalStyles} from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
const axios = require('axios')
const qs = require('querystring')

const PaymentScreen = ({navigation, route}) => {
  const [reason, setReason] = useState('');
  const [card, setSelectedCard] = useState('');
  const docData = route.params.docData;
  const date = route.params.date;
  const time = route.params.time;

const requestBody = {
  docId: docData._id,
  reason: reason,
  date: date.toString(),
  time: time,
}

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const confirmApp = () => {
  return async () => {
    try {
      const response = await axios.post('http://192.168.0.106:5000/api/book-appointment', qs.stringify(requestBody), config);
      console.log(response);
    } catch (err) {}
  };
};


  return (
    <View styles={globalStyles.containerColor}>
      <NavigationBtn styling={globalStyles.headerNavigation} />

      <ScrollView style={globalStyles.scrollView}>
        <View style={{marginTop: '15%', marginLeft: '5%'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>Dr.</Text>
            <Text style={{fontWeight: 'bold'}}>
              {docData.firstName.toUpperCase()} {docData.lastName.toUpperCase()}
            </Text>
            <Text
              style={{
                opacity: 0.5,
              }}>
              {' '}
              ( Appointment Confirmation-In Process )
            </Text>
          </View>

          <View style={styles.scheduleContainer}>
            <Text style={styles.scheduleText}>
              {moment(date).format('dddd')}, {time}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '6%',
            }}>
            <Icon name="map-marker-outline" color={'#2A2AC0'} size={25} />
            <View style={{marginLeft: '5%'}}>
              <Text style={{color: 'gray'}}>B-102 Awesome Apartment</Text>
              <Text style={{color: 'gray'}}>Guslitan-e-Jauhar, Karachi</Text>
            </View>
          </View>

          <View style={styles.row}></View>
          {/* 

		<View style={globalStyles.inputView} >
                           
            <TextInput
                style={globalStyles.inputText}
                placeholder="Message"
                placeholderTextColor="#003f5c"
                autoCapitalize="none"
                autoCorrect={false}
            />
		</View> */}

          <View style={globalStyles.inputView}>
            <TextInput
              style={globalStyles.inputText}
              placeholder="Reason of the visit"
              placeholderTextColor="#003f5c"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setReason(text)}
              value={reason}
            />
          </View>

          <View>
            <Text style={[styles.amountText, {fontWeight: 'bold'}]}>
              Total Amount:
            </Text>
            <Text style={styles.amountText}>Rs: 1000</Text>
          </View>

          <View style={{marginVertical: '10%'}}>
            <Text
              style={{
                color: 'darkblue',
                marginBottom: '2%',
                fontWeight: 'bold',
              }}>
              Select the Card
            </Text>
            <View style={globalStyles.belowpickerView}>
              <RNPickerSelect
                style={{inputAndroid: {color: 'black'}}}
                placeholder={{label: 'Select Card', value: ''}}
                onValueChange={(card, value) => {
                  setSelectedCard(value);
                }}
                selectedValue={card}
                items={[
                  {label: 'Card1', value: 'Card1'},
                  {label: 'Card2', value: 'Card2'},
                ]}
              />
            </View>
          </View>
          <TouchableOpacity
            style={globalStyles.modifiedBtn}
            onPress={confirmApp()}>
            <Text style={globalStyles.buttonTxt}>Pay Now</Text>
          </TouchableOpacity>

          <View style={{height: 200}}></View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scheduleContainer: {
    marginTop: '10%',
    padding: '5%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  scheduleText: {
    fontSize: 22,
    color: 'limegreen',
    fontWeight: 'bold',
  },
  row: {
    marginVertical: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    alignSelf: 'stretch',
    marginRight: '4%',
    height: 1,
  },
  amountText: {
    fontSize: 22,
    color: 'darkblue',
  },
});

export default PaymentScreen;
