import { colors } from "@/constants";
import icons from "@constants/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

interface TabIconProps {
  name: string;
  icon: ImageSourcePropType | undefined;
  color: string;
  focused: boolean;
}

const TabIcon = ({ color, focused, icon, name }: TabIconProps) => {
  return (
    <View className="text-center items-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${
          focused ? "font-poppins-semibold" : "font-poppins-regular"
        } text-xs`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.secondary[100],
        tabBarInactiveTintColor: colors.gray[100],
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopWidth: 1,
          borderTopColor: colors.black[200],
          height: 84,
        },
      }}
    >
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
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="Bookmark"
              color={color}
              focused={focused}
              icon={icons.bookmark}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="Create"
              color={color}
              focused={focused}
              icon={icons.plus}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="Profile"
              color={color}
              focused={focused}
              icon={icons.profile}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
