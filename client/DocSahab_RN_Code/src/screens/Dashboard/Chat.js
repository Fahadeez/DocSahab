import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import NavigationBtn from '../../components/navigationBtn';
import { globalStyles } from '../../styles/globalStyles';
import login from '../Auth/login';

class Chat extends Component {
    render() {
        return (
            // root container
            <View style={{
                flex: 1,
                backgroundColor: '#ECF1FA',
                }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {/* sub root container */}
                    <View style={ styles.containerForChat }>
                        <NavigationBtn screenName={login} styling={ styles.headerNavigation} title="Chatting" />
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerForChat: {
        flex: 1,
        backgroundColor: '#ECF1FA',
        padding: 23,
    },
});


export default Chat;