import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
import NavigationBtn from '../../components/navigationBtn';
import { globalStyles } from '../../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocSahabApi from '../../api/DocSahabApi';
import { Button, Overlay } from 'react-native-elements';

class MyAppointment extends Component {
  state = {
    search: '',
    userData: [],
    refreshing: false,
    visible: false,
    paymentStatus: false

  };

  componentDidMount() {
    this.fetchAppointmentDetails();
    this.updateSearch();
  }

  async fetchAppointmentDetails() {
    this.setState({
      refreshing: true,
    });
    try {
      const response = await DocSahabApi.get('/auth/current_user');
      console.log(response);
      this.setState({ userData: response.data, refreshing: false });
    } catch (err) {
      console.log(err);
    }
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  handleRefresh = () => {
    this.setState({ refreshing: false }, () => {
      this.fetchAppointmentDetails();
    });
  };
  toggleOverlay = () => {
    this.setState({ visible: !this.state.visible })
  };
  async changePaymentStatus(appointment) {
    try{
      const res = await DocSahabApi.post("/api/change-payment-status", { data: appointment, status: this.state.paymentStatus})
      if(res.status === 200){
        this.setState({ visible: false })
      }
    }
    catch(e){
      console.log(e)
    }
  }

  renderSwitch(appointment) {

    return (
      <>
        <Switch
          trackColor={{ false: '#767577', true: '#C4C9FC' }}
          thumbColor={'#f4f3f4'}
          style={{ alignSelf: 'flex-start', marginLeft: 30 }}
          onValueChange={(value) => {
            this.setState({ paymentStatus: value });
          }}
          value={this.state.paymentStatus}
        />
        <Button
          title="Ok"
          onPress={() => this.changePaymentStatus(appointment)}
          containerStyle={{ backgroundColor: '#2e2d84', marginTop: 30, width: 200, alignSelf: 'center' }}
        />
      </>
    )
  }


  render() {
    const { search } = this.state;

    return (
      // root container
      <View
        style={{
          flex: 1,
          backgroundColor: '#ECF1FA',
        }}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {/* sub root container */}
          <View style={styles.containerForMyAppointment}>
            <NavigationBtn
              screenName={'DashboardScreen'}
              title="Your Appointments"
            />

            {/* my appointments details tab navigation */}
            <View style={styles.UpcomingInfoTabNavigation}>
              <ScrollView
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                {/* Upcoming Screen */}

                <View style={styles.UpcomingScreen}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <View style={styles.SwapableViews}>
                      <Text style={styles.SwapableViewsTitle}>Upcoming</Text>
                    </View>

                    {/* Upcoming View Sub Container for my appointments */}
                    <FlatList
                      data={this.state.userData.appointments}
                      refreshing={this.state.refreshing}
                      showsVerticalScrollIndicator={false}
                      onRefresh={this.handleRefresh}
                      renderItem={({ item }) => {
                        console.log("Item__Appointment",item)
                        return (
                          <TouchableOpacity onPress={() => this.state.userData.doctor ? this.toggleOverlay() : null}>
                            <Overlay overlayStyle={styles.overlay} isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}>
                              <Text style={styles.overlayHeading}>Did you get the payment?</Text>
                              {this.renderSwitch(item)}

                            </Overlay>
                            <View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    width: '70%',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                    }}>
                                    <View style={{ marginBottom: '0.3%' }}>
                                      <Text style={{ fontSize: 12, color: 'grey' }}>
                                        {item.date}
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginBottom: '3%',
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 15,
                                          textAlign: 'center',
                                        }}>
                                        {item.specialization}
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 15,
                                          textAlign: 'center',
                                        }}>
                                        {' '}
                                      -{' '}
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 15,
                                          textAlign: 'center',
                                        }}>
                                        {item.name + "  "}
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: 15,
                                          textAlign: 'center',
                                        }}>
                                        {item.time}
                                      </Text>
                                      <View
                                        style={{
                                          marginStart: '3%',
                                          justifyContent: 'center',
                                        }}>
                                        <Icon
                                          name={'info-circle'}
                                          size={16}
                                          color="#2A2AC0"
                                        />
                                      </View>
                                    </View>
                                    <View>
                                      <Text>Payment status: {item.paymentAcknowlegment ? "Paid" : "Not paid"}</Text>
                                    </View>
                                  </View>

                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    width: '30%',
                                  }}>
                                  <View style={{ marginEnd: '3%' }}>
                                    <Icon
                                      name={'pencil'}
                                      size={20}
                                      color="#2A2AC0"
                                    />
                                  </View>
                                  <View>
                                    <TouchableOpacity>
                                      <View>
                                        <Text
                                          style={{
                                            color: '#2A2AC0',
                                            fontSize: 16,
                                            fontWeight: '500',
                                          }}>
                                          Modify
                                      </Text>
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                              <View
                                style={{
                                  borderBottomColor: 'lightgrey',
                                  borderBottomWidth: 1,
                                  marginTop: 15,
                                  marginBottom: 15,
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={(item) => item.id}
                    />
                  </ScrollView>

                  {/* button */}
                  <TouchableOpacity
                    style={styles.Button}
                  // onPress={
                  //     () => navigation.navigate()
                  // }
                  >
                    <Text style={globalStyles.buttonTxt}>
                      Book A New Appointment
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Past Screen */}
                <View style={styles.PastScreen}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <View style={styles.SwapableViews}>
                      <Text style={styles.SwapableViewsTitle}>Past</Text>
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

const styles = StyleSheet.create({
  containerForMyAppointment: {
    flex: 1,
    backgroundColor: '#ECF1FA',
    padding: 23,
  },
  UpcomingInfoTabNavigation: {
    flexDirection: 'row',
    height: 550,
  },
  UpcomingScreen: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: 430,
    height: '100%',
  },
  SwapableViews: {
    alignItems: 'center',
    marginBottom: '2%',
  },
  SwapableViewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  PastScreen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    padding: 20,
    width: 430,
    marginLeft: 20,
  },
  Button: {
    width: '100%',
    color: 'white',
    backgroundColor: '#2A2AC0',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    alignSelf: 'center',
  },
  overlay: {
    padding: 20,
    height: 400,
  },
  overlayText: {
    fontSize: 20,
    fontWeight: "600"
  },
  overlayHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'darkblue',
    marginBottom: 30
  }
});

export default MyAppointment;
