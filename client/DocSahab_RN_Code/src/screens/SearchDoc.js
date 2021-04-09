import React,{useState} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView, SafeAreaView} from 'react-native';
import NavigationBtn from '../components/navigationBtn';
import { globalStyles } from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/Feather';
import RNPickerSelect from "react-native-picker-select";


const SeachDocScreen = () => {

const [gender, setSelectedGender] = useState();
const [qualification, setQualification] = useState();

var objects = [
{id: 1, name: 'Shahzaib Khan', speciality: 'Cardiologist', location: 'Johar, Karachi', image:'https://i.imgflip.com/3ko73y.png'},
{id: 2, name: 'Fahad Qadri', speciality: 'Therapist', location: 'Clifton, Karachi', image:'https://i.imgflip.com/3ko73y.png'},
{id: 3, name: 'Nabeel Siddiqui', speciality: 'Psychologist', location: 'Johar, Karachi', image:'https://i.imgflip.com/3ko73y.png'}
];



	return (
	<View style = {globalStyles.containerColor}>

	<NavigationBtn screenName = "dashboard" title = "Book an appointment"/>


	<View style = {{marginTop: '15%'}}>
	<ScrollView>

	<View style = {globalStyles.container}>
	<View style ={globalStyles.SearchbackgroundStyle}>
			  <Icon name='search' size={30} color="#2A2AC0" style = {globalStyles.searchIcon}/>
			  <TextInput
			  placeholder= 'Doctor, Specialities...'
			  style = {globalStyles.searchBar}
			  />
	  </View>

	  <View style={globalStyles.belowpickerView}>

        <RNPickerSelect
            style={{ inputAndroid: { color: 'black' } }}
            placeholder={{ label: "Select Gender", value: '' }}
            onValueChange={(gender, value) => {
                setSelectedGender(value)
            }
            }

            selectedValue={gender}
            items={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
            ]}
        />
    </View>

    <View style={globalStyles.belowpickerView}>
        <RNPickerSelect
            style={{ inputAndroid: { color: 'black' } }}
            placeholder={{ label: "Select Qualification", value: '' }}
            onValueChange={(qualification, value) => {
                setQualification(value)
            } 
        }

            selectedValue={qualification}

            items={[
                { label: "MBBS", value: "MBBS" },
                { label:"Pharm.D", value:"Pharm.D" },
                { label:"B.Sc (Hons) MMG", value:"B.Sc (Hons) MMG" },
                { label:"B.Sc (Hons) Biotechnology", value:"B.Sc (Hons) Biotechnology" },
                { label:"DPT", value:"DPT" },
                { label:"DVM", value:"DVM" },
                { label:"B.Sc (Hons) Microbiology", value:"B.Sc (Hons) Microbiology" },
                { label:"B.Sc (Hons) DMLS", value:"B.Sc (Hons) DMLS" },
                { label:"Sc (Hons) Dental Technology", value:"Sc (Hons) Dental Technology" },
                { label:"Sc (Hons) Doctor Optometry (OD)", value:"Sc (Hons) Doctor Optometry (OD)" },
                { label:"Sc (Hons) Surgery Technology", value:"Sc (Hons) Surgery Technology" },
            ]}
        />
    </View>

	  <TouchableOpacity
        style={globalStyles.searchButton}
       >
        <Text style={globalStyles.buttonTxt}>Search</Text>
    </TouchableOpacity>
    </View>

    <View style = {styles.itemContainer}>
    <Text>All Specialities</Text>
    <TouchableOpacity>
    <Icon name='sliders' size={30} color="darkblue"/>
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
	                style = {{width: 80, height: 80, borderRadius: 15}}
	            />
	            <View style={{marginLeft:15, flexDirection:'column', flex: 1, marginRight: '4%'}}>
	                <Text style={styles.title}>{item.name}</Text>
	                <Text style={styles.caption}>{item.speciality}</Text>
	                <Text style={styles.caption}>{item.location}</Text>
	                <TouchableOpacity>
	                <Icon name='more-vertical' size={25} color="grey" style = {{alignSelf: 'flex-end'}}/>
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
  backgroundColor: 'lightgray',
  alignSelf:'stretch',
  marginRight: '4%',
  height: 1
},
title: {
  fontSize: 16,
  marginTop: 3,
  color: '#2A2AC0'
},
caption: {
  fontSize: 14,
  lineHeight: 14,
  color: 'gray',
  marginTop: 3
}

});

export default SeachDocScreen;