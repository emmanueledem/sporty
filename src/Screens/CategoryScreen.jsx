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
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import BackButton from "../Components/BackButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Audio } from "expo-av";
import ExcerciseData from "../../excercise_data.json";
const conuntDownAudio = require("../../assets/audio/countdownaudio.mp3");

const CategoryScreen = () => {
  const route = useRoute();
  const { item } = route.params;

  const initialTime = 60;
  const minTime = 10;

  const [time, setTime] = useState(initialTime);
  const [isRunning, setisRunning] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [countdownSound, setcountdownSound] = useState();
  const [excercises, setExcercises] = useState([]);
  const [categoryExcercises, setCategoryExcercises] = useState([]);
  const [excerciseIndex, setExcerciseIndex] = useState(0);

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });
  });

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(conuntDownAudio);
    setcountdownSound(sound);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsAudioPlaying(false);
      }
    });

    await sound.playAsync().then(() => {
      setIsAudioPlaying(true);
    });
  }

  const _handleDecreaseTime = () => {
    if (!isRunning && time > minTime) {
      setTime((prevTime) => prevTime - 10);
    }
  };

  const _handleIncreaseTime = () => {
    if (!isRunning) {
      setTime((prevTime) => prevTime + 10);
    }
  };

  const _handleReset = () => {
    if (isRunning) {
      setisRunning(false);
      setIsFirstTime(true);
      setTime(initialTime);
    } else if (time == 0) {
      setisRunning(false);
      setIsFirstTime(true);
      setTime(initialTime);
    }
    if (countdownSound && isAudioPlaying) {
      countdownSound.stopAsync();
      setIsAudioPlaying(false);
    }
  };

  const _handlePause = () => {
    if (isRunning) {
      setisRunning(false);
    }
  };

  const _handleStart = () => {
    if (!isRunning && isFirstTime) {
      setIsFirstTime(false);
      setisRunning(true);
    } else {
      setisRunning(true);
    }
  };

  const fetchExcerciseByTitle = async () => {
    const storageRef = ref(storage, `${item.title}Excercises`);
    try {
      if (!ExcerciseData) {
        console.error("ExcerciseData is undefined or not initialized");
        return; // or handle the error appropriately
      }
      const matchingExcercises = [];
      listAll(storageRef).then((res) => {
        res.items.forEach((element) => {
          const fileName = element.name.split("/").pop();

          const matchingExcercise = ExcerciseData.find(
            (excercise) => excercise.gif_url === fileName
          );

          if (matchingExcercise) {
            matchingExcercises.push(matchingExcercise);
          }
        });
        setExcercises(matchingExcercises);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExcerciseByTitle();
  }, []);

  const fetchGifUrl = async (excercise) => {
    try {
      const storageRef = ref(
        storage,
        `${item.title}Excercises/${excercise.gif_url}`
      );
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.log("error= ", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchGifUrlsForExcercises = async () => {
      const excerciseWithGifUrl = await Promise.all(
        excercises.map(async (excercise) => {
          const gifUrl = await fetchGifUrl(excercise);
          return {
            ...excercise,
            gif_url: gifUrl,
          };
        })
      );
      setCategoryExcercises(excerciseWithGifUrl);
    };
    fetchGifUrlsForExcercises();
  }, [excercises]);

  const currentExcercise = categoryExcercises[excerciseIndex];

  useEffect(() => {
    let countDownInterval;
    if (isRunning && time > 0) {
      countDownInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);

        if (time == 4) {
          console.log("here");
          playSound();
        }
      }, 1000);
    } else {
      setisRunning(false);
      clearInterval(countDownInterval);
    }

    return () => {
      clearInterval(countDownInterval);
    };
  }, [isRunning, time]);

  return (
    <View className="flex-1">
      {currentExcercise ? (
        <>
          <Image
            className="h-80 w-full"
            source={{ uri: currentExcercise.gif_url }}
          />
          <BackButton />
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="mt-4 mx-3"
          >
            <View>
              <Text className="text-center mb-1 font-bold text-2xl">
                {currentExcercise.title}
              </Text>
              <View className="flex-row">
                {currentExcercise.category.split(",").map((cat, index) => (
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
                  {currentExcercise.intensity}
                </Text>
              </View>
              <Text className="text-xl mt-4 font-semibold  ">
                Instructions:
              </Text>
              <View>
                {currentExcercise.instructions.map((instructions) => (
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
              <TouchableOpacity
                onPress={_handleDecreaseTime}
                className="justify-center items-center bg-red-500 w-14 h-14 j rounded-full "
              >
                <Text className="text-white text-5xl">-</Text>
              </TouchableOpacity>
              <Text className="text-xl font-bold">{time} secs</Text>
              <TouchableOpacity
                onPress={_handleIncreaseTime}
                className="justify-center items-center bg-green-500 w-14 h-14 j rounded-full"
              >
                <Text className="text-white text-5xl">+</Text>
              </TouchableOpacity>
            </View>
            <View className="mt-4 flex-row items-center justify-center space-x-4 mb-10 ">
              <TouchableOpacity
                disabled={excerciseIndex === 0}
                className={` ${excerciseIndex === 0 ? "opacity-50" : ""}`}
                onPress={() => setExcerciseIndex(excerciseIndex - 1)}
              >
                <AntDesign name="leftcircleo" size={35} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={isRunning ? _handlePause : _handleStart}
                delayLongPress={time == 0}
              >
                <Text
                  style={{
                    borderColor: "blue",
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                  className={`text-blue-500 text-xl py-2 px-4 ${
                    time === 0 ? "opacity-50" : ""
                  }`}
                >
                  {isRunning ? "PAUSE" : "START"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={_handleReset}>
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
              <TouchableOpacity
                disabled={excerciseIndex === categoryExcercises.length - 1}
                className={` ${
                  excerciseIndex === categoryExcercises.length - 1
                    ? "opacity-50"
                    : ""
                }`}
                onPress={() => setExcerciseIndex(excerciseIndex + 1)}
              >
                <AntDesign name="rightcircleo" size={35} color="black" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      ) : (
        <View className=" flex-1 w-full h-80 items-center justify-center ">
          <ActivityIndicator size={"large"} color={"gray"} />
        </View>
      )}
    </View>
  );
};

export default CategoryScreen;
