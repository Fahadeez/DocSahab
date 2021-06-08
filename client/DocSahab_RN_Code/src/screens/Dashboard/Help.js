import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import NavigationBtn from '../../components/navigationBtn';
import { globalStyles } from '../../styles/globalStyles';

class FeedBack extends Component {
  render() {
    return (
      // root container
      <View
        style={{
          flex: 1,
          backgroundColor: '#ECF1FA',
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {/* sub root container */}
          <View style={styles.containerForHelp}>
            <NavigationBtn
              screenName={'DashboardScreen'}
              styling={styles.headerNavigation}
              title="About us"
            />
            <Text style={styles.textStyle}>
              Doc Sahab is a mobile-based telemedicine application which enable patients to book online appointment with the doctors. Like other telemedicine apps, it supports video/audio chat, data sharing feature with an integrated online medical store.
              The product provides a friendly UI and a sophisticated integration of supportive features such as:
            </Text>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.subText}>-	Upload medical records.</Text>
              <Text style={styles.subText}>-	Data/Report sharing over cloud.</Text>
              <Text style={styles.subText}>-	Live Video/Audio Chat</Text>
              <Text style={styles.subText}>-	Book appointments with verified and registered professionals.</Text>
              <Text style={styles.subText}>-	Purchase medical accessories at our online medical store.</Text>
            </View>
            <Text style={{ fontSize: 15, marginTop: 50, }}>This app is developed by students of Iqra university</Text>
            <Text style={{ fontSize: 15,fontWeight:'bold' ,marginTop: 4}}>M.Fahad Meraj</Text>
            <Text style={{ fontSize: 15,fontWeight:'bold' ,marginTop: 4}}>Nabeel Siddiqui</Text>
            <Text style={{ fontSize: 15, fontWeight:'bold',marginTop: 4}}>Shahzaib Gouhar</Text>
            <Text style={{ fontSize: 15, }}>under supervison of <Text style={{ fontSize: 15,fontWeight: 'bold'}}> Miss RIDAH FATIMA </Text></Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerForHelp: {
    flex: 1,
    backgroundColor: '#ECF1FA',
    padding: 23,
  },
  textStyle: {
    marginTop: 20,
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'justify'
  },
  subText: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export default FeedBack;
