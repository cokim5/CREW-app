import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/core'
import { getDatabase, ref, set, get, child, onValue, push } from "firebase/database";
import { useEffect } from 'react/cjs/react.development';
import { getAuth } from "firebase/auth";


const Ready = () => {

  let today = new Date();
  let dayOf = today.getDay();
  var weekday=new Array(7);
  weekday[0]="sunday";
  weekday[1]="monday";
  weekday[2]="tuesday";
  weekday[3]="wednesday";
  weekday[4]="thursday";
  weekday[5]="friday";
  weekday[6]="saturday";
  
  
  const isFocused = useIsFocused();
  const [questions, setQuestions] = useState("");
  const [day, setDay] = useState(weekday[dayOf]);
  const [questionSet, setQuestionSet] = useState();
  const[result, setResult] = useState([]);
  const [personName, setPersonName] = useState("");

  useEffect(() => {
    if (isFocused) {
    try {
      const db = getDatabase();
      const nameRef = ref(db, 'quiz/' + day);
      var userId = getAuth().currentUser.uid;
      const nRef = ref(db, 'users/' + userId);
      onValue(nRef, (snapshot) => {
        const data = snapshot.val();
        setPersonName(data.name.split(" ")[0].toUpperCase());
    });
      onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        setQuestionSet(data);
    });
  } catch (error) {
    console.log(error);
  }
  setResult({
    Q1: null,
    Q2: null,
    Q3: null,
    QSet: questionSet,
  })
  }

  console.log(questionSet);
  console.log(result);
  }, [questionSet], [result])

    const navigation = useNavigation();
    const navigateToQ1 = () => {
      navigation.navigate("Q1", result);
    }
    const navigateToHome = () => {
      navigation.navigate("HomeScreen");
    }
    const callBack = () => {
      console.log('hi')
    }

  return (
    <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
      <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '60%'}}>
      <Text style={{fontSize: 25, textAlign: 'center', lineHeight: 35}}>ARE YOU READY TO <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>PLAY</Text> {personName}?</Text>
      <TouchableOpacity
        onPress={navigateToQ1}
        style={styles.button}
      >
        <Text style={styles.buttonText}>LET'S PLAY</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToHome}
      >
        <Text style={{fontSize: 15}}>Back</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default Ready

const styles = StyleSheet.create({
  button: {
    width: '80%',
    padding: 10,
    borderRadius: 40,
    alignItems: 'center',
    backgroundColor: '#FFD73F',
    marginBottom: '3%',
    marginTop: '30%'
  },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 15,
        // fontFamily: OpenSans_SemiBold,
      },
})