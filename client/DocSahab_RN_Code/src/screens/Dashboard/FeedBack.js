import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import NavigationBtn from '../../components/navigationBtn';
import {globalStyles} from '../../styles/globalStyles';
import Signin from '../Auth/login';
import Icon from 'react-native-vector-icons/FontAwesome';
import 'react-native-gesture-handler';

const numStars = 5;

const numStarsForFeedBack = 5;

class FeedBack extends Component {
  state = {
    rating: 2,
    feedback: 3,
  };
  render() {
    let stars = [];
    for (let x = 1; x <= numStars; x++) {
      stars.push(
        <TouchableWithoutFeedback key={x}>
          <View
            style={{
              marginHorizontal: 2,
            }}>
            <Animated.View>
              <Star filled={x <= this.state.rating ? true : false} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>,
      );
    }

    let starsFeedBack = [];
    for (let x = 1; x <= numStarsForFeedBack; x++) {
      starsFeedBack.push(
        <TouchableWithoutFeedback key={x}>
          <View
            style={{
              marginHorizontal: 7,
            }}>
            <Animated.View>
              <FeedBackStar
                filledforfeedback={x <= this.state.feedback ? true : false}
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>,
      );
    }

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
          <View style={styles.containerForFeedBack}>
            <NavigationBtn
              screenName={Signin}
              styling={styles.headerNavigation}
            />

            <View>
              <Text style={styles.headerTxt}>Leave your feedback</Text>
            </View>

            {/* doctor profile and information */}
            <View style={styles.containerProfile}>
              <View>
                <Image
                  style={styles.DocImage}
                  source={require('../../../assets/BookAppointment/doctor.jpg')}
                />
              </View>
              <View style={{flex: 2, height: 130}}>
                <View style={styles.DocProfileInfo}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Dr. Clara Odding
                  </Text>
                </View>
                <View style={styles.DocProfileInfo}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'grey',
                    }}>
                    Dentist
                  </Text>
                </View>
                <View style={styles.DocProfileInfo}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'grey',
                    }}>
                    Karachi, Pakistan
                  </Text>
                </View>
                <View style={styles.DocProfileInfo}>
                  {stars}
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'grey',
                      marginLeft: '4%',
                    }}>
                    (25)
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 3,
                opacity: 0.1,
                marginBottom: '6%',
              }}
            />

            {/* Feedback Rating */}
            <View
              style={{
                flex: 0.16,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '9%',
              }}>
              {starsFeedBack}
            </View>

            <View
              style={{
                flex: 0.2,
                backgroundColor: 'white',
                borderRadius: 15,
                justifyContent: 'center',
                paddingStart: 20,
                paddingEnd: 20,
                marginBottom: '13%',
              }}>
              <TextInput
                style={{height: 220}}
                multiline={true}
                placeholder="Write your feedback"
                placeholderTextColor="grey"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View>
              <TouchableOpacity style={styles.AddFeedbackBtn}>
                <Text style={globalStyles.buttonTxt}>Add Feedback</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
// Star Class
class Star extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.filled === true ? 'star' : 'star-o'}
        size={16}
        color="orange"
      />
    );
  }
}

// feedback component
class FeedBackStar extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.filledforfeedback === true ? 'star' : 'star-o'}
        size={42}
        color="orange"
      />
    );
  }
}

const styles = StyleSheet.create({
  containerForFeedBack: {
    flex: 1,
    backgroundColor: '#ECF1FA',
    padding: 23,
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: '100',
    color: 'black',
    marginBottom: 25,
  },
  containerProfile: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  DocImage: {
    height: 130,
    width: 120,
    borderRadius: 15,
    margin: '3%',
  },
  DocProfileInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerNavigation: {
    marginTop: '5%',
    marginBottom: 30,
    width: '100%',
    height: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  AddFeedbackBtn: {
    width: '100%',
    color: 'white',
    backgroundColor: '#2A2AC0',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FeedBack;
