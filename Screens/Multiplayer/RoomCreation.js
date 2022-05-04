import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/core'
import { getDatabase, ref, set, get, child, onValue, push, firebase } from "firebase/database";
import { useEffect } from 'react/cjs/react.development';
import { getAuth } from "firebase/auth";
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import DismissKeyBoard from '../../components/DismissKeyboard';
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
import { NavigationContainer } from '@react-navigation/native';

const RoomCreation = () => {
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
    const [personName, setPersonName] = useState("");
    const [roomID, setRoomID] = useState("");
    const navigation = useNavigation();
    var Filter = require('bad-words'),
    filter = new Filter();
    useEffect(() => {
        try {
            const db = getDatabase();
            var userId = getAuth().currentUser.uid;
            const nRef = ref(db, 'users/' + userId);
            onValue(nRef, (snapshot) => {
                const data = snapshot.val();
                setPersonName(data.name.split(" ")[0].toUpperCase());
            });
        } catch (error) {
            console.log(error);
        }

    }, [])

    const createRoom = (roomID) => {
        try {
            const db = getDatabase();
            set(ref(db, 'lobby/' + roomID), {
                users: {},
                speedScore: 0,
                moodScore: 0,
                weatherScore: 0,
                gameStatus: false,
                usersFinished: 0,
            })
            set(ref(db, 'lobby/' + roomID + '/users/' + 0), {
                personName
            })
            navigation.navigate("WaitingRoom", roomID);
        } catch (error) {
            console.log(error);
            alert("code is in use, try a different code");
        }
    }
    const checkRoomID = (roomID) => {
        if (filter.isProfane(roomID)) {
            alert("NO PROFANITY");
            return;
          }
        const dbRef = ref(getDatabase());
        get(child(dbRef, `lobby/${roomID}`)).then((snapshot) => {
            if (snapshot.exists()) {
                alert("Code already in use");
            } else {
                createRoom(roomID);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const joinRoom = (roomID) => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `lobby/${roomID}`)).then((snapshot) => {
            if (snapshot.exists() && !snapshot.val().gameStatus) {
                const db = getDatabase();
                const json = snapshot.toJSON();
                const users = json.users;
                const index = Object.keys(users).length;
                set(ref(db, 'lobby/' + roomID + '/users/' + index), {
                    personName
                })
                navigation.navigate("WaitingRoom", roomID);
            } else {
                if(!snapshot.exists()){
                    alert("Code doesn't exist!");
                } else {
                    alert("Game is already in session!");
                }
                
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const goBack = () => {
        navigation.goBack();
    }



    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <DismissKeyBoard>
            <View style={styles.background}>
                <TouchableOpacity
                onPress={goBack}
                style={{top: '5%', left: '5%'}}>
                    <Ionicons name="md-chevron-back" size={40} color="black" />
                </TouchableOpacity>
                <Text style={styles.label}>ENTER CODE:</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="e.g., 12345"
                    placeholderTextColor={'#AAA9A9'}
                    autoCorrect={false}
                    maxLength={5}
                    // textAlign="center"
                    onChangeText={text => { setRoomID(text) }}
                />

                <TouchableOpacity
                    style={styles.joinButton}
                    onPress={() => joinRoom(roomID)}
                >
                    <Text style={styles.buttonText}>JOIN</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => checkRoomID(roomID)}
                >
                    <Text style={styles.buttonText}>CREATE</Text>
                </TouchableOpacity>
            </View>
            </DismissKeyBoard>
        )
    }
}

export default RoomCreation;

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#FFD73F',
        height: '100%',
        flex: 1,
    },
    label: {
        top: '30%',
        alignSelf: 'center',
        fontFamily: 'Nunito_700Bold',
        fontSize: 20,
    },
    inputBox: {
        top: '33%',
        // borderWidth: 1,
        marginHorizontal: '20%',
        height: '7%',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        shadowColor: 'rgba(0,0,0, 0.6)',
        shadowOffset: { height: 3.5, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    joinButton: {
        top: '40%',
        marginHorizontal: '30%',
        height: '5%',
        borderRadius: 10,
        backgroundColor: '#FD9343',
        shadowColor: 'rgba(0,0,0, 0.6)',
        shadowOffset: { height: 3.5, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    createButton: {
        top: '42%',
        marginHorizontal: '30%',
        height: '5%',
        borderRadius: 10,
        backgroundColor: '#FD9343',
        shadowColor: 'rgba(0,0,0, 0.6)',
        shadowOffset: { height: 3.5, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    buttonText: { 
        alignSelf: 'center', 
        fontFamily: 'Nunito_700Bold', 
        top: '20%', 
        fontSize: 20, 
        color: '#FFFFFF' 
    },

})