import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderWithPicForChat from '../../components/headerWithPicForChat';
import Chat_Module from '../Dashboard/CHAT_SCREEN/Chat_Module';

class Chat extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 5,
          backgroundColor: '#ECF1FA',
        }}
      >
        <View style={styles.containerForChat}>
          <HeaderWithPicForChat title="Dr. Clara Odding" />
        </View>

        <View style={{
          flex: 0.9,
          padding: 5
        }}>
          <Chat_Module />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerForChat: {
    flex: 0.1,
    marginLeft: '1%',
    marginTop: '5%',
    backgroundColor: '#ECF1FA',
  },
});

export default Chat;
