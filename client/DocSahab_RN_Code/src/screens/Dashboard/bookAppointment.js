import React, {
    Component, useState,
    useContext,
    useEffect
} from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Animated, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NavigationBtn from '../../components/navigationBtn';
import { globalStyles } from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import 'react-native-gesture-handler';
import Flag from 'react-native-flags';
import CalendarStrip from 'react-native-calendar-strip';
import RNPickerSelect from "react-native-picker-select";
import { Context as AuthContext } from '../../context/AuthContext';
import moment from 'moment';

const numStars = 5

class BookAppoinment extends Component {
    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.state = {
            rating: 2,
            timeSlots: [],
            date: "",
            time: "",
        }
    }
    bookAppointment = async () => {
        const docData = this.props.route.params.doctor;
        this.props.navigation.navigate('payment', {
            time: this.state.time,
            date: this.state.date, docData
        })
    }

    componentDidMount() {
        const { state, fetchUser } = this.context;
        fetchUser();
    }
    timePickerItems = (date) => {
        const { startCheckupTime, endCheckupTime , appointments } = this.props.route.params.doctor;
        const startDate = moment(startCheckupTime).format('HH:mm')
        const endDate = moment(endCheckupTime).format('HH:mm')
        const startTime = moment(startDate, "HH:mm")
        const endTime = moment(endDate, "HH:mm")
        let duration = moment.duration(endTime.diff(startTime));
        let diff = duration.hours();
        let array = [];
        const appt_time = appointments.map(appt => {
            if(moment(appt.date).format("DD/MM/YYYY") === moment(date).format("DD/MM/YYYY") ){
                return appt.time
            }
        })
        for (i = 0; diff > i; i++) {
            let result = moment(startTime).add(i, 'hours').format('HH:mm')
            if(appt_time.includes(result)){
                continue;
            }
            array.push({
                label: result,
                value: result
            })
        }
        this.setState({ timeSlots: array })

    }
    dateSelected = (date) => {
        this.setState({ date })
        this.timePickerItems(date)
    }

    dayNumber = (day) => {
        if (day === "Monday") {
            return 1
        }
        if (day === "Tuesday") {
            return 2
        }
        if (day === "Wednesday") {
            return 3
        }
        if (day === "Thursday") {
            return 4
        }
        if (day === "Friday") {
            return 5
        }
        if (day === "Saturday") {
            return 6
        }
        if (day === "Sunday") {
            return 7
        }
    }

    datesBlacklistFunc = date => {
        const { days, appointments } = this.props.route.params.doctor;
        const appt_dates = appointments.map(appt => {

            return moment(appt.date).format('DD/MM/YYYY')
        })
        // console.log("appt_dates", appt_dates)

        const whiteListDays = days.map(day => {
            return this.dayNumber(day.value)
        })
        const currentDate = moment(date).format('DD/MM/YYYY')
        // if (appt_dates.includes(currentDate)) {
        //     return true
        // }
        if (whiteListDays.includes(date.isoWeekday())) {
            return false
        }
        else {
            return true
        }
    }

    render() {
        const Doc_data = this.props.route.params.doctor;
        console.log("doc data", Doc_data)

        let stars = [];
        for (let x = 1; x <= numStars; x++) {
            stars.push(
                <TouchableWithoutFeedback key={x} >
                    <View style={{
                        marginHorizontal: 2,
                    }}>
                        <Animated.View>
                            <Star filled={x <= this.state.rating ? true : false} />
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
                        <NavigationBtn screenName={'SearchDoc'} styling={styles.headerNavigation} />

                        {/* doctor profile and information */}
                        <View style={styles.containerProfile}>
                            <View>
                                <Image
                                    style={styles.DocImage}
                                    source={require('../../../assets/BookAppointment/doctor.jpg')} />
                            </View>
                            <View style={{ flex: 2, height: 130 }}>
                                <View style={styles.DocProfileInfo}>
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                    }}>
                                        {Doc_data.firstName}
                                    </Text>
                                </View>
                                <View style={styles.DocProfileInfo}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: 'grey'
                                    }}>
                                        {/* Dentist */}
                                        {Doc_data.qualification}
                                    </Text>
                                </View>
                                <View style={styles.DocProfileInfo}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: 'grey'
                                    }}>
                                        {/* Karachi, Pakistan */}
                                        {Doc_data.city}, Pakistan
                                    </Text>
                                </View>
                                <View style={styles.DocProfileInfo}>
                                    {stars}
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
                            <View style={styles.TimeSlotsSubContainer}>
                                <View style={{
                                    // flex: 1,
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        marginBottom: '5%'
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
                                </View>

                                {/* calender strip  */}
                                <View style={{
                                    flex: 1,
                                    marginBottom: '5%',
                                    width: '100%',
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        marginBottom: '2%',
                                        fontWeight: '900'
                                    }}>
                                        Select Your Date
                                        </Text>
                                    <CalendarStrip
                                        calendarAnimation={{ type: 'sequence', duration: 50 }}
                                        style={{ height: 100, width: '100%', marginBottom: '10%' }}
                                        datesBlacklist={(date) => this.datesBlacklistFunc(date)}
                                        daySelectionAnimation={{
                                            type: 'background',
                                            duration: 200,
                                            highlightColor: '#9370db',
                                        }}
                                        daySelectionAnimation={{
                                            type: 'background',
                                            duration: 200,
                                            highlightColor: '#9370db',
                                        }}
                                        onDateSelected={this.dateSelected}
                                    />

                                    {/* timing header */}
                                    <Text style={{
                                        fontSize: 18,
                                        // marginBottom: '5%',
                                        fontWeight: '900'
                                    }}>
                                        Select Your Timing
                                        </Text>
                                </View>

                                {/* timing dropdown */}
                                <View style={
                                    styles.pickerView
                                }>
                                    <RNPickerSelect
                                        style={{ inputAndroid: { color: 'black' } }}
                                        placeholder={{ label: "Select a time", value: '' }}
                                        onValueChange={(value) => {
                                            this.setState({ time: value })
                                        }}
                                        items={this.state.timeSlots}
                                    />
                                </View>


                            </View>
                        </View>
                        {/* TimeSlots Container Ends */}

                        {/* button */}

                        <View style={styles.BookAppointment}>
                            <TouchableOpacity style={styles.BookAppointmentBtn} onPress={this.bookAppointment}>
                                <Text style={globalStyles.buttonTxt}>
                                    Book Appointment
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* book appointment doc details tab navigation */}
                        <View style={styles.DocInfoTabNavigation}>
                            <ScrollView
                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}>

                                {/* <BookAppointmentTabsHome /> */}

                                {/* Doctor Screen */}

                                <View
                                    style={styles.DoctorScreenView}
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
                                                    <Text style={styles.LanguageLabel}>
                                                        Urdu
                                                    </Text>

                                                    <Flag
                                                        code="GB"
                                                        size={24}
                                                        style={{ marginLeft: 30 }}
                                                    />
                                                    <Text style={styles.LanguageLabel}>
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
                                                        <View style={styles.QualificationLabelView} />
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
                                                        <View style={styles.QualificationLabelView} />
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
                                                        <View style={styles.QualificationLabelView} />
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

                                                    <View style={styles.PublicationLabelView} />
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
                                                        <View style={styles.DiscriptionLabelView} />
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
                                                        <View style={styles.DiscriptionLabelView} />
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
                                    style={styles.ClinicsScreenView}
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

                                <View style={styles.FeedBackScreenView}
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
class Star extends Component {
    render() {
        return (
            <Icon
                name={this.props.filled === true ? "star" : "star-o"}
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
        // flex: 0.5,
        // flex: 1,
        // height: '30%',
        flexDirection: "row",
        paddingStart: 24,
        paddingEnd: 24,
        marginTop: '5%',
        marginBottom: '5%'
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
        width: "100%",
        color: 'white',
        backgroundColor: '#2A2AC0',
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
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
        width: "55%",
        color: 'white',
        backgroundColor: '#2A2AC0',
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    TimeSlotsLabelView: {
        marginRight: '3%',
        height: 50,
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
    },
    pickerView: {
        width: "100%",
        backgroundColor: '#f8f8ff',
        borderRadius: 10,
        height: 50,
        justifyContent: "center",
        padding: 15,
    },
});

export default BookAppoinment;