import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Linking, ToastAndroid } from 'react-native';
import NavigationBtn from '../../components/navigationBtn';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardScreen from '../Dashboard/dashboard';
import DocSahabApi from '../../api/DocSahabApi';

class PatientRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            refreshing: false
        };
    }
    getAllRecords = async () => {
        const id = this.props.route.params.id;
        const res = await DocSahabApi.get("/api/get-a-patient-reports/" + id);
        this.setState({ records: res.data })
    }

    async componentDidMount() {
        this.getAllRecords()
    }

    handleRefresh = () => {
        this.setState({ refreshing: false }, () => {
            this.getAllRecords();
        });
    };
    
    renderItem = (record) => {
        return (
            <View style={{ padding: 10 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomColor: 'lightgrey',
                        borderBottomWidth: 1,
                        paddingBottom: 15,
                        paddingTop: 10,
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
                                <Text style={{ fontSize: 11, color: 'grey' }}>
                                    {record.item.timeCreated.slice(0, 10)}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginBottom: '3%',
                                }}>
                                <Text style={{ fontSize: 16 }}>{record.item.name.slice(31)}</Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            width: '30%',
                        }}>
                        <View style={{ marginEnd: '5%' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    // console.log('download');
                                    Linking.openURL(record.item.mediaLink);
                                }}>
                                <Icon name={'arrow-circle-down'} size={22} color="#2A2AC0" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    };
    render() {
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
                    <View style={styles.containerForMedicalRecord}>
                        <NavigationBtn
                            screenName={DashboardScreen}
                            styling={styles.headerNavigation}
                        />

                        <View
                            style={{
                                marginBottom: '6%',
                            }}>
                            <Text style={styles.headerTxt}>Medical Records</Text>
                        </View>

                        {/* records details tab navigation */}
                        <View style={styles.RecordsInfoTabNavigation}>
                            <ScrollView
                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}>
                                {/* View Screen */}
                                <View style={styles.ViewScreen}>
                                    <View style={styles.SwapableViews}>
                                        <Text style={styles.SwapableViewsTitle}>Records</Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                        }}>
                                        <FlatList
                                            data={this.state.records}
                                            renderItem={(record) => this.renderItem(record)}
                                            showsVerticalScrollIndicator={false}
                                            refreshing={this.state.refreshing}
                                            onRefresh={this.handleRefresh}
                                        />
                                    </View>
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
    containerForMedicalRecord: {
        flex: 1,
        backgroundColor: '#ECF1FA',
        padding: 23,
    },
    headerTxt: {
        fontSize: 26,
        marginBottom: '5%',
        color: '#2A2AC0',
        fontWeight: 'bold',
    },
    headerNavigation: {
        marginBottom: '5%',
        width: '100%',
        height: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    RecordsInfoTabNavigation: {
        flexDirection: 'row',
        height: 550,
    },
    ViewScreen: {
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
    UploadScreen: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        padding: 20,
        width: 430,
        marginLeft: 20,
    },
    UploadButton: {
        flexDirection: 'row',
        width: '100%',
        color: 'white',
        backgroundColor: '#2A2AC0',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
});

export default PatientRecords;
