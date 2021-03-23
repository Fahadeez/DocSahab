import React from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, Image} from 'react-native';
import HeaderView from '../components/headerView';
import NavigationHeaderWithBar from '../components/navigationHeaderWithBar';
import { globalStyles } from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/Feather';

const DashboardScreen = () => {
	return (
	<View style = {globalStyles.containerColor}>
		<NavigationHeaderWithBar/>

		<View style ={globalStyles.SearchbackgroundStyle}>
			  <Icon name='search' size={30} color="grey" style = {globalStyles.searchIcon}/>
			  <TextInput
			  placeholder= 'Search'
			  style = {globalStyles.searchBar}
			  />
	  </View>

		<View style ={styles.parentBox}>

			<View style = {styles.miniParent}>

				<TouchableOpacity style = {styles.childBox}>
				
				</TouchableOpacity>

				<TouchableOpacity style = {styles.childBox}>
				</TouchableOpacity>

			</View>


			<View style = {styles.miniParent}>
				<TouchableOpacity style = {styles.childBox}>
				</TouchableOpacity>

				<TouchableOpacity style = {styles.childBox}>
				</TouchableOpacity>

			</View>
        </View>
    
    </View>
	)
}

const styles = StyleSheet.create({
parentBox: {
 backgroundColor: '#ECF1FA',
 flex: 1,
 marginBottom: '8%'
},

miniParent: {
flexDirection: 'row',
justifyContent: 'space-around',
flexGrow: 1
},

childBox: {
 backgroundColor: 'white',
 width: '40%',
 height: '95%',
 marginTop: '5%',
 borderRadius: 20
}
});

export default DashboardScreen;