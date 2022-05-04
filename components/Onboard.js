import React, {useState, useEffect} from 'react';
import {Animated, View, Text, StyleSheet, StatusBar, Image, TouchableOpacity} from 'react-native';
import * as MdIcons from "react-icons/md"
import AppIntroSlider from 'react-native-app-intro-slider';


const data = [
  {
    title: 'WELCOME TO FROSTY!',
    text: 'An AI Chat Bot Fit To Guide You In A More Enjoyable Campus Life: Frosty',
    image: require('../assets/images/frosty_!!_❄️.png'),
    backgroundColor: '#59b2ab'
  },
  {
    title: ' EAT.',
    text: 'Directing You To The Best Food Near You!',
    image: require('../assets/images/frosty_going_to_restaurant_.png'),
    backgroundColor: '#012a4a'
  },
  {
    title: ' STUDY.',
    text: 'Find Your Next New & Refreshing Study Spots',
    image: require('../assets/images/frosty_studying_.png'),
    backgroundColor: '#012a4a'
  },
  {
    title: ' CONNECT.',
    text: 'Meet Like Minded Individuals',
    image: require('../assets/images/frosty_and_his_friend.png'),
    backgroundColor: '#012a4a'
  },
];

const Onboard = (props) => {



  const renderItem = ({item}) => {
    return (
      <View style={styles.slide} >
        <View style={styles.ImageContainer}>
        <Image source={item.image} style={styles.image} />
        </View>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const keyExtractor = (item) => item.title;

  const renderNextButton = () => {
    return (
      <View style={styles.buttonContainer}>
      <View style={styles.bottomButton}>
        <Text style={styles.bottomButtonText}>Next</Text>
      </View>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.buttonContainer}>
      <View style={styles.bottomButtonL}>
        <Text style={styles.bottomButtonText}>Get Started</Text>
      </View>
      </View>
    );
  };

  const renderSkipButton = () => {
    return (
      <View style={styles.buttonContainer}> 
      <View style={styles.bottomButtonBot}>
        <Text style={styles.bottomButtonText}>Skip</Text>
      </View>
      </View>
    );
  };

  // const onSlideChange = () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // }

  const handleDone = () => {
    props.handleDone();
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={data}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        renderSkipButton={renderSkipButton}
        // onSlideChange={onSlideChange}
        // showSkipButton
        bottomButton
        onDone={handleDone}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 96,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    // color: colors.black,
    textAlign: 'center',
    // fontFamily: 'OpenSans-Bold',
    marginHorizontal: 60,
    fontWeight: "bold",
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    // color: colors.gray,
    textAlign: 'center',
    // fontFamily: 'OpenSans-SemiBold',
    marginHorizontal: 60,
    marginTop: 20,
    marginBottom: 50,
  },
  bottomButton: {
    width: '80%',
    padding: 15,
    borderRadius: 40,
    alignItems: 'center',
    backgroundColor: '#36649E',
    marginBottom: 110,
    marginTop: 0,
  },
  bottomButtonBot: {
    width: '80%',
    padding: 15,
    borderRadius: 40,
    alignItems: 'center',
    backgroundColor: '#36649E',
    marginBottom: 110,
  },
  bottomButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  bottomButtonL: {
    width: '80%',
    padding: 15,
    borderRadius: 40,
    alignItems: 'center',
    backgroundColor: '#36649E',
    marginBottom: 110,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  ImageContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    width: '70%',
    
    // backgroundColor: 'black'
    
  }
});

export default Onboard;