import { icons } from "@/constants";
import React, { useState } from "react";
import {
  UseControllerProps,
  useController,
  useFormContext,
} from "react-hook-form";
import {
  Image,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface TextFieldProps extends TextInputProps, UseControllerProps {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  otherStyles?: string;
}

const TextField = ({
  name,
  defaultValue,
  rules,
  label,
  placeholder,
  otherStyles,
  ...inputProps
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { field } = useController({ name, rules, defaultValue });
  const formContext = useFormContext();
  const {
    formState: { errors },
  } = formContext;

  if (!formContext || !name) {
    const msg = !formContext
      ? "TextInput must be wrapped by the FormProvider"
      : "Name must be defined";
    console.error(msg);
    return null;
  }

  return (
    <View className={`${otherStyles}`}>
      {Boolean(label) && (
        <Text className="text-gray-100 font-poppins-medium text-base mb-2">
          {label}
        </Text>
      )}

      <View className="w-full h-16 bg-black-100 px-4 rounded-2xl border-2 focus:border-secondary items-center flex-row">
        <TextInput
          value={field.value}
          onBlur={field.onBlur}
          placeholder={placeholder}
          onChangeText={field.onChange}
          placeholderTextColor="#7B7B8B"
          secureTextEntry={label?.toLowerCase() === "password" && !showPassword}
          {...inputProps}
          className="flex-1 text-white font-poppins-semibold text-base"
        />
        {label?.toLowerCase() === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="h-6 w-6"
            />
          </TouchableOpacity>
        )}
      </View>
      {errors[name]?.message && (
        <Text className="text-sm text-red-500 pl-2 font-poppins-regular mt-0.5 italic">
          {errors[name]?.message as string}
        </Text>
      )}
    </View>
  );
};

export default TextField;
