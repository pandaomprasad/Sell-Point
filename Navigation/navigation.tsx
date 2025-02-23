// StackNavigation.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomNavigation from "./bottomTab";
import ProductDetails from "../Screens/ProductDetails";
import { Product } from "../Redux/slices/productSlice";
import { RouteProp } from "@react-navigation/native";
import ChatScreen from "../Screens/ChatScreen";
import MakeOffer from "../Screens/MakeOffer";
import NotificationScreen from "../Screens/NotificationScreen";

export type RootStackParamList = {
  Home: undefined;
  Details: { product: Product };
  Chat: { productId: string; productName: string };
  MakeOffer: { productId: string; productName: string; productPrice: number };
  Main: undefined;
  Notification:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={ProductDetails}
          options={(
            { route }: { route: RouteProp<RootStackParamList, "Details"> }
          ) => ({
            title: route.params.product.name,
          })}
        />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="MakeOffer" component={MakeOffer} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

// Now, the bottom tab is the main screen, and the stack handles the rest! No more container error. Let me know if you want more adjustments. 🚀
