import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Switch,
  ToastAndroid,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
import NavigationBtn from '../../components/navigationBtn';
import { globalStyles } from '../../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocSahabApi from '../../api/DocSahabApi';
import { Button, Overlay } from 'react-native-elements';
import Tooltip from 'react-native-walkthrough-tooltip';

class Orders extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.tooltipRef = React.createRef();
  }

  state = {
    search: '',
    userData: [],
    refreshing: false,
    visible: false,
    paymentStatus: false,
    tooltipVisible: false,
    alertStatus: "ALERT: Order has been cancelled",
    cancelReason: ""
  };

  componentDidMount() {
    this.fetchOrderDetails();
    this.updateSearch();
  }

  async fetchOrderDetails() {
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
      this.fetchOrderDetails();
    });
  };
  toggleOverlay = () => {
    this.setState({ visible: !this.state.visible })
  };
  async changePaymentStatus(order) {
    try {
      const res = await DocSahabApi.post("/api/change-order-payment-status", { data: order, status: this.state.paymentStatus })
      if (res.status === 200) {
        this.setState({ visible: false })
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  async alertStatus(order) {
    try {
      const res = await DocSahabApi.post("/api/cancel-order", { data: order, alert: this.state.alertStatus, reason: this.state.cancelReason })
      if (res.status === 200) {
        ToastAndroid.show("Order Cancelled.", ToastAndroid.SHORT);
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  renderSwitch(order) {
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
          onPress={() => this.changePaymentStatus(order)}
          containerStyle={{ backgroundColor: '#2e2d84', marginTop: 30, width: 200, alignSelf: 'center' }}
        />
      </>
    )
  }
  componentWillUnmount() {
    this.setState({ tooltipVisible: false })
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
              title={this.state.userData.role === 'admin' ? "All Orders" : "Your Orders"}
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
                      <Text style={styles.SwapableViewsTitle}>{this.state.userData.role === 'admin' ? null : 'Orders'}</Text>
                    </View>
                    {/* Upcoming View Sub Container for my appointments */}
                    <FlatList
                      data={this.state.userData.orders}
                      refreshing={this.state.refreshing}
                      showsVerticalScrollIndicator={false}
                      onRefresh={this.handleRefresh}
                      renderItem={({ item }) => {
                        console.log("Items_", item)
                        return this.state.userData.role != 'admin' ? (
                          <TouchableOpacity>

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
                                    <View style={{ marginBottom: '0.3%' }}>
                                      <Text style={{ fontSize: 12, color: 'grey' }}>
                                        {item.uId}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginBottom: '3%',
                                      }}>
                                      <View>
                                        <Text>Products:</Text>
                                      </View>
                                      
                                      <View style = {styles.timingsView}>
                                        <FlatList
                                        horizontal
                                        data={item.products}
                                        renderItem={({item}) => {
                                          return (
                                              <Text style={styles.caption}>{"| " + item.name + " |"}</Text>
                                          );
                                        }}
                                        keyExtractor={(item2) => item2.value}
                                        showsHorizontalScrollIndicator={false}
                                      />
                                    </View>
                                      <Text
                                        style={{
                                          fontSize: 15,
                                          textAlign: 'center',
                                        }}>
                                        {' '}
                                        -{' '}
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
                                    <View><Text
                                        style={{
                                          fontSize: 15,
                                        }}>
                                        {"Amount: "+item.subTotal}
                                      </Text>
                                    </View>
                                    <View>
                                      <Text>Payment status: {item.status ? "Paid and recieved" : "To be paid and recieved"}</Text>
                                    </View>
                                        { item.alert != null ? <Text style = {{color: 'red', marginTop: '3%'}}>{item.alert + ". Reason: " + item.reason}</Text> : null
                                        }
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
                        )
                          :
                          (
                            <TouchableOpacity onPress={() => {this.toggleOverlay()}}>
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

                                      <View style={{ marginBottom: '2%' }}>
                                      <Text style={{ fontSize: 12, color: 'grey' }}>
                                        {`Order ID: `+ item.uId}
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
                                          {item.userName}
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
                                          {'ID: ' + item.userId}
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
                                        {this.state.userData.role === "admin" ?
                                          <>
                                            <Text
                                              style={{
                                                fontSize: 15,
                                              }}>
                                              {'Amount: ' + item.subTotal + ' '}
                                            </Text>
                                            <Text
                                              style={{
                                                fontSize: 15,
                                              }}>
                                              Products:
                                              {
                                                <FlatList
                                                  horizontal
                                                  data={item.products}
                                                  renderItem={({item}) => {
                                                    return (
                                                        <Text>{" " + item.name + " "}</Text>
                                                    );
                                                  }}
                                                  keyExtractor={(item2) => item2.value}
                                                  showsHorizontalScrollIndicator={false}
                                                />
                                              }
                                            </Text>
                                            <Text
                                              style={{
                                                fontSize: 15,
                                                marginTop: 0
                                              }}>
                                              {'Address: ' + item.patientName + ' '}
                                            </Text>
                                          </>
                                          : null
                                        }
                                        <Text>Payment status: {item.status ? "Paid and recieved" : "To be paid and recieved"}</Text>
                                        { item.alert != null ? <Text style = {{color: 'red', marginTop: '3%'}}>{item.alert + ". Reason: " + item.reason}</Text> : null
                                        }
                                 
                                        
                                          <TextInput style = {styles.input}
                                             underlineColorAndroid = "transparent"
                                             placeholder = "Cancel reason"
                                             placeholderTextColor = "#9a73ef"
                                             autoCapitalize = "none"
                                             onChangeText = {(value) => {
                                              this.setState({ cancelReason: value });
                                            }}/>
                                       
                                        <TouchableOpacity onPress = {() => this.alertStatus(item)}>
                                          <View style = {styles.submitButton}>
                                            <Text style = {{color: 'white'}}>Cancel Order</Text>
                                          </View>
                                        </TouchableOpacity>
                                        
                                        
                                      </View>
                                    </View>

                                  </View>

                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'flex-end',
                                      width: '30%',
                                    }}>
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
    alignSelf: 'center'
  },
  UpcomingInfoTabNavigation: {
    flexDirection: 'row',
    height: 550,
    marginTop: '5%'
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
  overlayToolTip: {
    padding: 20,
    height: 200,
    justifyContent: 'center'
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
  },
  input: {
      marginVertical: 10,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      marginHorizontal: 10,
      marginBottom: 5,
      height: 40,
      alignSelf: 'center'
   },
   submitButtonText:{
      color: 'white'
   }
});

export default Orders;
