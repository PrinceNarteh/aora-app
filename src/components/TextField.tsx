import { icons } from "@/constants";
import React, { useState } from "react";
import {
  Image,
  KeyboardType,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface TextFieldProps {
  title: string;
  value?: string;
  placeholder?: string;
  keyboardType?: KeyboardType | undefined;
  otherStyles?: string;
  onChangeText?: ((text: string) => void) | undefined;
}

const TextField = ({
  keyboardType,
  title,
  value,
  placeholder,
  otherStyles,
  onChangeText,
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-gray-100 font-poppins-medium text-base">
        {title}
      </Text>

      <View className="w-full h-16 bg-black-100 px-4 rounded-2xl border-2 focus:border-secondary items-center flex-row">
        <TextInput
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholderTextColor="#7B7B8B"
          secureTextEntry={title.toLowerCase() === "password" && !showPassword}
          className="flex-1 text-white font-poppins-semibold text-base"
        />

        {title.toLowerCase() === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="h-6 w-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextField;
