import React, { Component } from 'react';
import { ToastAndroid, TouchableOpacity, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import DocSahabApi from '../../api/DocSahabApi';
import NavigationBtn from '../../components/navigationBtn';

class PatientHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: []
    };
  }
  async componentDidMount() {
    try {
      const res = await DocSahabApi.get('/api/get-all-patients');
      var resArr = []
      res.data.forEach(function (item) {
        var i = resArr.findIndex(x => x.patientID == item.patientID);
        if (i <= -1) {
          resArr.push({ patientID: item.patientID, patientName: item.patientName });
        }
      });
      console.log("patients___",resArr)
      this.setState({ patients: resArr })

    }
    catch (e) {
      ToastAndroid.show("Error, Please try again later", ToastAndroid.SHORT)
    }
  }

  navigateToReport(id) {
    this.props.navigation.navigate("patientRecords", {
      id
    })
  }

  render() {
    return (
      <View style={styles.parentBox}>
        <NavigationBtn
          screenName={'DashboardScreen'}
          styling={styles.headerNavigation}
          title="Patient history"
        />
        {this.state.patients.map(item => {
          return (
            <View >

              <TouchableOpacity onPress={() => this.navigateToReport(item.patientID)}>
                <View style={styles.list}>
                  <Text style={styles.name}>{item.patientName}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerNavigation: {
    marginTop: 0
  },
  parentBox: {
    backgroundColor: '#ECF1FA',
    flex: 1,
    padding: 20
  },
  list: {
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1",
    padding: 15,
    marginTop: 30
  },
  name: {
    fontSize: 18,
  }

});
export default PatientHistory;
