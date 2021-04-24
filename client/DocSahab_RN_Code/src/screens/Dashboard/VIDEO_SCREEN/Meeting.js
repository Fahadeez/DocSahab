import React, { Component } from 'react';
import 
    { 
        View,
        StyleSheet, 
        TouchableOpacity,
        ImageBackground,
    } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const image = { uri: "https://scitechdaily.com/images/Cat-COVID-19-Mask.jpg" }; // for testing

class Video extends Component {
    render() {
        return(
            <View style={ styles.Container }>
                <ImageBackground
                    style={{
                        flex: 1,
                        resizeMode: 'cover',
                    }}
                    source = { image }
                >
                <View style={ styles.Sub_Container }>
                    <View style={ styles.Video_Btns_Container }>
                        <TouchableOpacity style={ styles.Icon_View }>
                            <Icon
                                name={"microphone"}
                                size={34}
                                color="#2A2AC0"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={ styles.Icon_View }>
                            <Icon
                                name={"camera"}
                                size={34}
                                color="#2A2AC0"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={ styles.Icon_View }>
                            <Icon
                                name={"phone"}
                                size={34}
                                color="#2A2AC0"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={ styles.Icon_View }>
                            <Icon
                                name={"comment"}
                                size={34}
                                color="#2A2AC0"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#ECF1FA',
    },
    Video_Btns_Container: {
        height: 100,
        width: '80%',
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: 30,
        alignItems: 'center',
        padding: 9,
        justifyContent: 'space-evenly',
        marginBottom: '10%'
    },
    Sub_Container: {
        flex: 1,
        padding: 23,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    Icon_View: {
        alignItems: 'center'
    }
});

export default Video;
