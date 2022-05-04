import { StyleSheet, Text, View, TouchableOpacity, Touchable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/core';
import { getStorage, getDownloadURL, ref as sRef } from "firebase/storage";
import rData from '../../../json/thankYouGrace.json';
import AppLoading from 'expo-app-loading';
import { Svg } from 'expo';
import { getDatabase, ref, set, get, child, onValue, push } from "firebase/database";
import { NavigationContainer } from '@react-navigation/native';
import WaitingRoomAnimation from '../../../components/waitingRoomAnimation';

const DisplayBuffer = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const roomID = route.params.roomID;
    const [waitingForOthers, setWaitingForOthers] = useState(true);
    const [usersLeft, setUsersLeft] = useState(0);

    useEffect(() => {
        try {
            const db = getDatabase();
            // get and set totalUsers var
            var totalUsers = 0;
            const totalUsersRef = ref(db, 'lobby/' + roomID + '/users');
            get(totalUsersRef).then((snapshot) => {
                try {
                totalUsers = Object.keys(snapshot.toJSON()).length;
                } catch (error) {
                    console.log('useEffect' + error);
                }
            })
            // get and constantly update usersFinished var checking if it equals totalUsers each time
            const usersFinishedRef = ref(db, 'lobby/' + roomID + '/usersFinished');
            onValue(usersFinishedRef, (snapshot) => {
                try {
                var usersFinished = Object.keys(snapshot.toJSON()).length;
                } catch (error) {
                    console.log('useEffect2' + error);
                }
                setUsersLeft(totalUsers - usersFinished);
                if (usersFinished === totalUsers) {
                    console.log("DONE");
                    setTrueFalseValues(totalUsers);
                }

            })

        } catch (error) {

        }
    }, [])

    const setTrueFalseValues = (totalUsers) => {
        var values = {
            Q1: null,
            Q2: null,
            Q3: null,
            roomID: roomID
        }
        const db = getDatabase();
        // set speedValue
        try {
        const speedRef = ref(db, 'lobby/' + roomID + '/speedScore');
        get(speedRef).then((snapshot) => {
            try {
            var speedScore = Object.keys(snapshot.toJSON()).length;
            } catch (error) {
                console.log('speedref' + error);
            }
            console.log("Division speed " + speedScore / totalUsers);
            if ((speedScore / totalUsers) >= 0.5) {
                values.Q1 = true;
            } else {
                values.Q1 = false;
            }
            const moodRef = ref(db, 'lobby/' + roomID + '/moodScore');
            get(moodRef).then((snapshot) => {
                try {
                var moodScore = Object.keys(snapshot.toJSON()).length;
                } catch (error) {
                    console.log('mood' + error);
                }
                console.log("Division mood " + moodScore / totalUsers);
                if ((moodScore / totalUsers) >= 0.5) {
                    values.Q2 = true;
                } else {
                    values.Q2 = false;
                }
                const weatherRef = ref(db, 'lobby/' + roomID + '/weatherScore');
                get(weatherRef).then((snapshot) => {
                    try {
                    var weatherScore = Object.keys(snapshot.toJSON()).length;
                    } catch (error) {
                        console.log('weather' + error);
                    }
                    console.log("Division weather " + weatherScore / totalUsers);
                    if ((weatherScore / totalUsers) >= 0.5) {
                        values.Q3 = true;
                    } else {
                        values.Q3 = false;
                    }
                    set(ref(db, 'lobby/' + roomID + '/gameStatus'), false);
                    navigation.navigate("MultiplayerDisplayRes", values);
                })


            })
        })} catch (error) {

        }

        // set moodValue
        // const moodRef = ref(db, 'lobby/' + roomID + '/moodScore');
        // get(moodRef).then((snapshot) => {
        //     var moodScore = Object.keys(snapshot.toJSON()).length;
        //     console.log("Division mood " + moodScore / totalUsers);
        //     if ((moodScore / totalUsers) >= 0.5) {
        //         values.Q2 = true;
        //     } else {
        //         values.Q2 = false;
        //     }
        // })

        // set weatherValue
        // const weatherRef = ref(db, 'lobby/' + roomID + '/weatherScore');
        // get(weatherRef).then((snapshot) => {
        //     var weatherScore = Object.keys(snapshot.toJSON()).length;
        //     console.log("Division weather " + weatherScore / totalUsers);
        //     if ((weatherScore / totalUsers) >= 0.5) {
        //         values.Q3 = true;
        //     } else {
        //         values.Q3 = false;
        //     }
        // })

        // if (values.Q1 != null && values.Q2 != null && values.Q3 != null) {
        //     navigation.navigate("MultiplayerDisplayRes", values);
        // }

    }




    const goBack = () => {
        navigation.navigate("HomeScreen");
    }

    return (
        <View style={styles.background}>

            <View style={styles.animation}>
                <WaitingRoomAnimation />
            </View>


        </View>
    )
}

export default DisplayBuffer;

const styles = StyleSheet.create({
    background: {
        height: '100%',
        backgroundColor: '#FFD73F'
    },
    animation: {
        alignSelf: 'center',
        top: '25%',
        height: '40%',
        borderWidth: 10,
        borderColor: '#FFD73F'
    },

})
