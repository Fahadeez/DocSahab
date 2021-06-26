import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import { Context as DashboardContext } from '../../context/dashboardContext';
import { Rating, CheckBox } from 'react-native-elements';
import NavigationBtn from '../../components/navigationBtn';
import DocSahabApi from '../../api/DocSahabApi';

class Checkout extends Component {
    static contextType = DashboardContext;

    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            cashOnDelivery: false,
            creditCard: false,
            easyPaisa: false,
            subTotal: ''
        };
    }
    componentDidMount() {
        const { state } = this.context;
        var total = 0;
        if (state.cart) {
            state.cart.forEach((item) => {
                total += Number(item.price)
            })
            this.setState({ cartItems: state.cart, subTotal: total })
        }

    }
    onPayPress = async () => {
        const { state, emptyCart } = this.context;

        const option = this.state.cashOnDelivery ? "Cash on delivery" : this.state.creditCard ? "Credit Card" : this.state.easyPaisa ? "Easy paisa" : "null";
        const products = this.state.cartItems.map((item) => {
            return {
                name: item.name,
                price: item.price
            }
        })
        try {
            const res = await DocSahabApi.post("/api/order-details", {
                subTotal: this.state.subTotal,
                paymentMethod: option,
                products
            })
            if (res.status === 200) {
                ToastAndroid.show("Order has been placed successfully", ToastAndroid.LONG)
                emptyCart()
                this.props.navigation.navigate('DashboardScreen')
            }
        }
        catch (e) {
            console.log(e)
        }

    }
    renderItem(item) {
        console.log("item", item)
        return (
            <View style={styles.parentView} key={item.index}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../../assets/image.jpg')} style={{ height: 100, width: 100 }} />
                </View>
                <View style={styles.contentView}>
                    <Text style={[styles.text, { fontSize: 13, marginTop: 30 }]}>{item.item.name}</Text>
                    <Text style={[styles.text, { fontSize: 13 }]}>{item.item.price}</Text>
                </View>
                <View style={styles.ratingView}>
                    <Rating imageSize={24} showRating ratingCount={5} startingValue={item.item.ratings} readonly />
                    <Text style={[styles.text, { marginTop: 10 }]}>No of sales {item.item.sales}</Text>
                </View>
            </View>
        )
    }

    render() {
        if (this.state.cartItems && this.state.cartItems.length > 0) {
            return (
                <View style={styles.container}>
                    <NavigationBtn
                        screenName={'DashboardScreen'}
                        styling={styles.headerNavigation}
                        title="Checkout"
                    />
                    <View style={{ marginBottom: 10, flex: 1 }}>
                        <ScrollView
                            showsVerticalScrollIndicator={true}
                            showsHorizontalScrollIndicator={false}
                        >

                            <View
                                style={{
                                    flex: 1,
                                }}>
                                <FlatList
                                    data={this.state.cartItems}
                                    renderItem={(item) => this.renderItem(item)}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                            <View style={{ marginTop: 20, flex: 1 }}>
                                <Text style={{ fontSize: 20, color: 'darkblue', marginBottom: 10 }}>Payment methods</Text>

                                <CheckBox
                                    title='Cash on delivery'
                                    checked={this.state.cashOnDelivery}
                                    onPress={() => this.setState({ cashOnDelivery: !this.state.cashOnDelivery })}
                                />

                                <CheckBox
                                    title='Credit card'
                                    checked={this.state.creditCard}
                                    onPress={() => this.setState({ creditCard: !this.state.creditCard })}
                                />

                                <CheckBox
                                    title='Easy paisa'
                                    checked={this.state.easyPaisa}
                                    onPress={() => this.setState({ easyPaisa: !this.state.easyPaisa })}
                                />
                            </View>
                            <View style={{ marginTop: 30 }}>
                                <Text style={{ fontSize: 20, marginBottom: 20, marginLeft: 15 }}>Sub total: {this.state.subTotal}</Text>
                                <TouchableOpacity onPress={this.onPayPress} style={styles.payButton}>
                                    <Text style={styles.buttonText}>Pay</Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </View>

                </View>
            );
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <NavigationBtn
                        screenName={'DashboardScreen'}
                        styling={styles.headerNavigation}
                        title="Checkout"
                    />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={{ fontSize: 20 }}>Your cart is empty</Text>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        backgroundColor: 'white',
        padding: 20,
        flex: 1
    },
    parentView: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5e5",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageContainer: {
        width: 100,
        height: 100,
    },
    ratingView: {
        marginRight: 10
    },
    contentView: {
        marginRight: 10
    },
    textContainer: {
        margin: 20
    },
    text: {
        fontSize: 13,
        marginBottom: 10
    },
    headerNavigation: {
        marginTop: 0,
        marginLeft: 20
    },
    payButton: {
        backgroundColor: 'blue',
        borderRadius: 10,
        width: 150,
        height: 40,
        alignSelf: 'center',
        padding: 4
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    }

});

export default Checkout;
