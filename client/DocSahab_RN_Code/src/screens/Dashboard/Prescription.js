import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import NavigationBtn from '../../components/navigationBtn';
import { globalStyles } from '../../styles/globalStyles';
import DocSahabApi from '../../api/DocSahabApi';

const Prescription = (props) => {
    const [meds, setMeds] = React.useState([]);
    const [name, setName] = React.useState('');
    const [days, setDays] = React.useState('');
    const [dosage, setDosage] = React.useState('');
    const [userData, setUserData] = React.useState();
    const [currentUser, setCurrentUser] = React.useState();


    React.useEffect(() => {
        const data = props.route.params.item;
        console.log("data ", data)
        setUserData(data)
        setMeds(data.prescription)
        fetchUser()

    }, []);

    async function fetchUser() {
        try {
            const response = await DocSahabApi.get('/auth/current_user');
            setCurrentUser(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    async function setRow() {
        console.log("render row called", name, days, dosage)
        const obj = {
            name,
            days,
            dosage
        }
        setMeds(oldMeds => [...oldMeds, obj])
        const newMeds = [...meds, obj]
        console.log("meds__", newMeds)
        try {
            const { patientId, uniqueId } = userData;
            const doctorId = props.route.params.doctorId;
            const data = {
                patientId,
                doctorId,
                uniqueId,
                prescription: newMeds
            }
            const res = await DocSahabApi.post("/api/save-prescription", { data })
            if (res.status === 200) {
                ToastAndroid.show("Prescription saved", ToastAndroid.SHORT)
            }
        }
        catch (e) {

        }
        console.log("setmeds", meds)
    }
    function renderRow() {
        if (meds?.length > 0) {
            return meds.map((item) => {
                return (
                    <DataTable.Row>
                        <DataTable.Cell>{item.name}</DataTable.Cell>
                        <DataTable.Cell >{item.days}</DataTable.Cell>
                        <DataTable.Cell >{item.dosage}</DataTable.Cell>
                    </DataTable.Row>
                )
            })
        }
    }

    function onChangeName(name) {
        setName(name)
    }
    function onChangeDays(name) {
        setDays(name)
    }
    function onChangeDosage(name) {
        setDosage(name)
    }

    return (
        <View style={{ backgroundColor: '#ECF1FA', flex: 1 }}>


            <View style={{ marginLeft: 20, marginRight: 20, }}>
                <NavigationBtn
                    screenName={'DashboardScreen'}
                    styling={styles.headerNavigation}
                    title="Prescription"
                />
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Name/Formula</DataTable.Title>
                        <DataTable.Title >No of days</DataTable.Title>
                        <DataTable.Title >Dosage</DataTable.Title>
                    </DataTable.Header>

                    {renderRow()}

                </DataTable>
                {currentUser?.doctor ?
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                            <TextInput onChangeText={onChangeName} style={{ height: 40, width: 150, backgroundColor: 'white', borderRadius: 15, padding: 5 }}
                                placeholder="Enter medicine name/formula" defaultValue={name} />
                            <TextInput onChangeText={onChangeDays} style={{ height: 40, width: 150, backgroundColor: 'white', borderRadius: 15, marginLeft: 10, padding: 5, marginRight: 10 }}
                                placeholder="Enter no days" defaultValue={days} />
                            <TextInput onChangeText={onChangeDosage} style={{ height: 40, width: 150, backgroundColor: 'white', borderRadius: 15, padding: 5 }}
                                placeholder="Enter dosage" defaultValue={dosage} />
                        </View>
                        <TouchableOpacity
                            style={[globalStyles.modifiedBtn, { marginTop: 30, width: 200, alignSelf: 'center' }]}
                            onPress={setRow}  >
                            <Text style={globalStyles.buttonTxt}>Enter</Text>
                        </TouchableOpacity>
                    </View>
                    : null
                }
            </View>
        </View>

    );
}

const styles = StyleSheet.create({

    headerNavigation: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ECF1FA',
        marginTop: '5%',
    },

});


export default Prescription;