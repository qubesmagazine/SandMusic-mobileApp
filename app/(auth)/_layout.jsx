import { View, Text } from 'react-native'
import {Stack} from 'expo-router'
import {StatusBar} from 'expo-status-bar'

const AuthLayout = () => {
  return (
  <>
  <Stack>
    <Stack.Screen
    name="sign-in"
    options={{
      headerShown: false
    }}
    />
       <Stack.Screen
    name="sign-up"
    options={{
      headerShown: false
    }}
    />
          <Stack.Screen
    name="google-signup"
    options={{
      headerShown: false
    }}
    />
     <Stack.Screen
    name="microsoft-signup"
    options={{
      headerShown: false
    }}
    />
       <Stack.Screen
    name="apple-signup"
    options={{
      headerShown: false
    }}
    />
     <Stack.Screen
    name="likedSongs"
    options={{
      headerShown: false
    }}
    />
      <Stack.Screen
    name="song-infoscreen"
    options={{
      headerShown: false
    }}
    />
          <Stack.Screen
    name="topArtist-screen"
    options={{
      headerShown: false
    }}
    />
  </Stack>

  
  <StatusBar backgroundColor='#161622' style='light'/>
  </>
  )
}

export default AuthLayout