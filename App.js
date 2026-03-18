import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/screens/HomeScreen";
import TestHollandScreen from "./src/screens/TestHollandScreen";
import BasicResultsScreen from "./src/screens/BasicResultsScreen";
import PlansScreen from "./src/screens/PlansScreen";
import PaymentScreen from "./src/screens/PaymentScreen";
import PremiumAnalysisScreen from "./src/screens/PremiumAnalysisScreen";
import { COLORS } from "./src/utils/theme";

const Stack = createStackNavigator();
const OPTS = { headerShown: false, cardStyle: { backgroundColor: COLORS.bg } };

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={OPTS}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TestHolland" component={TestHollandScreen} />
          <Stack.Screen name="BasicResults" component={BasicResultsScreen} />
          <Stack.Screen name="Plans" component={PlansScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="PremiumAnalysis" component={PremiumAnalysisScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
