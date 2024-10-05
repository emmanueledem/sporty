import { View, Text } from "react-native";
import React from "react";
import ExcerciseItems from "./ExcerciseItems";

const Excercise = () => {
  return (
    <View>
      <View className="flex-row justify-between items-center mx-10 mb-10 ">
        <Text className="font-bold text-xl ">Excercise</Text>
      </View>
      <ExcerciseItems />
    </View>
  );
};

export default Excercise;
