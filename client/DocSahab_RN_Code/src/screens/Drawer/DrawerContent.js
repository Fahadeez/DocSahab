import React, { useContext } from 'react';
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
import {globalStyles} from '../../styles/globalStyles';
import { Context as AuthContext } from '../../context/AuthContext';

export function DrawerContent(props) {
    const { state, signOut } = useContext(AuthContext);

    function navigate(){
        props.navigation.navigate('login')
    }

    return(
        <View style={styles.drawerContent}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://i.imgflip.com/3ko73y.png'
                                }}
                                size={60}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>Shahzaib Khan</Title>
                                <Caption style={styles.caption}>User/Doctor</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="calendar-clock" 
                                color={'#2A2AC0'}
                                size={size}
                                />
                            )}
                            label="My Appointments"
                            onPress={() => {props.navigation.navigate('MyAppointment')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="heart-plus-outline" 
                                color={'#2A2AC0'}
                                size={size}
                                />
                            )}
                            label="New Appointment"
                            onPress={() => {props.navigation.navigate('SearchDoc')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="file-account-outline" 
                                color={'#2A2AC0'}
                                size={size}
                                />
                            )}
                            label="Medical Records"
                            onPress={() => {props.navigation.navigate('MedicalRecord')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="shopping-outline" 
                                color={'#2A2AC0'}
                                size={size}
                                />
                            )}
                            label="Mart"
                            onPress={() => {props.navigation.navigate('SettingsScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-settings" 
                                color={'#2A2AC0'}
                                size={size}
                                />
                            )}
                            label="Account Settings"
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="information-outline" 
                                color={'#2A2AC0'}
                                size={size}
                                />
                            )}
                            label="Help"
                            onPress={() => {props.navigation.navigate('Help')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={'#2A2AC0'}
                        size={size}
                        />
                    )}
                    label="Logout"
                    onPress={() => {signOut(navigate)}}
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