import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { icons } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import { Link } from 'expo-router';


const SignIn = () => {


  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    router.replace('/home')
        }


  const googleRoute = () => {
    router.push('/google-signup');
  };

  const appleRoute = () => {
    router.push('/apple-signup');
  };

  const microsoftRoute = () => {
    router.push('/microsoft-signup');
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to SAND</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-3">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account
            </Text>
            <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Sign Up</Link>
          </View>

          {/* Social Sign-In Icons */}
          <View className="flex-row justify-center gap-4 mt-20">
            <TouchableOpacity onPress={appleRoute}>
              <Image
                 source={icons.appleIcon}
                className="w-10 h-10"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={googleRoute}>
              <Image
               source={icons.googleIcon}
                className="w-10 h-10"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={microsoftRoute}>
              <Image
                source={icons.microsoftIcon}
                className="w-10 h-10"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignIn;
