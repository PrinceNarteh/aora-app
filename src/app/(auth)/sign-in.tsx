import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import TextField from "@/components/TextField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { z } from "zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { ...methods } = useForm<FormData>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

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

          <FormProvider {...methods}>
            <TextField
              label="Email"
              name="email"
              otherStyles="mt-5"
              keyboardType="email-address"
            />
            <TextField label="Password" name="password" otherStyles="mt-5" />
          </FormProvider>

          <CustomButton
            containerStyles="mt-7"
            label="Sign In"
            isLoading={isSubmitting}
            onPress={methods.handleSubmit(onSubmit)}
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
