import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { useNavigation } from '@react-navigation/core'
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getAuth } from "firebase/auth";
import DismissKeyBoard from '../../components/DismissKeyboard'
// Options data must contain 'item' & 'id' keys

// const MAJORS = [
//   {
//     item: 'Undecided',
//   },
//   {
//     item: 'Computer Science',
//   },
//   {
//     item: 'Engineering',
//   },
//   {
//     item: 'Business',
//   },
//   {
//     item: 'Communications',
//   },
//   {
//     item: 'Art',
//   },
//   {
//     item: 'History',
//   },
// ]
const YEAR = [
  {
    item: '1st Year',
  },
  {
    item: '2nd Year',
  },
  {
    item: '3rd Year',
  },
  {
    item: '4th Year',
  },
  {
    item: 'Graduate Student',
  },
]


function PersonalInfo() {
  const [year, setYear] = useState({});
  const [email, setEmail] = useState({});
  const [userName, setName] = useState("")
  const navigation = useNavigation();
  const db = getDatabase();

  var Filter = require('bad-words'),
    filter = new Filter();
  
  
  const addInfo = () => {
    if (filter.isProfane(userName)) {
      alert("NO PROFANITY");
      return;
    }
      var userId = getAuth().currentUser.uid;
       set(ref(db, 'users/' + userId), {
            name: userName,
            email: email,
            year: year,
      })
      navigation.navigate("HomeScreen");
  }

  return (
    <DismissKeyBoard>
    <View style={styles.container}>
      <View style={{ height: 40 }} />
      <View style={{ marginLeft: '5%', width: '90%', alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{ fontSize: 20, paddingBottom: 25, textAlign: 'center', fontWeight: 'bold' }}>Please Fill Out The Information Below.</Text>
      </View>
      <Text style={{ fontSize: 20, paddingBottom: 10, fontWeight: 'bold', textAlign: 'left',marginTop: '10%' }}>Name</Text>
      <View style={styles.nameContainer}>
          <TextInput 
            style={styles.name}
            placeholder="Enter your name"
            onChangeText={text => {setName(text)}}
            value={userName}
          />
      </View>
      {/* <View style={styles.inputContainer}> */}
      <Text style={{ fontSize: 20, paddingBottom: 10, fontWeight: 'bold', textAlign: 'left',marginTop: '10%' }}>University Email</Text>
      <View style={styles.nameContainer}>
          <TextInput 
            style={styles.name}
            placeholder="Enter your university email address"
            onChangeText={text => {setEmail(text)}}
            value={email}
          />
      </View>
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 20, paddingBottom: 10, fontWeight: 'bold' }}>Year</Text>
      <SelectBox
        options={YEAR}
        value={year}
        label="Select your year"
        arrowIconColor='#FFBE48'
        searchIconColor="#FFBE48"
        toggleIconColor="#FFBE48"
        multiOptionContainerStyle={{backgroundColor: '#FFBE48'}}
        onChange={onYChange()}
        hideInputFilter={false}
      />
      {/* </View> */}
      <View style={styles.buttonContainer}>
      <TouchableOpacity
          onPress={addInfo}
           style={styles.button}
      >
       <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      </View>
    </View>
    </DismissKeyBoard>
  )


  function onMChange() {
    return (val) => setMajor(val)
  }
  function onYChange() {
    return (val) => setYear(val)
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      margin: 30,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      marginLeft: '20%'
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
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    inputContainer: {
      justifyContent: 'flex-start',
      marginTop: '15%',
      marginBottom: '6%'
    },

    nameContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    name: {
        marginRight: 15,
        paddingVertical: 10,
        // marginTop: 5,
        // marginBottom: 10,
        width: '95%',
        borderStyle: 'solid',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        borderColor: 'black',
        opacity: 100
    },

})

export default PersonalInfo
