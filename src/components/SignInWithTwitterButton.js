import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { colors } from "../theme";
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import Constants from 'expo-constants';

Constants.manifest.originalFullName = '@votepurchase/expo-test-app';

const useProxy = Platform.select({ web: false, default: true });

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://twitter.com/i/oauth2/authorize",
  tokenEndpoint: "https://twitter.com/i/oauth2/token",
  revocationEndpoint: "https://twitter.com/i/oauth2/revoke",
};

export default function SignInWithTwitterButton() {

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'VGRUWFJWY0FDMkRvOFZySGpBYWk6MTpjaQ',
      redirectUri: makeRedirectUri({
        scheme: 'https://auth.expo.io/@votepurchase/expo-test-app',
        useProxy
      }),
      usePKCE: true,
      scopes: [
        "tweet.read",
      ],
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      }
  }, [response]);

  const onButtonPress = () => {
    promptAsync({ useProxy });
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onButtonPress()}
    >
      <Text style={styles.label}>Sign in with Twitter</Text>
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