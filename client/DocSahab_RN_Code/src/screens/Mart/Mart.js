import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity, TouchableHighlight, Image, ScrollView} from 'react-native';
import HeaderWithCart from '../../components/headerWithCart';
import {globalStyles} from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Feather';

const MartScreen = ({ navigation }) => {

	var [ isPress, setIsPress ] = React.useState(false);

	var touchProps = {
	    activeOpacity: 1,
	    underlayColor: 'limegreen',                               
	    style: isPress ? styles.btnPress : styles.btnNormal, 
	    onHideUnderlay: () => setIsPress(false),
	    onShowUnderlay: () => setIsPress(true),
	    onPress: () => console.log()
	};


	const [search, setSearch] = useState('');

	const sections = [{id: 1, type:'All Products'}, {id: 2, type:'Masks'}, {id: 3, type:'Bands'}, {id: 4, type:'Machines'}, {id: 5, type:'Tools'}];

	const products = [

	{id: 1, name: 'Posture Cushion', sales: '1198', ratings: 2, description: "Buy Pure Posture Seat Cushion at pocket friendly price, you can also use this comfortable cushion in your cars and home or office chair to avoid lower back pain.", price: "1900", url: "https://www.frakinstore.com/images/product_gallery/1577449092_Pure-Posture-3.jpg"},
	{id: 2, name: 'Thermometer', sales: '1000', ratings: 4, description: "IR thermometers allow users to measure body temperature quickly and noninvasively. Product description. IR thermometers consist of an IR probe, electronic circuitry, a microprocessor, and an LCD or LED display. There are two types of IR thermometry: ear and skin.", price: "700" ,url: "https://images-na.ssl-images-amazon.com/images/I/61eT2Cpr6lL._SL1500_.jpg"},
	{id: 3, name: 'NAUCARTURE Thigh Pad', sales: '950', ratings: 5, description: "This is a Vegetarian product. About this item. Material: Neoprene ,size : 5 Inch .1 pc of thigh support is a versatile leg brace ...", price: "550", url: "https://m.media-amazon.com/images/I/61tcSMFNfRL._AC_SS450_.jpg"},
	{id: 4, name: 'Omron Blood Pressure Machine', sales: '600', ratings: 1, description: " MANUAL BLOOD PRESSURE MONITORS. Manual devices include a cuff that wraps around your arm, a rubber squeeze bulb, and a gauge that ...", price: "2500", url: "https://images-na.ssl-images-amazon.com/images/I/51AxCDQAiFS._SS400_.jpg"}

	];

	return (
		<View style = {globalStyles.containerColor}>

			<HeaderWithCart title = "Store"/>
			<View style = {globalStyles.container}>
				<ScrollView style = {{flex: 1}}>
					
				<View style ={globalStyles.belowSearchbackgroundStyle}>
				  <Icon name='search' size={30} color="#2A2AC0" style = {globalStyles.searchIcon}/>
				  <TextInput
				  placeholder= 'Search'
			      onChangeText = {text => setSearch(text)}
			      value = {search}
				  style = {globalStyles.searchBar}
				  />
				</View>


				<View style= {{marginTop: '10%'}}>
					<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					  data = {sections}
					  renderItem = {({item}) => {
					    return(

					        <View style = {styles.menu}>
				                    <TouchableHighlight {...touchProps} >
				                    	<Text style = {{marginTop: '7%', alignSelf: 'center', color: 'darkblue', fontSize: 15}}>{item.type}</Text>
				                    </TouchableHighlight>
					        </View>

					    )
					  }}
					keyExtractor = {item => item.id.toString()}

				/>
				</View>


					<View>
					<Text style = {styles.sectionText}>Popular Products</Text>
					<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					  data = {products}
					  renderItem = {({item}) => {
					    return(

					    	<View>
					    		<View style = {styles.productView}>
					        	<TouchableOpacity onPress={() => navigation.navigate("productDetails",{
									item
								})}>
					        		<View style = {styles.imageContainer}>
					        			<Image source={{uri: item.url}} style= {{height: '100%', width: '100%'}} />
					        		</View>
				                    <Text numberOfLines={1} style= {{alignSelf: 'center', paddingBottom: 5}}>{item.name}</Text>
				                    <Text style= {{alignSelf: 'center', fontSize: 11, paddingBottom: 20}}>{item.price}</Text>
					        	</TouchableOpacity>
					        </View>
					    		<View style = {styles.row}></View>
					    	</View>
					   
					    	
					    )
					  }}
					keyExtractor = {item => item.id.toString()}

				/>
				</View>

				<View>
					<Text style = {styles.sectionText}>Best Rated</Text>
					<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					  data = {products}
					  renderItem = {({item}) => {
					    return(

					        <View>
					    		<View style = {styles.productView}>
					        	<TouchableOpacity>
					        		<View style = {styles.imageContainer}>
					        			<Image source={{uri: item.url}} style= {{height: '100%', width: '100%'}} />
					        		</View>
				                    <Text numberOfLines={1} style= {{alignSelf: 'center', paddingBottom: 5}}>{item.name}</Text>
				                    <Text style= {{alignSelf: 'center', fontSize: 11, paddingBottom: 20}}>{item.price}</Text>
					        	</TouchableOpacity>
					        </View>
					    		<View style = {styles.row}></View>
					    	</View>
					    )
					  }}
					keyExtractor = {item => item.id.toString()}

				/>
				</View>


				<View>
					<Text style = {styles.sectionText}>Limited Offers</Text>
					<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					  data = {products}
					  renderItem = {({item}) => {
					    return(

					        <View>
					    		<View style = {styles.productView}>
					        	<TouchableOpacity>
					        		<View style = {styles.imageContainer}>
					        			<Image source={{uri: item.url}} style= {{height: '100%', width: '100%'}} />
					        		</View>
				                    <Text numberOfLines={1} style= {{alignSelf: 'center', paddingBottom: 5}}>{item.name}</Text>
				                    <Text style= {{alignSelf: 'center', fontSize: 11, paddingBottom: 20}}>{item.price}</Text>
					        	</TouchableOpacity>
					        </View>
					    		<View style = {styles.row}></View>
					    	</View>
					    )
					  }}
					keyExtractor = {item => item.id.toString()}

				/>
				</View>


				</ScrollView>
			</View>
	</View>



		)
}

const styles = StyleSheet.create({

sectionText: {
	color: 'darkblue',
	fontSize: 16,
	marginLeft: '6%',
	marginVertical: '7%',
	fontWeight: 'bold'
},

menu: {
	marginRight: 5,
	marginLeft: 20,
	justifyContent: 'center',
	alignItems: 'center',
	alignSelf: 'flex-start',
	flex: 1,
	marginBottom: 10
},

imageContainer: {

	margin: 20,
	alignSelf: 'flex-start',
	height: 100,
	width: 100,
	shadowColor: "#000",
	shadowOffset: {
		width: 0,
		height: 4,
	},
	shadowOpacity: 0.32,
	shadowRadius: 5.46,

	elevation: 9,
	backgroundColor : 'lightblue'
},

productView: {
	marginRight: 20,
	marginLeft: 20,
	justifyContent: 'center',
	alignItems: 'center',
	alignSelf: 'flex-start',
	flex: 1,
	backgroundColor: 'white',
	borderRadius: 30,
	padding: '5%',
	width: 150
},

btnNormal: {
    height: 40,
    width: 100,
  },
  btnPress: {
    height: 40,
    width: 100,
    borderRadius: 50,
  },
  row: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 15
    }
});

export default MartScreen;