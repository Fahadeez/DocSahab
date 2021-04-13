import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import HeaderWithPic from '../../components/headerWithPic';

class Chat extends Component {
  render() {
    return (
      // root container
      <View
        style={{
          flex: 1,
          backgroundColor: '#ECF1FA',
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {/* sub root container */}
          <View style={styles.containerForChat}>
            <HeaderWithPic title="Dr. Clara Odding" />
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
