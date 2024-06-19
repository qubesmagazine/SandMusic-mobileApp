import React from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import {icons} from '../../constants'
import { router } from 'expo-router';

export default function AppleSignIn() {

  return (
    <SafeAreaView className='flex-1 bg-white items-center justify-center p-4'>
      <View className='w-full max-w-md'>
        <Image
          source={icons.appleIcon1}
          className='w-16 h-16 mb-6 self-center'
          resizeMode="contain"
        />
        <Text className='text-3xl font-semibold mb-4 text-center'>Sign in with your Apple ID</Text>
        <TextInput
          className='border border-gray-300 rounded-lg p-3 mb-4 m-2'
          placeholder="Apple ID"
          keyboardType="email-address"
        />
        <TextInput
          className='border border-gray-300 rounded-lg p-3 mb-4 m-2'
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity className='bg-black rounded-lg p-3 mb-4 m-2'>
          <Text className='text-white text-center text-lg'>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-gray-100 rounded-lg p-3 flex-row items-center justify-center m-2'>
          <Image
             source={icons.appleIcon1}
            className='w-5 h-5 mr-2'
            resizeMode="contain"
          />
          <Text className='text-gray-600 text-lg'>Create Apple ID</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/sign-in')}>
          <Text className='text-blue-500 text-center text-lg mt-4'>Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}