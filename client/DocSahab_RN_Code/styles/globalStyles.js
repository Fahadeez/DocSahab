import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    // auth styles start here
    container: {
        flex: 1,
        backgroundColor: '#ECF1FA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerColor: {
        backgroundColor: '#ECF1FA',
        width: '100%',
        height: '100%',
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
    },
    buttonTxt: {
        color: 'white',
        fontSize: 18,
    },
    inputView:{
        width:"90%",
        backgroundColor:"white",
        borderRadius:10,
        height:50,
        marginBottom:20,
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
    inputText:{
        height:50,
        // color:"white"
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
        // fontWeight:"light",
        fontSize:16,
        // color:"#2A2AC0",
        color: 'black',
        marginBottom: 50,
    },
    logoView: {
        marginTop: 600
    },
    headerNavigation: {
        marginTop: '8%',
        width: '100%',
        height: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: '5%'
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
        flex: 1,
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
        color: 'black'
    },
    subContainer: {
        alignItems: 'center',
        padding: '3%',
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    // auth styles start here
});