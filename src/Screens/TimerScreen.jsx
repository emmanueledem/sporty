import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";

const TimerScreen = () => {
  const [roundDuration, setRoundDuration] = useState(60);
  const [restDuration, setRestDuration] = useState(3);
  const [numberOfRounds, setNumberofRounds] = useState(2);
  const [currentRound, setCurrentRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(roundDuration);
  const [isResting, setIsResting] = useState(false);

  const countDown = useRef(null);

  const startCountDown = () => {
    if (currentRound <= numberOfRounds) {
      setIsRunning(true);
      countDown.current = setInterval(() => {
        setTime((preVTime) => {
          if (preVTime === 0) {
            clearInterval(countDown.current);
            if (currentRound < numberOfRounds) {
              if (isResting) {
                setCurrentRound(currentRound + 1);
                setIsResting(false);
                return roundDuration;
              } else {
                setIsResting(true);
                return restDuration;
              }
            } else {
              setIsRunning(false);
              setIsResting(false);
              return 0;
            }
          }
          return preVTime - 1;
        });
      }, 1000);
    }
  };

  const pauseCountdown = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(countDown.current);
    }
  };

  const resetCountdown = () => {
    setCurrentRound(1);
    setIsRunning(false);
    setIsResting(false);
    clearInterval(countDown.current);
    setTime(roundDuration);
  };

  useEffect(() => {
    if (currentRound === numberOfRounds && time === 0) {
      clearInterval(countDown.current);
      setIsResting(false);
      setIsRunning(false);
      setTime(0);
      return;
    }
    if (isRunning && time === 0) {
      if (currentRound < numberOfRounds) {
        if (isResting) {
          setCurrentRound(currentRound + 1);
          setIsResting(false);
          setTime(roundDuration);
        } else {
          setIsResting(true);
          setTime(roundDuration);
        }
      } else {
        setIsRunning(false);
        setIsResting(false);
        setTime(0);
      }
    }
  }, [isRunning, time]);

  useEffect(() => {
    setTime(isResting ? restDuration : roundDuration);
  }, []);
  return (
    <View className="pt-[30%] items-center bg-gray-200 min-h-screen">
      <Text className="text-5xl mb-4">
        {isRunning
          ? isResting
            ? "Resting"
            : `Round ${currentRound}`
          : currentRound === 1 && time === roundDuration
          ? "Start"
          : currentRound === numberOfRounds && time === 0
          ? "Finished"
          : "Paused"}
      </Text>
      <Text className="text-5xl">{`${Math.floor(time / 60)}:${
        time % 60 < 10 ? "0" : ""
      }${time % 60}`}</Text>
      <View className="flex-row mt-4">
        <TouchableOpacity
          onPress={startCountDown}
          disabled={isRunning || currentRound > numberOfRounds}
          className="mx-4 bg-white px-4 py-1 rounded-lg "
        >
          <Text className="text-lg text-green-500">START</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!isRunning}
          onPress={pauseCountdown}
          className="mx-4 bg-white px-4 py-1 rounded-lg "
        >
          <Text className="text-lg text-red-500">PAUSE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={resetCountdown}
          // disabled={!isRunning}
          className="mx-4 bg-white px-4 py-1 rounded-lg "
        >
          <Text className="text-lg text-blue-500">RESET</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-8">
        <Text className="text-xl text-slate-500">Round Duration (seconds)</Text>
        <TextInput
          className="text-2xl text-neutral-950"
          value={roundDuration.toString()}
          onChangeText={(text) => {
            setRoundDuration(text);
          }}
          keyboardType="numeric"
          editable={!isRunning}
        />
        <Text className="text-xl text-slate-500">Rest Duration (seconds)</Text>
        <TextInput
          className="text-2xl text-neutral-950"
          value={restDuration.toString()}
          onChangeText={(text) => {
            console.log(text);
            setRestDuration(text);
          }}
          keyboardType="numeric"
          editable={!isRunning}
        />
        <Text className="text-xl text-slate-500">Number of Rounds</Text>
        <TextInput
          className="text-2xl text-neutral-950"
          value={numberOfRounds.toString()}
          onChangeText={(text) => {
            setNumberofRounds(text);
          }}
          keyboardType="numeric"
          editable={!isRunning}
        />
      </View>
    </View>
  );
};

export default TimerScreen;
