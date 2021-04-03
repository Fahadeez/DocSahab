import React, {
    useState,
    useContext,
    useEffect
} from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    Linking
} from 'react-native';
import HeaderView from '../../../src/components/headerView';
import { globalStyles } from '../../styles/globalStyles';
import Signup from './signup';
import ForgetPassword from './ForgetPassword';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocSahabApi from '../../api/DocSahabApi';
import {
    useForm,
    Controller
} from 'react-hook-form';
import { Context as AuthContext } from '../../context/AuthContext';

const login = () => {
    const { state, signIn } = useContext(AuthContext);

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // console.log(state);
    // console.log("state message: ", state.errorMessage);

    // for useForm
    const { control, handleSubmit, errors } = useForm();

    // for context function
    const onSignIn = () => signIn({
        email, password
    }, navigate)

    const navigate = () => {
        navigation.navigate('root');
    }

    // ref for onfocus
    const emailInputRef = React.useRef(null);
    const passwordInputRef = React.useRef(null);

    // show error after and before
    // console.log('Errors if any: ', errors);

    useEffect(() => {
        //Just for testing logout,
        async function logout() {
            await DocSahabApi.get('auth/logout')
            await AsyncStorage.removeItem('token')
        }
        function navigate(){
            navigation.navigate('doctordetails')
        }
       
        async function checkJwt() {
            const jwt = await AsyncStorage.getItem('token')
            const email = await AsyncStorage.getItem('userEmail')
            console.log("userEmail",email)
            console.log("jwt",jwt)

            if (jwt) {
                navigation.navigate('root')
            }
        }
        checkJwt()
        // navigate() // For testing doctors details page
        //  logout()
    }, []);

    return (

        <View style={globalStyles.containerColor}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <ScrollView
                    style={globalStyles.scrollView}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >

                    <View style={
                        {
                            flex: 1,
                            backgroundColor: '#ECF1FA',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '10%'
                        }
                    }>


                        <View style={globalStyles.logoView}>
                            <Image source={require('../../../assets/docsahab.png')} style={{ height: 150, width: 150 }} />
                        </View>

                        <HeaderView titletxt='Welcome' />

                        <Text style={globalStyles.subHeaderTxt}>Sign in to continue</Text>

                        <View style={globalStyles.inputView} >
                            <Controller
                                name="email"
                                defaultValue=""
                                control={control}
                                rules={{ required: 'Email is required' }}
                                onFocus={() => {
                                    emailInputRef.current.focus();
                                }}
                                render={(props, { onBlur }) => (
                                    <TextInput
                                        {...props}
                                        style={globalStyles.inputText}
                                        placeholder="Email"
                                        placeholderTextColor="#003f5c"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(value) => {
                                            props.onChange(value);
                                        },
                                            setEmail
                                        }
                                        onBlur={onBlur}
                                        value={email}
                                        ref={emailInputRef}
                                    />
                                )
                                }
                            />
                        </View>
                        {errors.email && <Text style={globalStyles.errorText}>Email is required</Text>}

                        <View style={globalStyles.inputView} >
                            <Controller
                                name="password"
                                defaultValue=""
                                control={control}
                                rules={{ required: 'Password is required' }}
                                onFocus={() => {
                                    passwordInputRef.current.focus();
                                }}
                                render={(props, { onBlur }) => (
                                    <TextInput
                                        {...props}
                                        secureTextEntry
                                        style={globalStyles.inputText}
                                        placeholder="Password"
                                        placeholderTextColor="#003f5c"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(value) => {
                                            props.onChange(value);
                                        },
                                            setPassword
                                        }
                                        onBlur={onBlur}
                                        value={password}
                                        ref={passwordInputRef}
                                    />
                                )
                                }
                            />
                        </View>
                        {errors.password && <Text style={globalStyles.errorText}>Password is required</Text>}

                        <View style={{ alignSelf: 'flex-end', right: 25 }}>
                            <TouchableOpacity onPress={() => navigation.navigate(ForgetPassword)}>
                                <Text style={globalStyles.forgetPassLinkTxt}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        {state.errorMessageForSignIn ? (
                            <View style={globalStyles.inputText}>
                                <Text style={globalStyles.errorMessage}>{state.errorMessageForSignIn}</Text>
                            </View>
                        ) : null
                        }

                        <TouchableOpacity
                            style={globalStyles.Button}
                            onPress={
                                handleSubmit(onSignIn)
                            }
                        >
                            <Text style={globalStyles.buttonTxt}>Sign In</Text>
                        </TouchableOpacity>

                        <View style={{ marginTop: '15%', marginBottom: '5%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>
                                    Doesn't have account?
                            </Text>
                                <TouchableOpacity onPress={() => navigation.navigate(Signup)}>
                                    <Text style={{ color: "#2A2AC0" }}> Sign up </Text>
                                </TouchableOpacity>
                                <Text>
                                    here
                            </Text>
                            </View>
                        </View>

                    </View>
                </ScrollView>

            </TouchableWithoutFeedback>

        </View>

    );
};

export default login;