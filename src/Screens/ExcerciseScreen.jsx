import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../../firebase/config";
import { SafeAreaView } from "react-native-safe-area-context";

const ExcerciseScreen = () => {
  const route = useRoute();
  const { item } = route.params;

  const [gifUrl, SetgiftUrl] = useState(null);

  const fetchGifUrl = async () => {
    try {
      const storageRef = ref(storage, `excercises/${item.gif_url}`);
      const url = await getDownloadURL(storageRef);
      SetgiftUrl(url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGifUrl();
  }, []);

  return (
    <View className="flex-1">
      {gifUrl ? (
        <Image className="h-80 w-full" source={{ uri: gifUrl }} />
      ) : (
        <View className=" flex-1 items-center justify-center ">
          <ActivityIndicator size={"large"} color={"gray"} />
        </View>
      )}
      <ScrollView className="mt-4 mx-3">
        <View>
          <Text className="text-center mb-1 font-bold text-2xl">
            {item.title}
          </Text>
          <View className="flex-row">
            {item.category.split(",").map((cat, index) => (
              <View key={index} className="mr-2">
                <View className="bg-gray-300 px-2 rounded-2xl py-1 ">
                  <Text className="text-fuchsia-500 ">#{cat}</Text>
                </View>
              </View>
            ))}
          </View>
          <View className="flex-row space-x-2 mt-2">
            <Text className="text-blue-500 font-semibold ">Intensity:</Text>
            <Text className="text-cyan-400 italic text-base">
              {item.intensity}
            </Text>
          </View>
          <Text className="text-xl mt-4 font-semibold  ">Instructions:</Text>
          <View>
            {item.instructions.map((instructions) => (
              <View
                className="mt-2 flex-row items-start mb-2"
                key={instructions.step}
              >
                <Text className="text-base text-gray-600">
                  {instructions.step}.
                </Text>
                <Text className="ml-2 text-base ">{instructions.text}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className="mt-4 flex-row items-center space-x-4 justify-center">
          <TouchableOpacity className="justify-center items-center bg-red-500 w-14 h-14 j rounded-full ">
            <Text className="text-white text-5xl">-</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold">10 secs</Text>
          <TouchableOpacity className="justify-center items-center bg-green-500 w-14 h-14 j rounded-full">
            <Text className="text-white text-5xl">+</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-4 flex-row items-center justify-center space-x-4 mb-10 ">
          <TouchableOpacity>
            <Text
              style={{
                borderColor: "blue",
                borderWidth: 1,
                borderRadius: 5,
              }}
              className="text-blue-500 text-xl py-2 px-4"
            >
              START
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
              }}
              className="text-gray-500 text-xl py-2 px-4"
            >
              RESET
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ExcerciseScreen;
