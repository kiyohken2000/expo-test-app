import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import * as AppleAuthentication from 'expo-apple-authentication';
import { colors } from "../theme";

export default function SignInWithAppleButton() {
  const [user, setUser] = useState('')

  useEffect(() => {
    const isVisible = async() => {
      const result = await AppleAuthentication.isAvailableAsync()
      console.log('result:', result)
    }
    return () => isVisible
  }, [])

  const onButtonPress = async() => {
    console.log(user.user)
    const result = await AppleAuthentication.getCredentialStateAsync(user.user)
    console.log(result)
  }

  return (
    <View>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE}
        cornerRadius={5}
        style={{ width: 200, height: 44 }}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            // signed in
            console.log(credential)
            setUser(credential)
          } catch (e) {
            if (e.code === 'ERR_CANCELED') {
              // handle that the user canceled the sign-in flow
              alert('user canceled')
            } else {
              // handle other errors
              alert('認証に失敗しました')
            }
          }
        }}
      />
      <View style={{paddingVertical: 10}} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => onButtonPress()}
      >
        <Text style={styles.label}>test</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
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