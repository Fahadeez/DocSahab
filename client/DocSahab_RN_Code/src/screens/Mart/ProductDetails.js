import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ToastAndroid } from 'react-native';
import { Button } from 'react-native-elements';
import NavigationBtn from '../../components/navigationBtn';
import { Context as DashboardContext } from '../../context/dashboardContext';

class ProductDetails extends Component {
  static contextType = DashboardContext;

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    addToCart = (item) => {
        const { state, addToCart } = this.context;
        addToCart(item);
        ToastAndroid.show("Item added to cart",ToastAndroid.SHORT);
    }

    render() {
        const { name, ratings, sales, description, price } = this.props.route.params.item;
        return (
            <View style={{ flex: 1, marginBottom: 40}}>
                <NavigationBtn
                    screenName={'SearchDoc'}
                    styling={styles.headerNavigation}
                    title="Product details"
                />
                <ScrollView style = {{flex: 1}}>


                    <View style={styles.imageContainer}>
                        <Image source={require('../../../assets/image.jpg')} style={{ width: '100%', height: '100%' }} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{name}</Text>
                        <Text style={styles.text}>Total sales: {sales}</Text>
                        <Text style={styles.text}>No of ratings: {ratings}</Text>
                        <Text style={styles.text}>Price: {price}</Text>
                        <Text style={styles.text}>Description: {description}</Text>
                    </View>
                    <View>
                        <Button onPress={() => this.addToCart(this.props.route.params.item)} title="Add to cart" containerStyle={{ backgroundColor: 'darkblue', width: 200, alignSelf: 'center' }} />
                    </View>
                </ScrollView>

            </View>
        );
    }
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
        alignSelf: 'center',
        width: '100%',
        height: 500
    },
    textContainer: {
        margin: 20
    },
    text: {
        fontSize: 15,
        marginBottom: 10
    },
    headerNavigation: {
        marginTop: 0,
        marginLeft: 20
    },

});

export default ProductDetails;
