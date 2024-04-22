import icons from "@constants/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";

interface TabIconProps {
  name: string;
  icon: ImageSourcePropType | undefined;
  color: string;
  focused: boolean;
}

const TabIcon = ({ color, focused, icon, name }: TabIconProps) => {
  return (
    <View>
      <Image source={icon} />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="Home"
              color={color}
              focused={focused}
              icon={icons.home}
            />
          ),
        }}
      />
      <Tabs.Screen name="bookmark" options={{ title: "Bookmark" }} />
      <Tabs.Screen name="create" options={{ title: "Create" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};

export default TabsLayout;
