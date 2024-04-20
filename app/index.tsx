import { Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

const App = () => {
  return (
    <View className="flex-1 justify-center items-center ">
      <Text className="text-3xl">Aora</Text>
      <Link href="/profile" style={{ color: "blue" }}>
        Profile
      </Link>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
