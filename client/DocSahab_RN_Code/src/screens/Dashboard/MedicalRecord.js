import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableWithoutFeedback, Animated, TouchableOpacity, ScrollView } from 'react-native';
import NavigationBtn from '../../components/navigationBtn';
import { globalStyles } from '../../styles/globalStyles';
import Signin from '../Auth/login';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
import DashboardScreen from '../Dashboard/dashboard';

class MedicalRecord extends React.Component {
    state = {
        search: '',
    };

    updateSearch = (search) => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;

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
                    <View style={ styles.containerForMedicalRecord }>
                        <NavigationBtn screenName={DashboardScreen} styling={ styles.headerNavigation }/>

                        <View style={{ 
                            // marginBottom: '5%'
                        }}>
                            <Text style={ styles.headerTxt }>
                                Medical Records
                            </Text>
                        </View>

                        {/* <Search placeholder="Seach here..."/> */}

                        <View style={{ marginBottom: '10%' }}>
                            <SearchBar
                                inputContainerStyle={{ backgroundColor: 'white' }}
                                containerStyle={{
                                    backgroundColor: '#ECF1FA',
                                    borderTopWidth: 0,
                                    borderBottomWidth: 0,
                                    margin: 0,
                                    padding: 0
                                }}
                                round
                                searchIcon={{ size: 30 }}
                                placeholder="Search"
                                onChangeText={this.updateSearch}
                                value={search}
                            />
                        </View>

                        {/* records details tab navigation */}
                        <View style={ styles.RecordsInfoTabNavigation }>
                            <ScrollView
                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}>
                                
                                {/* View Screen */}

                                <View
                                    style={ styles.ViewScreen }
                                >
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}>

                                        <View style={styles.SwapableViews}>
                                            <Text style={styles.SwapableViewsTitle}>View</Text>
                                        </View>

                                        {/* View Sub Container for records */}
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <View style={{ 
                                                flexDirection: 'row',
                                                width: '70%',
                                            }}>
                                                <View style={{ 
                                                    flexDirection: 'column',
                                                }}>
                                                    <View style={{ marginBottom: '0.3%' }}>
                                                        <Text style={{ fontSize: 10, color: 'grey' }}>18/02/2021</Text>
                                                    </View>

                                                    <View style={{ flexDirection: 'row', marginBottom: '3%' }}>
                                                        <Text style={{ fontSize: 14, textAlign: 'center' }}>Dentist</Text>
                                                        <Text style={{ fontSize: 14, textAlign: 'center' }}> - </Text>
                                                        <Text style={{ fontSize: 14, textAlign: 'center' }}>Nabeel Iqbal Siddiqui</Text>
                                                    </View>

                                                </View>
                                            </View>

                                            <View style={{ 
                                                flexDirection: 'row',
                                                justifyContent: 'flex-end',
                                                width: '30%'
                                             }}>
                                                <View style={{ marginEnd: '2%' }}>
                                                    <Icon
                                                        name={"arrow-circle-down"}
                                                        size={23} 
                                                        color="#2A2AC0"
                                                    />
                                                </View>
                                                <View>
                                                    <TouchableOpacity>
                                                        <View>
                                                            <Text style={{ 
                                                                color: '#2A2AC0',
                                                                fontSize: 14,
                                                                fontWeight: '500'
                                                            }}>
                                                                Download
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
                                                    marginBottom: 15
                                                }}
                                        />
                                        

                                    </ScrollView>
                                </View>

                                {/* Upload Screen */}
                                <View
                                    style={ styles.UploadScreen }
                                >
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}>
                                        
                                        <View style={styles.SwapableViews}>
                                            <Text style={styles.SwapableViewsTitle}>Upload</Text>
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
    containerForMedicalRecord: {
        flex: 1,
        backgroundColor: '#ECF1FA',
        padding: 23,
    },
    headerTxt: {
        fontSize: 20,
        fontWeight: '100',
        color: 'black',
        marginBottom: '5%',
    },
    headerNavigation: {
        marginTop: '5%',
        marginBottom: '5%',
        width: '100%',
        height: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    RecordsInfoTabNavigation: {
        flexDirection: 'row',
        height: 550
    },
    ViewScreen: {
        flexDirection: "column", 
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        width: 430,
        height: '100%',
    },
    SwapableViews: {
        alignItems: 'center',
        marginBottom: '2%'
    },
    SwapableViewsTitle: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    UploadScreen: {
        flex: 1,
        flexDirection: "column", 
        backgroundColor: "white",
        borderRadius: 15,
        alignItems: 'center',
        padding: 20,
        width: 430,
        marginLeft: 20,
    },
});

export default MedicalRecord;