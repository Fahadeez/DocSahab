// to dont wipe the state, refresh the state
// @refresh reset

import React from 'react';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  LogBox,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase';
import 'firebase/firestore';
import axios from 'axios';
import NavigationBtn from '../../../components/navigationBtn';

// firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyB_6WOFf5pQZPu4k33wiaKF-I-Lls1eGzY',
  authDomain: 'chatdata-b2e5a.firebaseapp.com',
  projectId: 'chatdata-b2e5a',
  storageBucket: 'chatdata-b2e5a.appspot.com',
  messagingSenderId: '92138235089',
  appId: '1:92138235089:web:61e40fd312a2bdecead1f0',
};

// to not create the app again... due to hot reload
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ experimentalForceLongPolling: true });
}

LogBox.ignoreLogs(['Setting a timer for a long period of time']);
LogBox.ignoreLogs([
  'Animated.event now requires a second argument for options',
]);
LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);

// create a reference to our firestore database
const db = firebase.firestore();

// reference to our chat collection
// const chatsRef = db.collection('chats');

class Chat_Module extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      is_picking_file: false,
      data: '',
      user: null,
    };
  }

  // reference to our chat collection
  chatsRef = db.collection(this.props.chatRoomName);

  componentDidMount() {
    this.getUser_Email_Id();
    this.messagesFromDb();
  }

  messagesFromDb() {
    const unSubscribe = this.chatsRef.onSnapshot((querySnapshot) => {
      // it has all the changed data, listen to all the changes
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type == 'added')
        .map(({ doc }) => {
          const message = doc.data();
          return {
            ...message,
            createdAt: message.createdAt.toDate(),
          };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      this.appendMessages(messagesFirestore);
    });
    return () => unSubscribe();
  }

  onSend = async (messages) => {
    // to add the data(messages) to firestore
    const writes = messages.map((m) => this.chatsRef.add(m));
    // sending messages data from frontend to here
    await Promise.all(writes);
  };

  appendMessages = (messages) => {
    this.setState((prevMess) => {
      return {
        messages: GiftedChat.append(prevMess.messages, messages),
      };
    });
  };

  renderSendBtnColor(props) {
    return <Send {...props} textStyle={{ color: '#2A2AC0' }} label={'Send'} />;
  }

  renderInputToolbar(props) {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderTopColor: '#ECF1FA',
          borderRadius: 30,
        }}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: { backgroundColor: '#006AFF' },
          right: { backgroundColor: '#00B2FF' },
        }}
        textStyle={{
          left: { color: 'white' },
          right: { color: 'white' },
        }}
      />
    );
  }

  // -> function to get the user email
  getUser_Email_Id = async () => {
    const email = await AsyncStorage.getItem('signInData');
    console.log('user email from signIn: ', email);
    const _id = await AsyncStorage.getItem('user_Id');
    console.log('user id: ', _id);
    const user = { email, _id };
    // update the null value of user
    this.setState({ user });
    // console the user data
    console.log('User Object: ', user);
  };

  renderActions(props) {
    const selectOneFile = async () => {
      const params = {
        key: '43b345ff84a4e43307ebd0d8e5f44cf3',
      };

      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });

        if (res != null) {
          const data = new FormData();
          data.append('image', res);

          let response = await axios.post(
            'https://api.imgbb.com/1/upload',
            data,
            { params: { key: '43b345ff84a4e43307ebd0d8e5f44cf3' } },
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          );

          this.onSend({ image: response.data.data.url });

          if (response.data.status === 200) {
            ToastAndroid.show('Upload successfull', ToastAndroid.LONG);
          }
        } else {
          ToastAndroid.show('Select a file first', ToastAndroid.LONG);
        }
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          alert('Failed to attach a file');
        } else {
          alert('Unknown Error: ' + JSON.stringify(err));
          throw err;
        }
      }
    };
    return (
      <View style={styles.customActionsContainer}>
        <TouchableOpacity onPress={selectOneFile}>
          <View style={styles.buttonContainer}>
            <Icon name="paperclip" size={23} color={'#2A2AC0'} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render(props) {
    return (
      <View style={{ flex: 1 }}>
        <NavigationBtn
          screenName={'DashboardScreen'}
          styling={{ position: 'relative',bottom: 140 }}
        />
        <GiftedChat
          renderAvatar={() => null}
          showAvatarForEveryMessage={true}
          renderInputToolbar={this.renderInputToolbar}
          messagesContainerStyle={{ backgroundColor: '#ECF1FA' }}
          messages={this.state.messages}
          onSend={this.onSend}
          user={this.state.user}
          renderActions={this.renderActions}
          renderSend={this.renderSendBtnColor}
          renderBubble={this.renderBubble}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  customActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    padding: 10,
  },
});

export default Chat_Module;
