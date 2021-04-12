import React from 'react';
import { Text, View, Image } from 'react-native';

const headerWithPic = (props) => {
    return (
        <View style={{
            marginTop: '5%',
            marginBottom: '5%',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        }}>
            
            <View style={{ marginRight: '4%' }}>
                <Image
                    style={{
                        height: 60,
                        width: 60,
                        borderRadius: 100,
                    }} 
                    source={require('../../assets/BookAppointment/doctor.jpg')}
                />
            </View>
            
            <View style={{
                height: 50,
                justifyContent: 'center'
            }}>
                <Text style = {{ 
                    fontSize: 22, 
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

export default headerWithPic;