import { icons } from "@/constants";
import React from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

interface SearchInputProps {
  placeholder?: string;
  onChangeText: ((text: string) => void) | undefined;
}

const SearchInput = ({ placeholder, onChangeText }: SearchInputProps) => {
  return (
    <View className="border border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={onChangeText}
        className="text-base mt-0.5 text-white flex-1 font-poppins-regular"
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
