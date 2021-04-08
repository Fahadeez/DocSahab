import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableWithoutFeedback, Animated, TouchableOpacity, ScrollView } from 'react-native';
import NavigationBtn from '../../components/navigationBtn';
import Signin from '../Auth/login';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '../../styles/globalStyles';

class AppointmentConfirm extends Component {

    render() {

        return (
            // root container
            <View style={{
                flex: 1,
                backgroundColor: '#ECF1FA',
            }}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {/* sub root container */}
                    <View style={ styles.containerForAppointmentConfirm }>

                        <NavigationBtn screenName={Signin} styling={ styles.headerNavigation }/>

                        {/* confirmation message */}
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Icon
                                name={"check-circle"}
                                size={36} 
                                color="green"
                            />

                            <View style={{
                                marginTop: '1.3%',
                                marginStart: '2%'
                            }}>
                                <Text style={ styles.headerTxt }>
                                    Appointment Confirmed!
                                </Text>
                            </View>
                        </View>

                        {/* confirmation timing */}
                        <View style={{
                            flexDirection: 'row',
                            borderRadius: 10,
                            backgroundColor: 'white',
                            height: 65,
                            width: 250,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '8%'
                        }}>
                            <Text style={{
                                fontSize: 20
                            }}>Thu, 09 Apr </Text>

                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'green'
                            }}>
                                08:00 pm
                            </Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            marginBottom: '5%'
                        }}>
                            <View style={{
                                flexDirection: 'column',
                                marginRight: '5%',
                                marginTop: '8%'
                            }}>
                                <Icon
                                    name={"map-marker"}
                                    size={30} 
                                    color="#2A2AC0"
                                />
                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                <View style={{
                                    flexDirection: 'row',
                                    marginBottom: '7%'
                                }}>
                                    <Text>Dr. Clara Odding </Text>
                                    <Text style={{ color: "grey", }}>- Dentist</Text>
                                </View>
                                <View>
                                    <Text style={{ color: 'grey' }}>Karachi, Pakistan</Text>
                                </View>
                            </View>

                        </View>

                        <View
                            style={{
                                borderBottomColor: 'grey',
                                borderBottomWidth: 3,
                                opacity: 0.1,
                                marginBottom: '15%',
                            }}
                        />

                        <View style={{
                            alignContent: 'center',
                            alignItems: 'center',
                            marginBottom: '10%'
                        }}>
                        <Icon
                            name={"check-square"}
                            size={230} 
                            color="green"
                        />
                        </View>

                        <View style={{ marginBottom: '2%' }}>
                            <TouchableOpacity style={styles.AddToCalender}>
                                <Text style={globalStyles.buttonTxt}>
                                    Add to calender
                                </Text>
                            </TouchableOpacity>
                        </View>
                    
                    </View>

                </ScrollView>

            </View> 
        );
    }
}

const styles = StyleSheet.create({
    containerForAppointmentConfirm: {
        flex: 1,
        backgroundColor: '#ECF1FA',
        padding: 23,
    },
    headerNavigation: {
        marginTop: '5%',
        marginBottom: 30,
        width: '100%',
        height: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headerTxt: {
        fontSize: 14,
        fontWeight: '100',
        color: 'black',
        marginBottom: 25,
    },
    AddToCalender: {
        width:"100%",
        color: 'white',
        backgroundColor: '#2A2AC0',
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
    },
});

export default AppointmentConfirm;