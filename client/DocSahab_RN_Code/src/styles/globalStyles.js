import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    // auth styles start here
    container: {
        flex: 1,
        backgroundColor: '#ECF1FA',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%"
    },
    containerColor: {
        flex: 1,
        backgroundColor: '#ECF1FA',
    },
    headerTxt: {
        fontSize: 36,
        fontWeight: '100',
        textAlign: 'center',
        color: '#181461',
    },
    Button: {
        width:"90%",
        color: 'white',
        backgroundColor: '#2A2AC0',
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10,
        alignSelf: 'center'
    },
    modifiedBtn: {
        width:"90%",
        color: 'white',
        backgroundColor: '#2A2AC0',
        borderRadius:25,
        height:50,
        justifyContent:"center",
    },
    buttonTxt: {
        color: 'white',
        fontSize: 18,
    },
    inputView: {
        width:"90%",
        backgroundColor:"white",
        borderRadius:10,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputViewForForgetPassword: {
        width:"90%",
        backgroundColor:"white",
        borderRadius:10,
        height:50,
        marginBottom:5,
        justifyContent:"center",
        padding:20
    },
    modifiedinputView: {
        width:"90%",
        backgroundColor:"white",
        borderRadius:10,
        height:50,
        marginBottom:5,
        justifyContent:"center",
        padding:20
    },
    inputText: {
        height:50,
    },
    inputTitleTxt: {
        fontSize: 24,
        fontWeight:"bold",
        color: '#181461',
    },
    forgetPassLinkTxt: {
        fontSize: 13,
        color: '#2A2AC0',
        textAlign: 'right'
    },
    subHeaderTxt:{
        fontSize:16,
        color: 'black',
        marginBottom: 50,
    },
    logoView: {
        marginBottom: "5%"
    },
    headerNavigation: {
        marginTop: '8%',
        width: '100%',
        height: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: '5%',
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
    scrollView: {
        backgroundColor: '#ECF1FA',
    },
    pickerView: {
        width:"90%",
        backgroundColor:"white",
        borderRadius:10,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:15,
    },
    inputLabel: {
        width:"90%",
        backgroundColor:"#ECF1FA",
        height:40,
        marginBottom:5,
        padding:15,
    },
    inputLabelText: {
        fontSize: 15,
        color: 'black',
    },
    inputLabelTextUpdatePassword: {
        fontSize: 15,
        color: 'black',
        textAlign: 'center'
    },
    subContainer: {
        alignItems: 'center',
        padding: '3%',
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    MultiSelect: {
        alignItems: 'center',
        alignContent: 'center',
        width: '90%',
        backgroundColor:"white",
        borderRadius:10,
        marginBottom:20,
    },
    errorMessage:{
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    },
    // auth styles ends here

    // User DashBoard styles start here
    // Search Bar
    SearchbackgroundStyle: {
    marginTop: '17%',
    height: 50,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 22,
    flexDirection: 'row'
  },
  belowSearchbackgroundStyle: {
    marginTop: '7%',
    height: 50,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 22,
    flexDirection: 'row'
  },
  searchBar: {
    borderColor: 'black',
    flex: 1,
    fontSize: 18
  },
  searchIcon: {
    alignSelf: 'center',
    fontSize: 35,
    marginHorizontal: 15
  },
  containerForBookAppointment: {
    flex: 1,
    backgroundColor: '#ECF1FA',
  },

// User DashBoard styles ends here
});