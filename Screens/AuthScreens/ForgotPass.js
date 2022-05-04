import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from '@firebase/auth';
import { useNavigation } from '@react-navigation/core';
import React, {useState, useEffect} from 'react'
import firebase from "firebase/compat/app";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import {auth} from '../../firebase';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { NavigationContainer } from '@react-navigation/native';
import DismissKeyBoard from '../../components/DismissKeyboard';

const ForgotPass = () => {

    const [email, setEmail] = useState("");
    const auth = getAuth();
    const navigation = useNavigation();

    const sendReset =()=> {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('email sent! Check your email')
        }).catch((error) => {

        })
    }

    const backLogin = () => {
        navigation.navigate("Log In or Sign Up")
    }

  return (
    <DismissKeyBoard>
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
>
    <View style={styles.inputContainer}>
        <Text style={styles.su}>Reset Password</Text>
      
        <TextInput 
            placeholder="Email"
            value={email}
            onChangeText={text => {setEmail(text)}}
            style={styles.input}
            
        />
    </View>

    <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={sendReset}
            style={styles.button}
        >
            <Text style={styles.buttonTextL}>Send Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={backLogin}
            style={styles.button}
        >
            <Text style={styles.buttonTextL}>Back</Text>
        </TouchableOpacity>
    </View>
</KeyboardAvoidingView>
</DismissKeyBoard>
  )
}

export default ForgotPass

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
        
        marginTop: "10%",
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
        padding: '2%',
        borderRadius: 40,
        alignItems: 'center',
        backgroundColor: '#FFBE48',
        marginBottom: '2%',
        borderStyle: 'solid',
        borderColor: '#FFBE48',
        borderWidth: 1,
        // marginTop: '15%'
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