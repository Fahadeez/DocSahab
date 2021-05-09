import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat_room_name: '',
    };
  }

  SendchatRoomName = () => {
    this.props.navigation.navigate('Chat', {
      ChatRoomObject: this.state.chat_room_name,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sub_Container}>
          <View style={styles.inputLabelView}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              ENTER ROOM CHAT NAME
            </Text>
          </View>
          <TextInput
            style={{
              height: '7%',
              width: '90%',
              borderRadius: 17,
              paddingLeft: '5%',
              fontSize: 16,
              backgroundColor: 'ghostwhite',
            }}
            placeholder="nabeelRoom..."
            onChangeText={(chat_room_name) => this.setState({chat_room_name})}
          />
          <TouchableOpacity
            style={globalStyles.Button}
            onPress={this.SendchatRoomName}>
            <Text style={globalStyles.buttonTxt}>Join Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 10,
    backgroundColor: '#ECF1FA',
  },
  sub_Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLabelView: {
    width: '90%',
    marginBottom: '3%',
    marginLeft: '10%',
  },
});

export default ChatRoom;
