import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import NavigationBtn from '../../components/navigationBtn';
// import { globalStyles } from '../../styles/globalStyles';
// import Signin from '../Auth/login';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
import DashboardScreen from '../Dashboard/dashboard';
import { globalStyles } from '../../styles/globalStyles';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}
class MedicalRecord extends React.Component {
    state = {
        search: '',
        file: null,
    };

    updateSearch = (search) => {
        this.setState({ search });
    };

    selectRecord = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles]
            });
            console.log('res: ' + JSON.stringify(res));
            this.setState({ file: res });
        }
        catch (err) {
            if (DocumentPicker.isCancel(err)) {
                alert('Selection Canceled');
            }
            else {
                alert('Error: ' + JSON.stringify(err));
            }
        }
    };

    uploadRecord = async () => {
       const { file } = this.state;
        console.log("file",file)
        if (file != null) {
            const recordToUpload = file;
            const data = new FormData();
            data.append('file', recordToUpload);

            let res = await axios.post(
                'http://192.168.10.8:5000/api/upload-report',data,{
                    headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            );
            if (res.status === 200) {
                ToastAndroid.show("Upload successfull",ToastAndroid.LONG)
            }
        } else {
            ToastAndroid.show("Select a file first",ToastAndroid.LONG)

        }
    };

    render() {
        const { search, file } = this.state;

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
                    <View style={styles.containerForMedicalRecord}>
                        <NavigationBtn screenName={DashboardScreen} styling={styles.headerNavigation} />

                        <View style={{
                            // marginBottom: '5%'
                        }}>
                            <Text style={styles.headerTxt}>
                                Medical Records
                            </Text>
                        </View>

                        {/* <View style={{ marginBottom: '10%' }}>
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
                        </View> */}

                        {/* records details tab navigation */}
                        <View style={styles.RecordsInfoTabNavigation}>
                            <ScrollView
                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}>

                                {/* View Screen */}

                                <View
                                    style={styles.ViewScreen}
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
                                                        <Text style={{ fontSize: 12, color: 'grey' }}>18/02/2021</Text>
                                                    </View>

                                                    <View style={{ flexDirection: 'row', marginBottom: '3%' }}>
                                                        <Text style={{ fontSize: 15, textAlign: 'center' }}>Dentist</Text>
                                                        <Text style={{ fontSize: 15, textAlign: 'center' }}> - </Text>
                                                        <Text style={{ fontSize: 15, textAlign: 'center' }}>Nabeel Iqbal Siddiqui</Text>
                                                    </View>

                                                </View>
                                            </View>

                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'flex-end',
                                                width: '30%'
                                            }}>
                                                <View style={{ marginEnd: '3%' }}>
                                                    <Icon
                                                        name={"arrow-circle-down"}
                                                        size={20}
                                                        color="#2A2AC0"
                                                    />
                                                </View>
                                                <View>
                                                    <TouchableOpacity>
                                                        <View>
                                                            <Text style={{
                                                                color: '#2A2AC0',
                                                                fontSize: 16,
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
                                    style={styles.UploadScreen}
                                >
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}>

                                        <View style={styles.SwapableViews}>
                                            <Text style={styles.SwapableViewsTitle}>Upload</Text>
                                        </View>

                                        <View style={{
                                            flex: 1,
                                            alignItems: 'center'
                                        }}>
                                            {/* to show the selected file */}
                                            <View style={{
                                                height: 250,
                                                width: 350,
                                                marginTop: '5%',
                                                marginBottom: '10%',
                                                // justifyContent: 'center',
                                            }}>
                                                <Text style={{ textAlign: 'center' }}>To show the files</Text>
                                                {/* to show the select record */}
                                                {file != null ? (
                                                    <Text style={{
                                                        // textAlign: 'center',
                                                        // fontSize: '24'
                                                    }}>
                                                        Record Name: { file ? file.name : ''}
                                                        { console.log('hello hello: ', file)}
                                                    </Text>
                                                ) : null}

                                            </View>

                                            {/* select records btn */}
                                            <View style={{
                                                flex: 0.2,
                                                width: 300,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                alignContent: 'center',
                                                marginBottom: '5%'
                                            }}>
                                                <TouchableOpacity
                                                    style={styles.UploadButton}
                                                    onPress={() => { this.selectRecord() }}
                                                >
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: 18,
                                                        marginRight: '3%',
                                                    }}>
                                                        Select Record
                                                    </Text>
                                                    <View style={{
                                                        justifyContent: 'center',
                                                    }}>
                                                        <Icon
                                                            name={"file"}
                                                            size={24}
                                                            color="white"
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>

                                            {/* upload records btn */}
                                            <View style={{
                                                flex: 0.2,
                                                width: 300,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                alignContent: 'center',
                                                marginBottom: '5%'
                                            }}>
                                                <TouchableOpacity
                                                    style={styles.UploadButton}
                                                    onPress={this.uploadRecord}
                                                >
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: 18,
                                                        marginRight: '3%',
                                                    }}>
                                                        Upload Report
                                                    </Text>
                                                    <View style={{
                                                        justifyContent: 'center',
                                                    }}>
                                                        <Icon
                                                            name={"cloud-upload"}
                                                            size={24}
                                                            color="white"
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
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
        fontSize: 18,
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
    UploadButton: {
        flexDirection: 'row',
        width: "100%",
        color: 'white',
        backgroundColor: '#2A2AC0',
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
    },
});

export default MedicalRecord;