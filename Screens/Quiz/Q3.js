import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
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

const Q3 = () => {
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
    const [isTimerStart, setIsTimerStart] = useState(true);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(6000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [question, setQuestion] = useState("")
    const navigation = useNavigation();
    const route = useRoute();
    var questions = route.params.QSet.split(",");
    var q = questions[2];
    // useEffect (() => {
    //   console.log(questions);
      
    // }, [])

    const navigateToResT = () => {
        const progress = {
            Q1: route.params.Q1,
            Q2: route.params.Q2,
            Q3: true,
            QSet: route.params.QSet,
        }
        setIsTimerStart(false);
        navigation.navigate("Display", progress);
    }

    const navigateToResF = () => {
        const progress = {
            Q1: route.params.Q1,
            Q2: route.params.Q2,
            Q3: false,
            QSet: route.params.QSet,
        }
        setIsTimerStart(false);
        navigation.navigate("Display", progress);
    }
    const options = {
      container: {
        // backgroundColor: 'white',
        // padding: 5,
        // borderRadius: 5,
        // width: 220,
      },
      text: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
      }
    };
    if (!fontsLoaded) {
      return <AppLoading />
    } else {
  return (
    <View style={{flexDirection: "row", flex: 1}}>

      <TouchableOpacity
        onPress={navigateToResF}
        style={{width: '12%', backgroundColor: '#F4845F', height: '100%', justifyContent: 'center', alignItems: 'center'}}
      >
        <Feather name="x" size={30} color="white" />
      </TouchableOpacity>

      <View style={{width: '76%', backgroundColor: '#FFD73F',  height: '100%', flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
         <Timer
            totalDuration={timerDuration}
            msecs
            //Time Duration
            start={isTimerStart}
            //To start
            reset={resetTimer}
            //To reset
            options={options}
            //options for the styling
            handleFinish={() => {
              const progress = {
                Q1: route.params.Q1,
                Q2: route.params.Q2,
                Q3: false,
                QSet: route.params.QSet,
            }
              navigation.navigate("Display", progress)
            }}
            //can call a function On finish of the time
            // getTime={(time) => {
            //   console.log(time);
            // }}
          />
          <View style={styles.qContainer}>
            <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15, textAlign: 'center'}}>{q}</Text>
          </View>
          <Image source={require('../../assets/questionArt.png')} style={styles.image}></Image>
          <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15, marginTop: '10%', marginBottom: '25%'}}>Choose your side!</Text>
      </View>
      <TouchableOpacity
        onPress={navigateToResT}
        style={{width: '12%', backgroundColor: '#A7DCA9',  height: '100%', justifyContent: 'center', alignItems: 'center'}}
      >
        <Ionicons name="checkmark-sharp" size={32} color="white" />
      </TouchableOpacity>

    </View>
  )
}
}

export default Q3

const styles = StyleSheet.create({
    button: {
        width: '80%',
        padding: 16,
        borderRadius: 40,
        alignItems: 'center',
        backgroundColor: '#36649E',
        marginBottom: 15
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
        // fontFamily: OpenSans_SemiBold,
      },

      qContainer: {
        marginTop: '7%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: 'rgba(0,0,0, 0.6)',
        shadowOffset: { height: 3.5,  },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        width: "85%"
      },
      image: {
        height: 180,
        width: 180,
        marginTop: '5%'
      }
})