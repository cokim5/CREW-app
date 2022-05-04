import { signOut } from '@firebase/auth'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState, FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import { auth } from '../firebase'
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { requireNativeViewManager } from 'expo-modules-core'
import { Ionicons } from '@expo/vector-icons'; 
import AppLoading from 'expo-app-loading';
import { SimpleLineIcons } from '@expo/vector-icons';
import {
  useFonts,
  Nunito_200ExtraLight,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light_Italic,
  Nunito_400Regular_Italic,
  Nunito_500Medium_Italic,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold_Italic,
  Nunito_900Black_Italic,
} from '@expo-google-fonts/nunito';

const HomeScreen = () => {
  let [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light_Italic,
    Nunito_400Regular_Italic,
    Nunito_500Medium_Italic,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold_Italic,
    Nunito_900Black_Italic,
  });
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    try {
      const db = getDatabase();
      var userId = getAuth().currentUser.uid;
      const nameRef = ref(db, 'users/' + userId);
      onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        setName(data.name)
    });
  } catch (error) {
    console.log(error);
  }
}, [])


  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.navigate("Log In or Sign Up");
      console.log('success');
    })
  }

  const navigateToQUIZ = () => {
    navigation.navigate("Ready")
  }

  const navigateToRoomCreation = () => {
    navigation.navigate("RoomCreation");
  }


  if (!fontsLoaded) {
    return <AppLoading />
  } else {
  return (
    <View style={styles.view}>
      <TouchableOpacity
        onPress={handleSignOut}
        style={{top: 65, left: 30, position: 'absolute'}}
      >
        <SimpleLineIcons name="logout" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.textView}>
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop:'10%'}}>
        <Text style={{fontSize:20}}>WELCOME TO <Text style={{fontSize:20, fontWeight:'bold'}}>CREW!</Text></Text>
        </View>
        <View style={styles.imageView}>
          <Image source={require('../assets/CrewLogo.png')} style={styles.logo}></Image>
        </View>
      </View>
      <View style={{flexDirection:'column', justifyContent: 'center', alignItems:'center', marginBottom: '20%'}}>
        <View style={styles.buttonView}>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={navigateToQUIZ}
            style={styles.button}
          >
            <Ionicons name="person" size={65} color="#FFBE48" />
          </TouchableOpacity>
          <Text style={{fontFamily:'Nunito_700Bold', fontSize: 15, marginTop: '8%'}}>Solo mission!</Text>
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={navigateToRoomCreation}
            style={styles.button}
          >
            <Ionicons name="people" size={65} color="#FFBE48" />
          </TouchableOpacity>
          <Text style={{fontFamily:'Nunito_700Bold', fontSize: 15, marginTop: '8%'}}>With my CREW!</Text>
          </View>
        </View>
      </View>
    </View>




  )
}
}

export default HomeScreen

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FFD73F',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageView: {
    // backgroundColor: 'blue',
    width: '20%',
    height: '130%',

  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  buttonView: {
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: '5%',
    // marginLeft: '2%'
    marginRight: '5%'
  },
  button: {
    // width: '80%',
    padding: '23%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0, 0.6)',
    shadowOffset: { height: 3.5,  },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
    // fontFamily: OpenSans_SemiBold,
  },

  logo: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }

})


