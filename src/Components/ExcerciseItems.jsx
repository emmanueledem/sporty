import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";

const excerciseImage = require("../../assets/images/excercise12.jpg");
import workOutData from "../../excercise_data.json";
import { useNavigation } from "@react-navigation/native";

const ExcerciseItems = () => {
  const navigation = useNavigation();
  const renderWorkOutItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ExcerciseScreen", { item })}
    >
      <ImageBackground
        source={excerciseImage}
        className="h-36 w-40 rounded-2xl overflow-hidden mx-2 bg-red-900"
      >
        <View className="justify-between flex-1 m-3">
          <Text className="text-white font-medium tracking-widest ">
            {item.category}
          </Text>
          <Text className="text-white font-medium tracking-widest ">
            {item.title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
  const renderRow = ({ item, index }) => {
    if (index % 2 === 0) {
      const nextItem = workOutData[index + 1];
      return (
        <View className="flex-row flex-1 justify-around">
          {renderWorkOutItem({ item })}
          {nextItem && renderWorkOutItem({ item: nextItem })}
        </View>
      );
    }
  };

  return (
    <View style={{ minHeight: 200 }}>
      <FlashList
        data={workOutData}
        renderItem={renderRow}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        estimatedItemSize={200}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ExcerciseItems;
