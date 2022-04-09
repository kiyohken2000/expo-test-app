import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../theme";
import * as GoogleSignIn from 'expo-google-sign-in';

export default function SignInWithGoogleButton() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    initAsync()
  }, [])

  const initAsync = async () => {
    await GoogleSignIn.initAsync({
      // You may ommit the clientId when the firebase `googleServicesFile` is configured
      clientId: '852442919227-r196bdcg2kts1rf910i1gml4voctjm6j.apps.googleusercontent.com',
    });
    syncUserWithStateAsync();
  };

  const syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    setUser(user)
    console.log('syncUserWithStateAsync:', user)
  };

  const signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    setUser(null)
    console.log('signOutAsync')
  };

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        syncUserWithStateAsync();
        console.log('signInAsync', user)
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  const onButtonPress = () => {
    if (user) {
      signOutAsync();
    } else {
      signInAsync();
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onButtonPress()}
    >
      {!user?
        <Text style={styles.label}>Sign in with Google</Text>
        :
        <Text style={styles.label}>Sign out with Google</Text>
      }
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