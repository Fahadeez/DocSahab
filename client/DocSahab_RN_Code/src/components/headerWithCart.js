import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {globalStyles} from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

// styling={ globalStyles.headerNavigation }

const headerWithCart = (props) => {
  const navigation = useNavigation();
  return (
    <View style={props.styling}>
      <View
        style={{
          paddingVertical: '5%',
          paddingHorizontal: '5%',
          backgroundColor: 'white',
        }}>
        <Text>
          {/* () => navigation.goBack() */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="angle-left" size={40} color="#2A2AC0" />
          </TouchableOpacity>
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 26,
              color: '#2A2AC0',
              fontWeight: 'bold',
              marginTop: '5%',
            }}>
            {props.title}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("checkout")} style={{alignSelf: 'center', marginTop: '40%'}}>
            <Icon name="shopping-cart" size={40} color="#2A2AC0" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default headerWithCart;
