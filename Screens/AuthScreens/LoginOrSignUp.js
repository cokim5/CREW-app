import React, {useEffect} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import {useFonts} from "expo-font"
import {AppLoading} from "expo"
import {auth} from '../../firebase';


const LoginOrSignUp = () => {

    const navigation = useNavigation();

    useEffect(() => {
      auth.onAuthStateChanged(user => {
          if (user) {
            navigation.replace("HomeScreen")
          }
        })
  }, [])


    const navigateToLogin = () => {
        navigation.navigate("Login"); 
      }

    const navigateToSignUp =() => {
        navigation.navigate("SignUp")
    }

    const forgotPass =() => {
      navigation.navigate("ForgotPass");
    }
    return (
        <View style ={styles.container}>
        <Image source={require('../../assets/questionArt.png')} style={styles.image}/>
        <Text style={{fontSize: 22, fontWeight: '300'}}>WELCOME TO  <Text style={{fontSize:25, fontWeight: 'bold'}}>CREW!</Text> </Text>
        <View style={styles.loginContainer}>
        <Text style={styles.subText}>
          By clicking Log In or Sign Up, you agree to our Terms. Learn how we process your data in our Privacy Policy and Cookies Policy
        </Text>
        <TouchableOpacity
        onPress={navigateToLogin}
        style={styles.button}
        >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToSignUp}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={forgotPass}
      >
        <Text style={styles.fp}>Forgot Password?</Text>
      </TouchableOpacity>
      </View>
        </View>
    )
}

export default LoginOrSignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFD73F'
      },
      image: {
        width: 300,
        height: 300,
        marginBottom: '10%'
      },
      loginContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '23%',
        width: '100%',
      },
      title: {
        fontSize: 30,
        // color: colors.black,
        textAlign: 'center',
        // fontFamily: 'OpenSans-Bold',
        marginHorizontal: 60,
        // fontFamily: 'OpenSans_SemiBold',
        marginTop: 20,
      },
      subText: {
        textAlign: 'center',
        fontSize: 10,
        width: '75%',
        marginBottom: "5%",
        lineHeight: 15
      },
      buttonText: {
        color: '#FFD73F',
        fontWeight: '700',
        fontSize: 20,
        // fontFamily: OpenSans_SemiBold,
      },
      fp: {
        fontSize: 16,
        color: "#AAAAAA"
      },
      button: {
        width: '80%',
        padding: 14,
        borderRadius: 40,
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: '3%'
      }

})
