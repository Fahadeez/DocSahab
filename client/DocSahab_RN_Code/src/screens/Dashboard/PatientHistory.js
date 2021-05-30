import React, { Component } from 'react';
import { ToastAndroid, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import DocSahabApi from '../../api/DocSahabApi';

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
      this.setState({ patients: resArr })

    }
    catch (e) {
      ToastAndroid.show("Error, Please try again later", ToastAndroid.SHORT)
    }
  }

  navigateToReport(id){
    this.props.navigation.navigate("patientRecords",{
      id
    })
  }

  render() {
    return (
      <View>
        {this.state.patients.map(item => {
          return (
            <View>
              <TouchableOpacity onPress={() => this.navigateToReport(item.patientID)}>
                <Text>{item.patientName}</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    );
  }
}

export default PatientHistory;
