import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { useState } from "react";
export default function LoadingAnimation() {
  return (
    <View>
      <LottieView
        source={require("../json/loadingAnimation.json")}
        style={styles.animation}
        autoPlay
      />
    </View>
  );
}
const styles = StyleSheet.create({
  animation: {
    width: "100%",
    height: "100%",
    // alignSelf: 'center',

    
  },
});