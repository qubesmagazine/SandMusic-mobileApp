import React from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import {icons} from '../../constants'
import { router } from 'expo-router';

export default function MicrosoftSignIn() {

  return (
    <SafeAreaView className='flex-1 bg-white items-center justify-center p-4'>
      <View className='w-full max-w-md'>
        <Image
          source={icons.microsoftIcon}
          className='w-24 h-24 mb-6 self-center'
          resizeMode="contain"
        />
        <Text className='text-3xl font-semibold mb-4 text-center'>Sign in</Text>
        <Text className='text-lg text-gray-600 mb-6 text-center'>with your Microsoft account</Text>
        <TextInput
          className='border border-gray-300 rounded-lg p-3 mb-4 m-2'
          placeholder="Email, phone, or Skype"
          keyboardType="email-address"
        />
        <TextInput
          className='border border-gray-300 rounded-lg p-3 mb-4 m-2'
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity className='bg-blue-600 rounded-lg p-3 mb-4 m-2'>
          <Text className='text-white text-center text-lg'>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-gray-100 rounded-lg p-3 flex-row items-center justify-center m-2'>
          <Image
            source={icons.microsoftIcon}
            className='w-5 h-5 mr-2'
            resizeMode="contain"
          />
          <Text className='text-gray-600 text-lg'>Create account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/sign-in')}>
          <Text className='text-blue-600 text-center text-lg mt-4'>Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
