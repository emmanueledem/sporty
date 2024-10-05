import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const beginner = require("../../assets/images/excercise1.avif");
const balance = require("../../assets/images/excercise2.avif");
const gentle = require("../../assets/images/excercise3.avif");
const intense = require("../../assets/images/excercise5.jpg");
const moderate = require("../../assets/images/excercise6.jpg");
const Strength = require("../../assets/images/excercise7.avif");
const toning = require("../../assets/images/excercise8.jpg");

const WorkoutData = [
  { id: 1, imageSoure: beginner, numberOfExcercises: 9, title: "Beginner" },
  { id: 2, imageSoure: balance, numberOfExcercises: 7, title: "Balance" },
  { id: 3, imageSoure: gentle, numberOfExcercises: 5, title: "Gentle" },
  { id: 4, imageSoure: intense, numberOfExcercises: 8, title: "Intense" },
  { id: 5, imageSoure: moderate, numberOfExcercises: 23, title: "Moderate" },
  { id: 6, imageSoure: Strength, numberOfExcercises: 11, title: "Strength" },
  { id: 7, imageSoure: toning, numberOfExcercises: 10, title: "Toning" },
];

const CategoryItems = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <ImageBackground
        source={item.imageSoure}
        className="h-36 w-40 rounded-2xl overflow-hidden mx-2 bg-red-900"
      >
        <View className="justify-between flex-1 m-3">
          <View className="flex-row items-center space-x-1">
            <FontAwesome5 name="dumbbell" size={15} color="white" />
            <Text className="text-white font-Bold tracking-widest">
              {item.numberOfExcercises}
            </Text>
          </View>
          <Text className="text-white font-medium tracking-widest ">
            {item.title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={WorkoutData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoryItems;
