import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import TextField from "@/components/TextField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z.string().min(2, "Username to short"),
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = {
  username: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { ...methods } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSubmitting(true);
    try {
      await createUser(data);
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setSubmitting(false);
    }
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
          <Text className="text-2xl text-white mt-5 font-poppins-semibold">
            Sign Up to Aora
          </Text>

          <FormProvider {...methods}>
            <TextField
              label="Username"
              name="username"
              otherStyles="mt-10"
              keyboardType="email-address"
            />

            <TextField
              label="Email"
              name="email"
              otherStyles="mt-5"
              keyboardType="email-address"
            />

            <TextField
              label="Password"
              name="password"
              otherStyles="mt-5"
              keyboardType="email-address"
            />
          </FormProvider>

          <CustomButton
            containerStyles="mt-7"
            label="Sign Up"
            isLoading={isSubmitting}
            onPress={methods.handleSubmit(onSubmit)}
          />
          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="text-lg text-gray-100 font-poppins-regular">
              Already have an account?
            </Text>
            <Link
              href="/(auth)/sign-in"
              className="text-lg font-poppins-semibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
