import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import WorkoutScreen from "./src/Screens/WorkoutScreen";
import TimerScreen from "./src/Screens/TimerScreen";
import CalculationScreen from "./src/Screens/CalculationScreen";
import Dumbbell from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import ExcerciseScreen from "./src/Screens/ExcerciseScreen";
import CategoryScreen from "./src/Screens/CategoryScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case "Workout":
                iconName = "dumbbell";
                return <Dumbbell name={iconName} size={size} color={color} />;
              case "Timer":
                iconName = "timer-outline";
                return <Ionicons name={iconName} size={size} color={color} />;
              case "Calculator":
                iconName = "calculator";
                return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
          tabBarStyle: {
            backgroundColor: "black",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 5,
          },
          tabBarActiveTintColor: "aqua",
          tabBarInactiveTintColor: "grey",
        })}
      >
        <Tab.Screen name="Workout" component={WorkoutScreen} />
        <Tab.Screen name="Timer" component={TimerScreen} />
        <Tab.Screen name="Calculator" component={CalculationScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabNav" component={TabNavigator} />
        <Stack.Screen name="ExcerciseScreen" component={ExcerciseScreen} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
