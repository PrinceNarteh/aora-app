import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "context/GlobalProvider";
import { StatusBar } from "expo-status-bar";
import { images } from "@/constants";

const Home = () => {
  const { user } = useGlobalContext();
  console.log({ user });
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={[{ $id: "1" }]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Text>{item.$id}</Text>}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-center flex-row mb-6">
              <View>
                <Text className="font-poppins-medium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-poppins-semibold text-white">
                  {user.username}
                </Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  resizeMode="contain"
                  className="w-9 h-10"
                />
              </View>
            </View>
          </View>
        )}
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Home;
