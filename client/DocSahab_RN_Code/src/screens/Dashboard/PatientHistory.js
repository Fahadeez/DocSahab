import React, { Component } from 'react';
import { ToastAndroid, TouchableOpacity} from 'react-native';
import { View, Text } from 'react-native';
import DocSahabApi from '../../api/DocSahabApi';

class PatientHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: []
    };
  }
 async componentDidMount(){
   try{
    const res = await DocSahabApi.get('/api/get-all-patients');
    console.log("res patients",res.data)
    this.setState({ patients: res.data })

   }
   catch(e){
     ToastAndroid.show("Error, Please try again later",ToastAndroid.SHORT)
   }
     
  }

  render() {
    return (
      <View>
        {this.state.patients.map(item => {
          return(
            <View>
              <TouchableOpacity>
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
