import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaViewBase,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const CalculationScreen = () => {
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");

  const calculatwBmi = () => {
    if (weight && height) {
      const weightKg =
        weightUnit === "kg" ? parseFloat(weight) : parseFloat(weight) / 2.20462;
      const heightCm =
        heightUnit === "cm"
          ? parseFloat(height) / 100
          : parseFloat(height) * 0.0254;
      const bmiValue = weightKg / (heightCm * heightCm);

      setBmi(bmiValue.toFixed(2));
    } else {
      setBmi(null);
    }
  };

  const getBmiMeaning = () => {
    if (bmi !== null) {
      if (bmi < 18.5) {
        return {
          message:
            "You are underweight. Consider consulting a doctor or a nutritionist",
          color: "red ",
        };
      } else if (bmi < 24.9) {
        return {
          message: "Congratulations! You are in a healthy weight range ",
          color: "green",
        };
      } else if (bmi < 29.9) {
        return {
          message: "You are over weight! Consider adopting a healthy diet",
          color: "orange",
        };
      } else {
        return {
          message:
            "You are a obese, Please consider consulting a health care professional",
          color: "red ",
        };
      }
    }
  };

  const bmiMesssage = getBmiMeaning();
  return (
    <View className="bg-gray-200 flex-1  items-center ">
      <Text className="text-2xl  font-bold mt-16  ">BMI calculator</Text>
      <View className="flex-row mt-5 ">
        <Text className="text-center flex-1  text-lg font-medium">
          {" "}
          Weight Unit
        </Text>
        <Text className="text-center flex-1 text-lg font-medium">
          {" "}
          Height Unit
        </Text>
      </View>
      <View className="flex-row mb-10">
        <Picker
          style={{ flex: 1, height: 50 }}
          selectedValue={weightUnit}
          onValueChange={(itemValue, itemIndex) => setWeightUnit(itemValue)}
        >
          <Picker.Item label="Kg" value="Kg" />
          <Picker.Item label="Pounds" value="Lbs" />
        </Picker>
        <Picker
          style={{ flex: 1, height: 50 }}
          selectedValue={heightUnit}
          onValueChange={(itemValue, itemIndex) => setHeightUnit(itemValue)}
        >
          <Picker.Item label="Cm" value="Cm" />
          <Picker.Item label="Inches" value="In" />
        </Picker>
      </View>
      <View className="mt-28 items-center justify-center ">
        <TextInput
          placeholder={`Enter your weight in ${weightUnit}`}
          keyboardType="numeric"
          onChangeText={setWeight}
          value={weight}
          className="w-screen p-4 rounded-xl bg-white mb-10 text-base"
        />

        <TextInput
          placeholder={`Enter your Height in ${heightUnit}`}
          keyboardType="numeric"
          onChangeText={setHeight}
          value={height}
          className="w-screen p-4 rounded-xl bg-white text-base"
        />
      </View>
      <TouchableOpacity
        className=" rounded-xl p-3 bg-blue-600 my-5"
        onPress={calculatwBmi}
      >
        <Text className="font-medium text-white text-lg">Calculate BMI</Text>
      </TouchableOpacity>
      {bmi !== null ? (
        <View>
          <Text>Your BMI is:</Text>
          <Text>{bmi}</Text>
          <Text
            style={{
              fontSize: 20,
              marginTop: 10,
              textAlign: "center",
              color: bmiMesssage.color,
            }}
          >
            {bmiMesssage.message}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default CalculationScreen;
