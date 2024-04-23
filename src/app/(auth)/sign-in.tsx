import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import TextField from "@/components/TextField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleSubmit = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white mt-10 font-poppins-semibold">
            Log in to Aora
          </Text>

          <TextField
            title="Email"
            value={form.email}
            otherStyles="mt-5"
            keyboardType="email-address"
            onChangeText={(e) => setForm({ ...form, email: e })}
          />
          <TextField
            title="Password"
            value={form.password}
            otherStyles="mt-5"
            keyboardType="email-address"
            onChangeText={(e) => setForm({ ...form, password: e })}
          />

          <CustomButton
            containerStyles="mt-7"
            label="Sign In"
            isLoading={isSubmitting}
            onPress={handleSubmit}
          />

          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="text-lg text-gray-100 font-poppins-regular">
              Don't have an account?
            </Text>
            <Link
              href="/(auth)/sign-up"
              className="text-lg font-poppins-semibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
