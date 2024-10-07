import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      className="absolute top-14 left-2"
    >
      <Ionicons name="arrow-back-outline" size={30} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;
