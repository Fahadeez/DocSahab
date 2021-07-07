import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyles } from '../../styles/globalStyles';
import { Context as AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function DrawerContent(props) {
    const { state, signOut } = useContext(AuthContext);
    const [data, setData] = useState([]);


    function navigate() {
        props.navigation.navigate('login')
    }


    useEffect(() => {
        async function setUserData() {
            const userData = await AsyncStorage.getItem('userData');
            console.log(userData)
            setData(JSON.parse(userData));
        }

        setUserData();

    }, []);

    return (
        <View style={styles.drawerContent}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: 'http://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'
                                }}
                                size={60}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{data.firstName + " " + data.lastName}</Title>
                                <Caption style={styles.caption}>{data.doctor == false ? 'User' : 'Doctor'}</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="calendar-clock"
                                    color={'#2A2AC0'}
                                    size={size}
                                />
                            )}
                            label="My Appointments"
                            onPress={() => { props.navigation.navigate('MyAppointment') }}
                        />

                        {data.doctor === false ?
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="heart-plus-outline"
                                        color={'#2A2AC0'}
                                        size={size}
                                    />
                                )}
                                label="New Appointment"
                                onPress={() => { props.navigation.navigate('SearchDoc') }}
                            />
                            : <>
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <Icon
                                            name="face-profile"
                                            color={'#2A2AC0'}
                                            size={size}
                                        />
                                    )}
                                    label="My Profile"
                                    onPress={() => { props.navigation.navigate('profile') }}
                                />
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <Icon
                                            name="heart-plus-outline"
                                            color={'#2A2AC0'}
                                            size={size}
                                        />
                                    )}
                                    label="Patient history"
                                    onPress={() => { props.navigation.navigate('patientHistory') }}
                                />
                            </>
                        }

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="file-account-outline"
                                    color={'#2A2AC0'}
                                    size={size}
                                />
                            )}
                            label="Medical Records"
                            onPress={() => { props.navigation.navigate('MedicalRecord') }}
                        />
                        {data.doctor === false ?
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="file-account-outline"
                                        color={'#2A2AC0'}
                                        size={size}
                                    />
                                )}
                                label="Join a meeting"
                                onPress={() => { props.navigation.navigate('Meeting') }}
                            /> : null
                        }
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="shopping-outline"
                                    color={'#2A2AC0'}
                                    size={size}
                                />
                            )}
                            label="Mart"
                            onPress={() => { props.navigation.navigate('Mart') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="shopping-outline"
                                    color={'#2A2AC0'}
                                    size={size}
                                />
                            )}
                            label="Orders"
                            onPress={() => { props.navigation.navigate('Orders') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="information-outline"
                                    color={'#2A2AC0'}
                                    size={size}
                                />
                            )}
                            label="About us"
                            onPress={() => { props.navigation.navigate('aboutUs') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="information-outline"
                                    color={'#2A2AC0'}
                                    size={size}
                                />
                            )}
                            label="Order Success"
                            onPress={() => { props.navigation.navigate('OrderSuccess') }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={'#2A2AC0'}
                            size={size}
                        />
                    )}
                    label="Logout"
                    onPress={() => { signOut(navigate) }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        backgroundColor: '#ECF1FA'
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        color: '#2A2AC0'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: '#181461'
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    }
});