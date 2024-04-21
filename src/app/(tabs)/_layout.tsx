import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs screenOptions={{ title: "Home" }} />
      <Tabs screenOptions={{ title: "Create" }} />
      <Tabs screenOptions={{ title: "Bookmark" }} />
      <Tabs screenOptions={{ title: "Profile" }} />
    </Tabs>
  );
};

export default TabsLayout;
