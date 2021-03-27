import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const navigationHeaderWithBar = () => {
    const navigation = useNavigation();
    return (
        <View style={ globalStyles.headerNavigation }>
            <View style = {{justifyContent: 'space-between', marginTop: '10%'}}>
                <Text>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Icon name='bars' size={30} color="#2A2AC0"/>
                    </TouchableOpacity>
                </Text>
                <Text style = {{fontSize: 30, color: '#2A2AC0', fontWeight: 'bold', marginTop: '5%'}}>Dashboard</Text>       
            </View>
        </View>

    );
};

export default navigationHeaderWithBar;