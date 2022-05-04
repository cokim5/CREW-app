import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from '@firebase/auth';
import { useNavigation } from '@react-navigation/core';
import React, {useState, useEffect} from 'react'
import firebase from "firebase/compat/app";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import {auth} from '../../firebase';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import DismissKeyBoard from '../../components/DismissKeyboard';

const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const database = getDatabase();

    const navigation = useNavigation();

    // useEffect(() => {
    //     auth.onAuthStateChanged(user => {
    //         if (user) {
    //           navigation.replace("Home")
    //         }
    //       })
    // }, [])

    // const handleGoogle = async () => {

    // }

    const handleSignUp = async () => {
      if (!(password === confirmPassword)) {
        alert("Passwords do not match!");
      } else {
          try {
              const user = await createUserWithEmailAndPassword(auth, email, password);
              var userId = getAuth().currentUser.uid;
              set(ref(database, 'users/' + userId), {
                name: "placeholder"
          })
              navigation.navigate("PersonalInfo");
          } catch (error) {
              alert("Please make sure all fields are inputted correctly")
          }
    }
  }

    return (
      <DismissKeyBoard>
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
            <Text style={styles.su}>Sign Up!</Text>
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
                <TextInput 
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={text => {setConfirmPassword(text)}}
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
                    onPress={handleSignUp}
                    style={styles.button}
                >
                    <Text style={styles.buttonTextL}>Next</Text>
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
        color: '#FFBE48',
        fontWeight: '700',
        fontSize: 16,
      },
      su: {
        marginBottom: 30,
        fontSize: 24,
        fontWeight: 'bold'
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