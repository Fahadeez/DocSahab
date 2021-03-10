import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';


const Home = ({navigation}) => {
  return <View>
  <Text>I'm Gay and thats okay</Text>
  <Button title = "Go to Main" onPress = {() => navigation.navigate('Main')} />
  </View>
};

export default Home;
