import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  BackHandler
} from 'react-native';
import HeaderView from '../../components/headerView';
import NavigationHeaderWithBar from '../../components/navigationHeaderWithBar';
import NavigationBtn from '../../components/navigationBtn';

import { globalStyles } from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Feather';
import DocSahabApi from '../../api/DocSahabApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context as AuthContext } from '../../context/AuthContext';
import IconAD from 'react-native-vector-icons/AntDesign';
// import SearchDocScreen from '../SearchDoc';
// import MedicalRecord from './MedicalRecord';

const DashboardScreen = ({ navigation }) => {
  const { state, fetchUser, signOut } = useContext(AuthContext);

  const [data, setData] = useState([]);
  // const navigation = useNavigation();

  useEffect(() => {
    fetchUser();
    async function setUserData() {
      const userData = await AsyncStorage.getItem('userData');
      JSON.parse(userData);
      setData(JSON.parse(userData));
    }
    setUserData();

    BackHandler.addEventListener('hardwareBackPress', () => true)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => true)
    }

  }, []);
  
  function navigate() {
    navigation.navigate('login')
  }


  if (data.role == 'admin') {
    return (
      <View style={globalStyles.containerColor}>
        <Text style={{ fontSize: 25, color: 'darkblue', marginTop: 30, alignSelf: 'center' }}>Admin panel</Text>
        <View style={styles.parentBox}>
          <View style={styles.miniParent}>
            <TouchableOpacity
              style={styles.childBox}
              onPress={() =>
                navigation.navigate(
                  'MyAppointment',
                )
              }>
              <Image
                source={require('../../../assets/appointment.png')}
                style={styles.childBox}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.childBox}
              onPress={() => navigation.navigate("Orders")}>
              <Text style={styles.textStyle}>Orders</Text>
              <IconAD
                style={styles.iconsStyle}
                name="shoppingcart"
                size={80}
                color="blue" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => { signOut(navigate) }}>
            <Text style={{ fontSize: 18, color: 'darkblue' }}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={globalStyles.containerColor}>
      <NavigationHeaderWithBar title="Dashboard" />

      <ScrollView style={{ marginTop: '6%' }}>
        <View style={styles.parentBox}>
          <View style={styles.miniParent}>
            <TouchableOpacity
              style={styles.childBox}
              onPress={() =>
                navigation.navigate(
                  data.doctor == false ? 'SearchDoc' : 'MyAppointment',
                )
              }>
              <Image
                source={require('../../../assets/appointment.png')}
                style={styles.childBox}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.childBox}
              onPress={() => navigation.navigate(
                data.doctor == false ? 'MedicalRecord' : 'patientHistory'
              )}>
              <Image
                source={require('../../../assets/records.png')}
                style={styles.childBox}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.miniParent}>
            <TouchableOpacity style={styles.childBox}
              onPress={() => navigation.navigate("Mart")}>
              <Text style={styles.textStyle}>Mart</Text>
              <IconAD
                style={styles.iconsStyle}
                name="shoppingcart"
                size={80}
                color="blue" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.childBox}
              onPress={() => navigation.navigate("aboutUs")}>
              <Text style={styles.textStyle}>About us</Text>
              <IconAD
                style={styles.iconsStyle}
                name="infocirlceo"
                size={80}
                color="blue" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  parentBox: {
    backgroundColor: '#ECF1FA',
    flex: 1,
    marginBottom: '8%',
  },

  miniParent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexGrow: 1,
  },

  childBox: {
    backgroundColor: 'white',
    width: 150,
    height: 200,
    marginTop: '5%',
    borderRadius: 20,
  },
  iconsStyle: {
    padding: 20,
    paddingBottom: 0,
    alignSelf: 'center',
  },
  textStyle: {
    padding: 20,
    fontSize: 15,
    fontWeight: "900"
  },

  SearchbackgroundStyle: {
    marginTop: '5%',
    height: 50,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 22,
    flexDirection: 'row',
  },
});

export default DashboardScreen;
