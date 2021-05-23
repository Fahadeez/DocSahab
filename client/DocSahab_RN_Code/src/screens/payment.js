import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import NavigationBtn from '../components/navigationBtn';
import {globalStyles} from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import DocSahabApi from '../api/DocSahabApi'
const axios = require('axios');
const qs = require('querystring');

// const baseURL = 'http://192.168.1.105:5000';

const PaymentScreen = ({navigation, route}) => {
  const [reason, setReason] = useState('');
  const [card, setSelectedCard] = useState('');
  const docData = route.params.docData;
  const date = route.params.date;
  const time = route.params.time;

  const requestBody = {
    docId: docData._id,
    name: docData.firstName + ' ' + docData.lastName,
    specialization: docData.specialization,
    reason: reason,
    date: date.toString(),
    time: time,
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const confirmApp = async () => {
    const res = await DocSahabApi.post("/api/book-appointment",requestBody)
    if(res.status === 200){
      ToastAndroid.show("Appointment confirmed",ToastAndroid.LONG);
      navigation.navigate('root')
    }
    else{
      ToastAndroid.show("Error, Please try again",ToastAndroid.LONG);

    }
    
  };

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
            title="Payment Details"
          />
        </View>
      </View>

      <ScrollView style={globalStyles.scrollView}>
        <View style={{marginLeft: '5%', marginTop: '10%'}}>
          <View
            style={{
              flexDirection: 'row',
              width: '50%',
            }}>
            <Text style={{fontWeight: 'bold'}}>Dr.</Text>
            <Text style={{fontWeight: 'bold'}}>
              {docData.firstName.toUpperCase()} {docData.lastName.toUpperCase()}
            </Text>
            <Text
              style={{
                opacity: 0.5,
                textAlign: 'left',
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
            onPress={confirmApp}>
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
  headerNavigation: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ECF1FA',
    marginTop: '5%',
  },
});

export default PaymentScreen;
