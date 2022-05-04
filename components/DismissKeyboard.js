import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'

const DismissKeyBoard = ({ children }) => {
    return (  
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
    )
  }

export default DismissKeyBoard

const styles = StyleSheet.create({})