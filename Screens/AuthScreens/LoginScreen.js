import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth } from '@firebase/auth';
import { useNavigation } from '@react-navigation/core';
import React, {useState, useEffect} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import {auth} from '../../firebase';
import DismissKeyBoard from '../../components/DismissKeyboard';

const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const navigation = useNavigation();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
              navigation.replace("HomeScreen")
            }
          })
    }, [])

    const goBack = () => {
        navigation.navigate("Log In or Sign Up");
    }
    const handleLogin = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password); 
            console.log(user);
        } catch (error) {
            alert("Wrong email or password. Try again.")
        }
    }



    return (
      <DismissKeyBoard>
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <Text style={styles.su}>Log In!</Text>
              
                <TextInput 
                    placeholder="Email"
                    value={email}
                    onChangeText={text => {setEmail(text)}}
                    style={styles.input}
                    
                />
                
                <TextInput 
                    placeholder="Password"
                    value={password}
                    onChangeText={text => {setPassword(text)}}
                    style={styles.input}
                    secureTextEntry
                    
                />
            
            </View>
            {/* <View style={styles.lineContainer}>
          <View style={{flex: 1, height: 1, backgroundColor: '#FFBE48'}} />
              <View>
                <Text style={{width: 50, textAlign: 'center'}}>Or</Text>
              </View>
           <View style={{flex: 1, height: 1, backgroundColor: '#FFBE48'}} />
          </View> */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonTextL}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        </DismissKeyBoard>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      },
      inputContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
      },
      input: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        
        marginTop: 5,
        marginBottom: 10,
        width: '95%',
        borderStyle: 'solid',
        borderBottomColor: '#FFBE48',
        borderBottomWidth: 1,
        borderColor: 'black',
        opacity: 50
      },
      buttonContainer: {
        width: '83%',
        justifyContent: 'center',
        alignItems: 'center',
        
        // marginTop: 40,
      },
      buttonOther: {
        display: 'flex',
        width: '100%',
        padding: '4%',
        borderRadius: 40,
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: '2%',
        borderStyle: 'solid',
        borderColor: '#FFBE48',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // margin: 2
      },
      button: {
        width: '100%',
        padding: '5%',
        borderRadius: 40,
        alignItems: 'center',
        backgroundColor: '#FFBE48',
        marginBottom: '2%',
        borderStyle: 'solid',
        borderColor: '#FFBE48',
        borderWidth: 1,
        marginTop: '15%'
      },
      buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#FFBE48',
        borderWidth: 2,
      },
      buttonText: {
        color: '#FFBE48',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonTextL: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
      },
      su: {
        marginBottom: 30,
        fontSize: 24,
        fontWeight: 'bold',
      },
      lineContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        // flex: 1,
        width: '85%',
        marginTop: '5%',
        marginBottom: '5%',
        opacity: 0.5,

      },
      logo: {
        height: 20,
        width: 20
      }
})
