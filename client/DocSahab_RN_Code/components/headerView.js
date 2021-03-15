import React from 'react';
import { Text, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const HeaderView = (props) => {
    return (
        <View>
            <Text style={ globalStyles.headerTxt }>
                {props.titletxt}
            </Text>
        </View>
    );
};

export default HeaderView;