import React from 'react';
import { View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView, 
    ToastAndroid,
    FlatList,
} from 'react-native';
import NavigationBtn from '../../components/navigationBtn';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardScreen from '../Dashboard/dashboard';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

// const config = {
//     headers: {
//         'content-type': 'multipart/form-data'
//     }
// }

const record = [];

const baseURL = 'http://192.168.0.105:5000';

class MedicalRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            file: null,
            record: record,
            refreshing: false,
        }
    }

    componentDidMount() {
        this.getAllRecords();
    }

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
                // 'http://192.168.0.105:5000/api/upload-report',data,{
                baseURL+'/api/upload-report',data,{
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

    getAllRecords = () => {
        fetch(baseURL+"/api/get-all-reports")
        .then(record => record.json() )
        .then((recordJson) => {
            this.setState({
                record: recordJson,
                refreshing: false,
            })
            // console.log('data: ', recordJson);
        })
        .catch(err => console.log(err) )
    };

    renderItem = ( record ) => {
        return (
            <View style={{ padding: 10 }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: 'lightgrey',
                borderBottomWidth: 1,
                paddingBottom: 15,
                paddingTop: 10
            }}>
                <View style={{
                    flexDirection: 'row',
                    width: '70%',
                }}>
                    <View style={{
                        flexDirection: 'column',
                    }}>
                        <View style={{ marginBottom: '0.3%' }}>
                            <Text style={{ fontSize: 11, color: 'grey' }}>{ record.item.timeCreated.slice(0, 10) }</Text>
                        </View>

                        <View style={{ 
                            flexDirection: 'row', 
                            marginBottom: '3%',
                        }}>
                            <Text style={{ fontSize: 16, }}>{ record.item.name.slice(31) }</Text>
                        </View>

                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: '30%'
                }}>
                    {/* <View style={{ marginEnd: '5%' }}>
                        <TouchableOpacity
                            onPress={ 
                                () => { 
                                    console.log('download')
                            }}
                        >
                            <Icon
                                name={"arrow-circle-down"}
                                size={22}
                                color="#2A2AC0"
                            />
                        </TouchableOpacity>
                    </View> */}


                    <View>
                        <TouchableOpacity onPress={
                            (record) => this.deleteRecord( record.id )
                        }>
                            <Icon
                                name={"trash"}
                                size={22}
                                color="#2A2AC0"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            </View>
        );
    };

    handleRefresh = () => {
        this.setState({ refreshing: false }, () => {
            this.getAllRecords();
        });
    }

    deleteRecord = async (record) => {
        try {
            record = await axios.post(baseURL+"/api/delete-report")
            if (record.status === 200) {
                ToastAndroid.show("Record deleted successfully",ToastAndroid.LONG)
            }
            else {
                ToastAndroid.show("Error, Try Again",ToastAndroid.LONG)
            }
        }
        catch(error) {
            console.log(error);
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

                        <View>
                            <Text style={styles.headerTxt}>
                                Medical Records
                            </Text>
                        </View>

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

                                    <View style={styles.SwapableViews}>
                                        <Text style={styles.SwapableViewsTitle}>Records</Text>
                                    </View>

                                    {/* View Sub Container for records */}
                                    <View style={{
                                        flex: 1,
                                    }}>
                                        <FlatList
                                            data = { this.state.record }
                                            renderItem = { record => this.renderItem(record) }
                                            showsVerticalScrollIndicator={false}
                                            refreshing = { this.state.refreshing }
                                            onRefresh = { this.handleRefresh }
                                        />
                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                    }}>
                                        <View style={{
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{
                                                fontSize: 16,
                                                color: 'lightgrey',
                                                fontWeight: 'bold',
                                                marginRight: '3%',
                                            }}>
                                                Swipe right to upload new records
                                            </Text>
                                        </View>
                                        <View>
                                            <Icon
                                                name={"long-arrow-right"}
                                                size={26}
                                                color="lightgrey"
                                            />
                                        </View>
                                    </View>
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
                                                height: 150,
                                                width: 350,
                                                marginTop: '5%',
                                                marginBottom: '10%',
                                                justifyContent: 'center'
                                            }}>
                                                {/* to show the select record */}
                                                {file != null ? (
                                                    <Text style={{
                                                        fontSize: 16,
                                                    }}>
                                                        Record Name: { file ? file.name : ''}
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