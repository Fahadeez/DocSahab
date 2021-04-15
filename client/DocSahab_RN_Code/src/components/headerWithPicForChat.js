import React from 'react';
import { Text, View, Image } from 'react-native';

const headerWithPicForChat = (props) => {
    return (
        <View style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        }}>
            
            <View style={{ marginRight: '3%' }}>
                <Image
                    style={{
                        height: 50,
                        width: 50,
                        borderRadius: 100,
                    }} 
                    source={require('../../assets/BookAppointment/doctor.jpg')}
                />
            </View>
            
            <View style={{
                height: 50,
                justifyContent: 'center',
            }}>
                <Text style = {{ 
                    fontSize: 20, 
                    color: '#2A2AC0', 
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}>
                    {props.title}
                </Text>
            </View>
        </View>
    );
};

export default headerWithPicForChat;