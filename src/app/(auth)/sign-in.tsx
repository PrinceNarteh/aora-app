import CustomButton from "@/components/CustomButton";
import TextField from "@/components/TextField";
import { images } from "@/constants";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalContext } from "context/GlobalProvider";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const { ...methods } = useForm<FormData>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSubmitting(true);
    try {
      await signIn(data);
      const res = await getCurrentUser();
      setUser(res);
      setIsLoggedIn(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/(tabs)/home");
    } catch (error: any) {
      Alert.alert("Error", error.message.replace("AppwriteException: ", ""));
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
