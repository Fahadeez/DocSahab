import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// styling={ globalStyles.headerNavigation }

const navigationBtn = (props) => {
    const navigation = useNavigation();
    return (
        <View style={ props.styling }>
            <View>
                <Text>
                    <TouchableOpacity onPress={() => navigation.navigate(props.screenName)}>
                        <Icon name='angle-left' size={30} color="#2A2AC0"/>
                    </TouchableOpacity>
                </Text>            
            </View>
        </View>
    );
};

export default navigationBtn;