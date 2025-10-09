import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import PhysicsScreen from "./screens/PhysicsScreen";
import ChemistryScreen from "./screens/ChemistryScreen";
import BiologyScreen from "./screens/BiologyScreen";
import ChemistryModelScreen from "./screens/ChemistryModelScreen";
import BiologyModelScreen from "./screens/BiologyModelScreen";
import PhysicsModelScreen from "./screens/PhysicsModelScreen";
import AIChatScreen from "./screens/AIChatScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Physics" component={PhysicsScreen} />
        <Stack.Screen name="Chemistry" component={ChemistryScreen} />
        <Stack.Screen name="Biology" component={BiologyScreen} />
        <Stack.Screen name="ChemistryModel" component={ChemistryModelScreen} />
        <Stack.Screen name="BiologyModel" component={BiologyModelScreen} />
        <Stack.Screen name="PhysicsModel" component={PhysicsModelScreen} />
        <Stack.Screen name="AIChat" component={AIChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
