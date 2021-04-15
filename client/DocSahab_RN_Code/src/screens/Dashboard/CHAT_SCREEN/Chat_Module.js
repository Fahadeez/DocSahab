import React from 'react';
import { 
    GiftedChat, 
    Bubble,
    InputToolbar,
    Actions
} from 'react-native-gifted-chat';

import { View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import ImagePicker from 'react-native-image-picker';

class Chat_Module extends React.Component {
    constructor( props ) {
        super(props);
        this.state = { messages: [] };
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
        return (
            <Actions
                {...props}
                options = {{
                    ['Select Image']: ImagePicker,
                }}
                icon = {() => (
                    <View style={{
                        margin: '1%',
                        padding: 3,
                        borderRadius: 30,
                    }}>
                        <Icon
                            name={ "paperclip" }
                            size={20}
                            color="grey"
                        />
                    </View>
                )}
                onSend={args => console.log(args)}
            />
    )}

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

export default Chat_Module;
