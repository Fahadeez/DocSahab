import React from 'react';
import {View, StyleSheet} from 'react-native';
import HeaderWithPicForChat from '../../components/headerWithPicForChat';
import Chat_Module from './CHAT_SCREEN/Chat_Module';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }
  // for testing
  // getting the username from email to show the username on top
  get_User_Email = async () => {
    const email = await AsyncStorage.getItem('signInData');
    // split the email and replace the numbers
    const email_split = email.split('@');
    const name_before = email_split[0].toUpperCase();
    const name = name_before.replace(/[0-9]/g, '');
    this.setState({name});
  };

  componentDidMount() {
    this.get_User_Email();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 5,
          backgroundColor: '#ECF1FA',
        }}>
        <View style={styles.containerForChat}>
          {/* <HeaderWithPicForChat title="Dr. Clara Odding" /> */}
          <HeaderWithPicForChat title={this.state.name} />
        </View>

        <View
          style={{
            flex: 0.9,
            padding: 5,
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
