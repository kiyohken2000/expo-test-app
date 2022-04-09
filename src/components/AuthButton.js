import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { colors } from '../theme'
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native";

export default function AuthButton() {
  const navigation = useNavigation()

  const onButtonPress = async() => {
    const isAuth = await LocalAuthentication.hasHardwareAsync()
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync()
    console.log('デバイスが生体認証を利用できる', isAuth)
    console.log('デバイスに生体認証情報が保存されている', savedBiometrics)
    if(!isAuth || !savedBiometrics) {
      Alert.alert('生体認証が利用できません')
    } else {
      const result = await handleBiometricAuth()
      if(result.success) {
        navigation.navigate('Details', { from: 'Home' })
      } else {
        Alert.alert('認証に失敗しました')
      }
    }
  }

  const handleBiometricAuth = async() => {
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: '生体情報で支払い',
      cancelLabel: 'キャンセル',
      disableDeviceFallback: false
    })
    return biometricAuth
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onButtonPress()}
    >
      <Text style={styles.label}>認証</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.darkPurple,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  label: {
    fontSize: 17,
    color: '#ffffff'
  }
})