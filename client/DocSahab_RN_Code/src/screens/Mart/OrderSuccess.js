import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  FlatList
} from 'react-native';
import NavigationBtn from '../../components/navigationBtn';
import { globalStyles } from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import DocSahabApi from '../../api/DocSahabApi';

// const baseURL = 'http://192.168.1.105:5000';

const OrderSuccess = ({ navigation, route }) => {
  const [userData, setUserData] = useState([]);
  const [items, setItems] = useState([]);
  const [mode, setMode] = useState('');
  const [total, setTotal] = useState("");

  useEffect(() => {
  setDetails();
}, []);


  const setDetails = async () => {
    const products = route.params.products;
    const option = route.params.option;
    const price = route.params.total;
    try {
      const response = await DocSahabApi.get('/auth/current_user');
      setUserData(response.data);
      setItems(products);
      setMode(option);
      setTotal(price);
      console.log(response.data);
    } catch (err) {
      console.log(err);
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
            title="Order Confirmed!"
          />
        </View>
      </View>

      <ScrollView style={globalStyles.scrollView}>
        <View style={{ marginLeft: '5%', marginTop: '10%' }}>
          <View
            style={{
              width: '50%',
            }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
             { "User: " + userData.firstName + " " + userData.lastName}
            </Text>
            <Text style={{ fontSize: 16, marginTop: '1%'}}>
              {new Date().toDateString()}
            </Text>
          </View>


          <View style={styles.scheduleContainer}>
            <FlatList
            horizontal
            data={items}
            renderItem={({item}) => {
              return (
                  <Text style={styles.scheduleText}>{"1 x " + item.name + ", "}</Text>
              );
            }}
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator={false}
          />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '6%',
            }}>
            <Icon name="map-marker-outline" color={'#2A2AC0'} size={25} />
            <View style={{ marginLeft: '5%', marginRight: '5%' }}>
              <Text style={{ color: 'gray' }}>{userData.address}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '5%',
            }}>
            <Icon name="information-outline" color={'#2A2AC0'} size={25} />
            <View style={{ marginLeft: '5%', marginRight: '10%' }}>
              <Text style={{ color: 'gray', marginTop: 10, alignSelf: 'center' }}>Want to cancel order? Call us (03351255378) within 15 minutes otherwise your order will not be cancelled!</Text>
            </View>
          </View>

          <View style={styles.row}></View>

          <View style = {{marginBottom: '5%'}}>
            <Text style={[styles.amountText, { fontWeight: 'bold' }]}>
              {"Total Amount: " + total}
            </Text>
          </View>

          <TouchableOpacity
            style={globalStyles.modifiedBtn}
            onPress={() => navigation.navigate('DashboardScreen')}>
            <Text style={globalStyles.buttonTxt}>Return to Dashboard</Text>
          </TouchableOpacity>

          <View style={{ height: 200 }}></View>
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
    flex: 1
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
  overlay: {
    padding: 20,
    height: 400,
  },
  overlayText: {
    fontSize: 20,
    fontWeight: "600"
  },
  overlayHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'darkblue',
    marginBottom: 30
  }
});

export default OrderSuccess;