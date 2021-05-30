import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DocSahabApi from '../../api/DocSahabApi';

class PatientRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    async componentDidMount() {
        const id = this.props.route.params.id;
        console.log("id",id)
        const res = await DocSahabApi.get("/api/get-a-patient-reports/" + id);
        console.log("patient records", res.data);
    }
    render() {
        return (
            <View>
                <Text> PatientRecords </Text>
            </View>
        );
    }
}

export default PatientRecords;
