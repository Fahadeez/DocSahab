import React, { 
                useState, 
                useContext 
    } from 'react';
import { 
        Text, 
        View, 
        TextInput, 
        TouchableOpacity, 
        Image, 
        ScrollView, 
        TouchableWithoutFeedback, 
        Keyboard  
    } from 'react-native';
import HeaderView from '../../../src/components/headerView';
import { globalStyles } from '../../styles/globalStyles';
import Signup from './signup';
import ForgetPassword from './ForgetPassword';
import { useNavigation } from '@react-navigation/native';
import { 
        useForm, 
        Controller 
    } from 'react-hook-form';
import { Context as AuthContext } from '../../context/AuthContext';

const login = () => {
    const navigation = useNavigation();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { state, signIn } = useContext(AuthContext);
    console.log(state);

    // for useForm
    const { control, handleSubmit, errors } = useForm();

    // for context function
    const onSignIn = () => signIn({ 
        email, password 
    })

    // ref for onfocus
    const emailInputRef = React.useRef();
    const passwordInputRef = React.useRef();

    // show error after and before
    console.log('Errors if any: ', errors);

    return (

        <View style={ globalStyles.containerColor }>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <ScrollView 
                    style={globalStyles.scrollView}
                    showsVerticalScrollIndicator ={false}
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
                        <Image source={require('../../../assets/docsahab.png')} style = {{height: 150, width: 150}} />
                    </View>

                    <HeaderView titletxt='Welcome'/>
                                    
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
                            render={(props, {onBlur}) => (
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
                            render={(props) => (
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
                                    value={password}
                                    ref ={passwordInputRef}
                                />
                            )
                            }
                        />
                    </View>
                    {errors.password && <Text style={globalStyles.errorText}>Password is required</Text>}
                                    
                    <View style={ { alignSelf: 'flex-end', right: 25 } }>
                        <TouchableOpacity onPress={() => navigation.navigate(ForgetPassword)}>
                            <Text style={globalStyles.forgetPassLinkTxt}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/* after react hook form applied its not working */}
                    {state.errorMessage ? (
                        <View style={globalStyles.inputText}>
                            <Text style={globalStyles.errorText}>{state.errorMessage}</Text>
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

                    <TouchableOpacity 
                        style={globalStyles.Button}
                        onPress={() => navigation.navigate('dashboard')}
                    >
                        <Text style={globalStyles.buttonTxt}>Dashboard</Text>
                    </TouchableOpacity>
                                    
                    <View style={ { marginTop: '15%', marginBottom: '5%' } }>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>
                                Doesn't have account?
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate(Signup)}>
                                <Text style={{color: "#2A2AC0"}}> Sign up </Text>
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