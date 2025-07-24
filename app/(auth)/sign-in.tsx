import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSSO } from '@clerk/clerk-expo';
import { useUser } from '@clerk/clerk-expo';


export default function SignIn() {
  const router = useRouter();
  const { startSSOFlow } = useSSO();
  const { user, isSignedIn } = useUser();

  const handleSSO = async (strategy: 'oauth_google' | 'oauth_apple') => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: undefined,
      });
      
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });

        router.replace('/');
      }
    } catch (err) {
      console.error('SSO Error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign in" }} />
      
      <Text style={styles.title}>Sign in</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handleSSO('oauth_google')}
      >
        <Image 
          source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }} 
          style={styles.logo} 
        />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handleSSO('oauth_apple')}
      >
        <Image 
          source={{ uri: 'https://developer.apple.com/assets/elements/icons/sign-in-with-apple/sign-in-with-apple.svg' }} 
          style={styles.logo} 
        />
        <Text style={styles.buttonText}>Continue with Apple</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#dadce0',
    marginBottom: 16,
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  buttonText: {
    color: '#3c4043',
    fontSize: 16,
    fontWeight: '500',
  },
});