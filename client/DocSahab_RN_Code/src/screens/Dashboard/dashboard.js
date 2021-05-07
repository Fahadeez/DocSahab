import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import HeaderView from '../../components/headerView';
import NavigationHeaderWithBar from '../../components/navigationHeaderWithBar';
import {globalStyles} from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Feather';
import DocSahabApi from '../../api/DocSahabApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import SearchDocScreen from '../SearchDoc';
// import MedicalRecord from './MedicalRecord';

const DashboardScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  // const navigation = useNavigation();
	useEffect(() => {
		/* function navigate() {
			navigation.navigate('Meeting')
		}
		navigate()*/

    async function setUserData() {
        const userData = await AsyncStorage.getItem('userData');
        JSON.parse(userData)
        setData(JSON.parse(userData));
    }

    setUserData();

	}, []);

  return (
    <View style={globalStyles.containerColor}>
      <NavigationHeaderWithBar title="Dashboard" />

      <View style={globalStyles.SearchbackgroundStyle}>
        <Icon
          name="search"
          size={30}
          color="grey"
          style={globalStyles.searchIcon}
        />
        <TextInput placeholder="Search" style={globalStyles.searchBar} />
      </View>

      <ScrollView style={{marginTop: '6%'}}>
        <View style={styles.parentBox}>
          <View style={styles.miniParent}>
            <TouchableOpacity
              style={styles.childBox}
              onPress={() => navigation.navigate(data.doctor == false? 'SearchDoc' : 'MyAppointment')}>
              <Image
                source={require('../../../assets/appointment.png')}
                style={styles.childBox}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.childBox}
              onPress={() => navigation.navigate('MedicalRecord')}>
              <Image
                source={require('../../../assets/records.png')}
                style={styles.childBox}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.miniParent}>
            <TouchableOpacity style={styles.childBox}>
              <Image
                source={require('../../../assets/settings.png')}
                style={styles.childBox}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.childBox}>
              <Image
                source={require('../../../assets/forum.png')}
                style={styles.childBox}
              />
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
});

export default DashboardScreen;
