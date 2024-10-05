import React from "react";
import { ScrollView, View } from "react-native";
import Welcome from "../Components/Welcome";
import WorkoutOfTheDay from "../Components/WorkoutOfTheDay";
import { SafeAreaView } from "react-native-safe-area-context";
import Seperator from "../Components/Seperator";
import Category from "../Components/Category";
import Excercise from "../Components/Excercise";

const WorkoutScreen = () => {
  return (
    <SafeAreaView className="mx-[1%]">
      <Welcome />
      <ScrollView showsVerticalScrollIndicator={false}>
        <WorkoutOfTheDay />
        <Seperator />
        <Category />
        <Seperator />
        <Excercise />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutScreen;
