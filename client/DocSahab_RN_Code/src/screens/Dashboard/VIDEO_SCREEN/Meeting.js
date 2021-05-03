import React, { Component, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { RTCView, mediaDevices } from 'react-native-webrtc';
import { Context as MeetingContext } from '../../../context/MeetingContext';

const { width, height } = Dimensions.get('window');

const image = { uri: "https://scitechdaily.com/images/Cat-COVID-19-Mask.jpg" }; // for testing

class Video extends Component {
    static contextType = MeetingContext

    constructor(props) {
        super(props);
        this.state = {
            audio: true,
        }
    }
    componentDidMount() {
        const { state, joinRoom } = this.context;
        console.log("meeting state cmd",state)
        let isFront = true;
        mediaDevices.enumerateDevices().then((sourceInfos) => {
            let videoSourceId;
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                if (
                    sourceInfo.kind == 'videoinput' &&
                    sourceInfo.facing == (isFront ? 'front' : 'environment')
                ) {
                    videoSourceId = sourceInfo.deviceId;
                }
            }
            mediaDevices
                .getUserMedia({
                    audio: this.state.audio,
                    video: {
                        mandatory: {
                            minWidth: 500,
                            minHeight: 300,
                            minFrameRate: 30,
                        },
                        facingMode: isFront ? 'user' : 'environment',
                        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
                    },
                })
                .then((stream) => {
                    console.log("join room called")
                    joinRoom(stream)
                })
                .catch((error) => {
                    console.log("error in meeting ",error);
                });
        });
    }

    render() {
        const { state, joinRoom } = this.context;
        console.log("meeting state", state)
        return (
            <View style={styles.Container}>
                { state.myStream ? (
                    <View>
                        <RTCView streamURL={state.myStream.toURL()}
                            style={{ width, height: height * 0.4 }} />
                        <View style={styles.Sub_Container}>
                            <View style={styles.Video_Btns_Container}>
                                {/* <TouchableOpacity style={styles.Icon_View} onPress={() => this.setState({ audio: !this.state.audio })}>
                                    <Icon
                                        name={"microphone"}
                                        size={34}
                                        color="#2A2AC0"
                                    />
                                </TouchableOpacity> */}
                                <TouchableOpacity style={styles.Icon_View}>
                                    <Icon
                                        name={"camera"}
                                        size={34}
                                        color="#2A2AC0"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.Icon_View}>
                                    <Icon
                                        name={"phone"}
                                        size={34}
                                        color="#2A2AC0"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.Icon_View}>
                                    <Icon
                                        name={"comment"}
                                        size={34}
                                        color="#2A2AC0"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                ) : <Text>Loading...</Text>

                    // <ImageBackground
                    //     style={{
                    //         flex: 1,
                    //         resizeMode: 'cover',
                    //     }}
                    //     source={image}
                    // >
                    //     <View style={styles.Sub_Container}>
                    //         <View style={styles.Video_Btns_Container}>
                    //             <TouchableOpacity style={styles.Icon_View}>
                    //                 <Icon
                    //                     name={"microphone"}
                    //                     size={34}
                    //                     color="#2A2AC0"
                    //                 />
                    //             </TouchableOpacity>

                    //             <TouchableOpacity style={styles.Icon_View}>
                    //                 <Icon
                    //                     name={"camera"}
                    //                     size={34}
                    //                     color="#2A2AC0"
                    //                 />
                    //             </TouchableOpacity>

                    //             <TouchableOpacity style={styles.Icon_View}>
                    //                 <Icon
                    //                     name={"phone"}
                    //                     size={34}
                    //                     color="#2A2AC0"
                    //                 />
                    //             </TouchableOpacity>

                    //             <TouchableOpacity style={styles.Icon_View}>
                    //                 <Icon
                    //                     name={"comment"}
                    //                     size={34}
                    //                     color="#2A2AC0"
                    //                 />
                    //             </TouchableOpacity>
                    //         </View>
                    //     </View>
                    // </ImageBackground>
                }
                {
                    state.streams?.length > 0 ? (
                        <>
                            {
                                state.streams.map((stream, index) => {
                                    <View
                                        key={index}
                                        style={{
                                            width: 280,
                                            padding: 5,
                                            backgroundColor: 'red',
                                            borderColor: 'white',
                                            borderWidth: 1,
                                            marginRight: 10,
                                        }}
                                    >
                                        <RTCView streamURL={stream.toURL()}
                                            style={{ width, height: height * 0.4 }} />
                                    </View>
                                })
                            }
                        </>
                    ) : <Text>Loading...</Text>
                }
                {
                    state.remoteStreams?.length > 0 ? (
                        <>
                            {
                                state.streams.map((stream, index) => {
                                    <View
                                        key={index}
                                        style={{
                                            width: 280,
                                            padding: 5,
                                            backgroundColor: 'red',
                                            borderColor: 'white',
                                            borderWidth: 1,
                                            marginRight: 10,
                                        }}
                                    >
                                        <RTCView streamURL={stream.toURL()}
                                            style={{ width, height: height * 0.4 }} />
                                    </View>
                                })
                            }
                        </>
                    ) : <Text>Loading...</Text>
                }

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
