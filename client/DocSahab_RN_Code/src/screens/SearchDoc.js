import React from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView, SafeAreaView} from 'react-native';
import NavigationHeaderWithBar from '../components/navigationHeaderWithBar';
import { globalStyles } from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/Feather';


const SeachDocScreen = () => {

var objects = [
{id: 1, name: 'Shahzaib Khan', speciality: 'Cardiologist', location: 'Johar, Karachi', image:'https://i.imgflip.com/3ko73y.png'},
{id: 2, name: 'Fahad Qadri', speciality: 'Therapist', location: 'Clifton, Karachi', image:'https://i.imgflip.com/3ko73y.png'},
{id: 3, name: 'Nabeel Siddiqui', speciality: 'Psychologist', location: 'Johar, Karachi', image:'https://i.imgflip.com/3ko73y.png'}
];



	return (
	<View style = {globalStyles.containerColor}>

	<NavigationHeaderWithBar title = "Book appointment"/>


	<View style = {{marginTop: '15%'}}>
	<ScrollView>


	<View style ={globalStyles.SearchbackgroundStyle}>
			  <Icon name='search' size={30} color="grey" style = {globalStyles.searchIcon}/>
			  <TextInput
			  placeholder= 'Doctor, Specialities...'
			  style = {globalStyles.searchBar}
			  />
	  </View>

	  <View style ={globalStyles.belowSearchbackgroundStyle}>
			  <Icon name='map-pin' size={30} color="grey" style = {globalStyles.searchIcon}/>
			  <TextInput
			  placeholder= 'Select Area'
			  style = {globalStyles.searchBar}
			  />
	  </View>

	  <View style ={globalStyles.belowSearchbackgroundStyle}>
			  <Icon name='calendar' size={30} color="grey" style = {globalStyles.searchIcon}/>
			  <TextInput
			  placeholder= 'Select Date'
			  style = {globalStyles.searchBar}
			  />
	  </View>

	  <TouchableOpacity
        style={globalStyles.Button}
       >
        <Text style={globalStyles.buttonTxt}>Search</Text>
    </TouchableOpacity>

    <View style = {styles.itemContainer}>
    <Text>All Specialities</Text>
    <TouchableOpacity>
    <Icon name='sliders' size={30} color="grey"/>
    </TouchableOpacity>
    </View>

   	<View>
	  <FlatList
	  data = {objects}
	  renderItem = {({item}) => {
	    return(

	   <View style={styles.userInfoSection}>
	        <View style={{flexDirection:'row',marginTop: 15}}>
	            <Image 
	                source={{
	                    uri: 'https://i.imgflip.com/3ko73y.png'
	                }}
	                style = {{width: 80, height: 80}}
	            />
	            <View style={{marginLeft:15, flexDirection:'column', flex: 1, marginRight: '4%'}}>
	                <Text style={styles.title}>{item.name}</Text>
	                <Text style={styles.caption}>{item.speciality}</Text>
	                <Text style={styles.caption}>{item.location}</Text>
	                <TouchableOpacity>
	                <Icon name='more-vertical' size={30} color="grey" style = {{alignSelf: 'flex-end'}}/>
	                </TouchableOpacity>
	            </View>
	        </View>

	        <View style={styles.row}>
        </View>
    </View>



	    )
	  }}
	  keyExtractor = {item => item.id.toString()}
	  />
  </View>

  </ScrollView>
  <View style = {{height: '30%', width: '30%'}}>
  </View>
  </View>

</View>
	
)};


const styles = StyleSheet.create({
itemContainer: {
	flexDirection: 'row',
	justifyContent: 'space-between',
	marginHorizontal: '6%',
	marginTop: 20
},
userInfoSection: {
  paddingLeft: 20,
  backgroundColor: '#ECF1FA'
},
row: {
  marginVertical: 6,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'black',
  alignSelf:'stretch',
  marginRight: '4%',
  height: 1
},
title: {
  fontSize: 16,
  marginTop: 3,
  fontWeight: 'bold',
  color: '#2A2AC0'
},
caption: {
  fontSize: 14,
  lineHeight: 14,
  color: '#181461',
  marginTop: 3
}

});

export default SeachDocScreen;