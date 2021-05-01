import React from 'react';
import { 
    GiftedChat, 
    Bubble,
    InputToolbar,
    Actions
} from 'react-native-gifted-chat';

import { View, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import ImagePicker from 'react-native-image-picker';
import DocumentPicker  from "react-native-document-picker";
import axios from 'axios';


class Chat_Module extends React.Component {
    constructor( props ) {
        super(props);
        this.state = { messages: [], is_picking_file: false, imageurl: ''};
        this.onSend = this.onSend.bind(this);
    }

    componentDidMount() {
        this.setState({
            messages: [
            {
                _id: 1,
                text: 'wats up?',
                createdAt: new Date(),
                image: 'http://pngimg.com/uploads/doctor/doctor_PNG16043.png',
                user: {
                _id: 2,
                name: 'Chatting',
                avatar: 'http://pngimg.com/uploads/doctor/doctor_PNG16043.png',
                },            
            },
            ],
        });
    }

    onSend(messages = []) {
        this.setState(( previousState ) => {
          return {
            messages: GiftedChat.append(previousState.messages, messages),
          };
        });
    }

    renderBubble(props) { 
        return ( 
            <Bubble {...props}
                wrapperStyle = {{
                    left: { backgroundColor: '#006AFF' },
                    right: { backgroundColor: '#00B2FF' },
                }}
                textStyle={{
                    left: { color: 'white' },
                    right: { color: 'white' },
                }}
            />
    )}

    renderInputToolbar (props) {
       return ( 
            <InputToolbar 
                {...props} 
                containerStyle={{
                    borderTopColor: '#ECF1FA',
                    borderRadius: 30,
                }} 
            />
    )}


    renderActions (props) {
      const selectOneFile = async () => {

      const params = {
        'key': '43b345ff84a4e43307ebd0d8e5f44cf3'
      };
  
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
      //There can me more options as well
      // DocumentPicker.types.allFiles
      // DocumentPicker.types.images
      // DocumentPicker.types.plainText
      // DocumentPicker.types.audio
      // DocumentPicker.types.pdf
    });

    if (res != null) {
            const data = new FormData();
            data.append('image', res);

            let response = await axios.post(
              
                'https://api.imgbb.com/1/upload',data,{params: {'key': '43b345ff84a4e43307ebd0d8e5f44cf3'}},{

                  headers: {
                    'Content-Type': 'multipart/form-data',
                },          
            }
            );

            this.onSend({image: response.data.data.url })

            if (response.data.status === 200) {
                ToastAndroid.show("Upload successfull",ToastAndroid.LONG)
            }
        } else {
            ToastAndroid.show("Select a file first",ToastAndroid.LONG)

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
              <Icon name="paperclip" size={23} color={'black'} />
            </View>
          </TouchableOpacity>
        </View>
      );}

    render( props ) {

        return (
            <GiftedChat
                // alwaysShowSend
                // showUserAvatar
                renderBubble={this.renderBubble}
                renderInputToolbar={this.renderInputToolbar}
                messagesContainerStyle={{ backgroundColor: '#ECF1FA' }}
                messages={ this.state.messages }
                onSend={ this.onSend }
                user= {{
                    _id: 1,
                }}
                renderActions = { this.renderActions }
            />

        );
    }
}


const styles = StyleSheet.create({
  customActionsContainer: {
  flexDirection: "row",
  justifyContent: "space-between"
},
buttonContainer: {
  padding: 10
}
})

export default Chat_Module;
