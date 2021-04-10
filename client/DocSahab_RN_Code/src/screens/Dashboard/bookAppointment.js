import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Animated, TouchableOpacity, ScrollView } from 'react-native';
import NavigationBtn from '../../components/navigationBtn';
import { globalStyles } from '../../styles/globalStyles';
import Signin from '../Auth/login';
import Icon from 'react-native-vector-icons/FontAwesome';
import 'react-native-gesture-handler';
import Flag from 'react-native-flags';

const numStars = 5

class BookAppoinment extends Component {
    state = {
        rating: 2
    }
    render() {
        let stars = [];
        for(let x = 1; x <= numStars; x++) {
            stars.push(
                <TouchableWithoutFeedback key={x} >
                    <View style={{
                        marginHorizontal: 2,
                    }}>
                        <Animated.View>
                            <Star filled={ x <= this.state.rating ? true : false }/>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
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

                    {/* // Sub root container */}
                    <View style={globalStyles.containerForBookAppointment}>
                        <NavigationBtn screenName={Signin} styling={ styles.headerNavigation } />

                        {/* doctor profile and information */}
                        <View style={styles.containerProfile }>
                            <View>
                                <Image
                                    style={styles.DocImage} 
                                    source={require('../../../assets/BookAppointment/doctor.jpg')}/>
                            </View>
                            <View style={{ flex: 2, height: 130 }}>
                                <View style={ styles.DocProfileInfo }>
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                    }}>
                                        Dr. Clara Odding
                                    </Text>
                                </View>
                                <View style={ styles.DocProfileInfo }>
                                    <Text style={{
                                        fontSize: 14,
                                        color: 'grey'
                                    }}>
                                        Dentist
                                    </Text>
                                </View>
                                <View style={ styles.DocProfileInfo }>
                                    <Text style={{
                                        fontSize: 14,
                                        color: 'grey'
                                    }}>
                                        Karachi, Pakistan
                                    </Text>
                                </View>
                                <View style={ styles.DocProfileInfo }>
                                    { stars }
                                    <Text style={{ 
                                            fontSize: 15,
                                            color: 'grey',
                                            marginLeft: '4%'
                                        }}>
                                            (25)
                                    </Text>
                                </View>
                            </View>
                        </View>
                        
                        {/* TimeSlots Container Start */}
                        <View style={styles.TimeSlots}>
                            <View style={ styles.TimeSlotsSubContainer }>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row'
                                    }}>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'column',
                                        }}>
                                            <Text style={{
                                                marginBottom: '5%',
                                                fontSize: 20,
                                                fontWeight: '900'
                                            }}>
                                                Thu, 09 Apr
                                            </Text>

                                            <Text style={{
                                                color: 'grey'
                                            }}>
                                                3 Slots Available
                                            </Text>

                                        </View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'flex-end'
                                        }}>
                                            <TouchableOpacity style={ styles.SeeAllBtn }>
                                                <Text style={{ color: 'white', fontSize: 14, }}>
                                                    See All
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        marginBottom: '5%'
                                    }}>

                                        <View style={ styles.TimeSlotsLabelView }>
                                            <Text style={{ fontSize: 13, fontWeight: 'normal', textAlign: 'center' }}>
                                                8 - 9 am
                                            </Text>
                                        </View>
                                        <View style={ styles.TimeSlotsLabelView }>
                                            <Text style={{ fontSize: 13, fontWeight: 'normal', textAlign: 'center' }}>
                                                12 - 1 pm
                                            </Text>
                                        </View>
                                        <View style={ styles.TimeSlotsLabelView }>
                                            <Text style={{ fontSize: 13, fontWeight: 'normal', textAlign: 'center' }}>
                                                5 - 6 pm
                                            </Text>
                                        </View>
                                        <View style={{
                                            height: '80%',
                                            marginTop: '5%',
                                            width: '23%',
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            borderColor: 'lightgrey',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{ fontSize: 13, fontWeight: 'normal', textAlign: 'center' }}>
                                                8 - 9 pm
                                            </Text>
                                        </View>

                                    </View>
                            </View>
                        </View>
                        {/* TimeSlots Container Ends */}

                        {/* button */}

                        <View style={styles.BookAppointment}>
                            <TouchableOpacity style={styles.BookAppointmentBtn}>
                                <Text style={globalStyles.buttonTxt}>
                                    Book Appointment
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* book appointment doc details tab navigation */}
                        <View style={ styles.DocInfoTabNavigation }>
                            <ScrollView
                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}>

                                {/* <BookAppointmentTabsHome /> */}
                                
                                {/* Doctor Screen */}

                                <View
                                    style={ styles.DoctorScreenView }
                                >
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}>

                                        <View style={styles.SwapableViews}>
                                            <Text style={styles.SwapableViewsTitle}>Doctor</Text>
                                        </View>

                                        {/* Doctor Sub Container */}
                                        <View style={{
                                            flexDirection: 'column',

                                        }}>
                                            <View style={{

                                            }}>
                                                <Text style={{
                                                    fontSize: 15,
                                                    marginBottom: '2%'
                                                }}>
                                                    Languages
                                                </Text>
                                                <View style={{
                                                    flexDirection: "row",
                                                    alignItems: 'center',
                                                }}>
                                                    <Flag
                                                        code="PK"
                                                        size={24}
                                                    />
                                                    <Text style={ styles.LanguageLabel }>
                                                        Urdu
                                                    </Text>

                                                    <Flag
                                                        code="GB"
                                                        size={24}
                                                        style={{ marginLeft: 30 }}
                                                    />
                                                    <Text style={ styles.LanguageLabel }>
                                                        English
                                                    </Text>
                                                </View>

                                            </View>

                                            <View
                                                style={{
                                                    borderBottomColor: 'grey',
                                                    borderBottomWidth: 1,
                                                    marginTop: 15,
                                                    marginBottom: 15
                                                }}
                                            />

                                            {/* Education Tab Start */}

                                            <View style={{

                                            }}>
                                                <Text style={{
                                                    fontSize: 15,
                                                    marginBottom: '2%'
                                                }}>
                                                    Education
                                                </Text>
                                                <View style={{
                                                    flexDirection: "column",
                                                }}>
                                                    
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center'
                                                    }}>
                                                        <View style={ styles.QualificationLabelView } />
                                                        <Text style={{
                                                            color: 'grey',
                                                            fontSize: 13,
                                                        }}>
                                                            MBBS: Dow Medical College (1980 - 1985), Karachi
                                                        </Text>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center'
                                                    }}>
                                                        <View style={ styles.QualificationLabelView } />
                                                        <Text style={{
                                                            color: 'grey',
                                                            fontSize: 13,
                                                        }}>
                                                            PharmD: Dow Medical College (1975 - 1980), Karachi
                                                        </Text>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center'
                                                    }}>
                                                        <View style={ styles.QualificationLabelView } />
                                                        <Text style={{
                                                            color: 'grey',
                                                            fontSize: 13,
                                                        }}>
                                                            BDS: Dow Medical College (1970 - 1975), Karachi
                                                        </Text>
                                                    </View>
                                                </View>

                                            </View>

                                            {/* *** Education Tab Ends *** */}

                                            <View
                                                style={{
                                                    borderBottomColor: 'grey',
                                                    borderBottomWidth: 1,
                                                    marginTop: 15,
                                                    marginBottom: 15
                                                }}
                                            />

                                            {/* Publications Tab Start */}

                                            <View style={{

                                            }}>
                                                <Text style={{
                                                    fontSize: 15,
                                                    marginBottom: '2%'
                                                }}>
                                                    Publications
                                                </Text>
                                                <View style={{
                                                    flexDirection: "row",
                                                }}>
                                                    
                                                    <View style={ styles.PublicationLabelView } />
                                                    <Text style={{
                                                        color: 'grey',
                                                        fontSize: 13,
                                                    }}>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry, Lorem Ipsum is simply dummy text of the printing and typesetting industry, (1980).
                                                    </Text>
                                                </View>

                                            </View>

                                            {/* Publications Tab Ends */}

                                            <View
                                                style={{
                                                    borderBottomColor: 'grey',
                                                    borderBottomWidth: 1,
                                                    marginTop: 15,
                                                    marginBottom: 15
                                                }}
                                            />

                                            {/* Discription Tab Start */}
                                            <View style={{

                                            }}>
                                                <Text style={{
                                                    fontSize: 15,
                                                    marginBottom: '2%'
                                                }}>
                                                    Discription
                                                </Text>
                                                <View style={{
                                                    flexDirection: "column",
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                    }}>
                                                        <View style={ styles.DiscriptionLabelView } />
                                                        <Text style={{
                                                            color: 'grey',
                                                            fontSize: 13,
                                                        }}>
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                        </Text>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        marginBottom: '5%'
                                                    }}>
                                                        <View style={ styles.DiscriptionLabelView } />
                                                        <Text style={{
                                                            color: 'grey',
                                                            fontSize: 13,
                                                        }}>
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                        </Text>
                                                    </View>
                                                </View>

                                            </View>

                                            {/* Discription Tab Ends */}
                                        
                                        </View>
                                    </ScrollView>
                                </View>

                                {/* Clinics Screen */}
                                <View
                                    style={ styles.ClinicsScreenView }
                                >
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}>
                                        
                                        <View style={styles.SwapableViews}>
                                            <Text style={styles.SwapableViewsTitle}>Clinics</Text>
                                        </View>

                                    </ScrollView>
                                </View>


                                {/* FeedBack Screen */}

                                <View style={ styles.FeedBackScreenView }
                                >
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}>

                                        <View style={styles.SwapableViews}>
                                            <Text style={styles.SwapableViewsTitle}>FeedBack</Text>
                                        </View>

                                    </ScrollView>
                                </View>

                            </ScrollView>
                        </View>

                    </View>

            </ScrollView>
        </View>
        );
    }
}
// Star Class
class Star extends React.Component {
    render() {
        return (
            <Icon
                name={ this.props.filled === true ? "star" : "star-o"}
                size={16} 
                color="orange"
            />
        );
    }
}

const styles = StyleSheet.create({
    containerProfile: {
        flex: 0.5,
        flexDirection: "row",
        paddingStart: 20,
        alignItems: 'center',
    },
    TimeSlots: {
        flex: 0.5,
        flexDirection: "row",
        paddingStart: 24,
        paddingEnd: 24,
        marginTop: '5%'
    },
    BookAppointment: {
        flex: 0,
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 10,
        marginStart: 24,
        paddingEnd: 24,
        justifyContent: 'center',
    },
    BookAppointmentBtn: {
        width:"100%",
        color: 'white',
        backgroundColor: '#2A2AC0',
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
    },
    DocInfoTabNavigation: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
    },
    SwapableViews: {
        alignItems: 'center',
    },
    SwapableViewsTitle: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    DocImage: {
        height: 130, 
        width: 120, 
        borderRadius: 15,
        margin: '3%',
    },
    DocProfileInfo: {
        flex: 1, 
        flexDirection: "row",
        alignItems: 'center'
    },
    TimeSlotsSubContainer: {
        flex: 1,
        flexDirection: "column", 
        backgroundColor: "white",
        borderRadius: 15,
        alignItems: 'center',
        padding: 20
    },
    SeeAllBtn: {
        width:"55%",
        color: 'white',
        backgroundColor: '#2A2AC0',
        borderRadius:25,
        height:40,
        alignItems:"center",
        justifyContent:"center",
    },
    TimeSlotsLabelView: {
        marginRight: '3%',
        marginTop: '5%',
        height: '80%',
        width: '23%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    LanguageLabel: {
        fontSize: 13,
        marginLeft: 10,
        color: 'grey'
    },
    QualificationLabelView: {
        borderWidth: 2, 
        height: 2, 
        width: 2, 
        borderRadius: 50, 
        borderColor: 'grey', 
        padding: 2, 
        marginRight: 5
    },
    PublicationLabelView: {
        borderWidth: 2, 
        height: 2, 
        width: 2, 
        borderRadius: 50, 
        borderColor: 'grey', 
        padding: 2, 
        marginRight: 5, 
        marginTop: 6.5
    },
    DiscriptionLabelView: {
        borderWidth: 2, 
        height: 2, 
        width: 2, 
        borderRadius: 50, 
        borderColor: 'grey', 
        padding: 2, 
        marginRight: 5, 
        marginTop: 6.5
    },
    DoctorScreenView: {
        flexDirection: "column", 
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        marginStart: 15,
        width: 430,
        height: '100%'
    },
    ClinicsScreenView: {
        flex: 1,
        flexDirection: "column", 
        backgroundColor: "white",
        borderRadius: 15,
        alignItems: 'center',
        padding: 20,
        width: 430,
        marginLeft: 20,
    },
    FeedBackScreenView: {
        flex: 1,
        flexDirection: "column", 
        backgroundColor: "white",
        borderRadius: 15,
        alignItems: 'center',
        padding: 20,
        width: 430,
        marginLeft: 20,
        marginRight: 20
    },
    headerNavigation: {
        marginTop: '9%',
        width: '100%',
        height: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: '5%',
        marginBottom: '5%'
    }
});

export default BookAppoinment;