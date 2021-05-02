import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import NavigationBtn from '../../components/navigationBtn';
import {globalStyles} from '../../styles/globalStyles';

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
              title="Help"
            />
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
});

export default FeedBack;
