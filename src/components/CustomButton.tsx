import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  isLoading?: boolean;
  textStyles?: string;
  containerStyles?: string;
}

const CustomButton = ({
  containerStyles,
  onPress,
  label,
  textStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text
        className={`text-primary font-poppins-semibold text-lg ${textStyles}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
