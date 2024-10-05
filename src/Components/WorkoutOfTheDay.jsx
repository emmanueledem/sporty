import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";
import React from "react";
const wotd = require("../../assets/images/excercise1.avif");

const WorkoutOfTheDay = () => {
  let [fontsLoaded] = useFonts({
    Lato_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity className="items-center justify-center">
      <View className="rounded-3xl overflow-hidden h-40 w-[80%]">
        <ImageBackground
          source={wotd}
          className="flex-1 justify-center "
          resizeMode="cover"
          height={10}
          width={10}
        >
          <View className="items-center justify-center">
            <Text
              className="text-white/70  text-3xl tracking-tighter"
              style={{ fontFamily: "Lato_400Regular" }}
            >
              Workout Of The Day
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutOfTheDay;

const styles = StyleSheet.create({});
