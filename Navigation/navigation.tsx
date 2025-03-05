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
import WishlistScreen from "../Screens/WishlistScreen";
import Car_Details from "../ProductAddScreens/Car_Details";
import Bike_Details from "../ProductAddScreens/Bike_Details";
import Property_Details from "../ProductAddScreens/Property_Details";
import Mobiles_Details from "../ProductAddScreens/Mobiles_Details";
import Job_Details from "../ProductAddScreens/Job_Details";
import Pets_Details from "../ProductAddScreens/Pets_Details";
import Furniture_Details from "../ProductAddScreens/Furniture_Details";
import Eletronics_and_Appliances from "../ProductAddScreens/Eletronics_and_Appliances";
import Fashion_Details from "../ProductAddScreens/Fashion_Details";
import Books_Details from "../ProductAddScreens/Books_Details";
import Services_Details from "../ProductAddScreens/Services_Details";
import Brand from "../Components/Sellscreen/BRAND";
import BrandChoose from "../Components/Bottom Sheet/BrandChoose";
import BrandDetails from "../Components/Bottom Sheet/BrandDetails";

export type RootStackParamList = {
  Home: undefined;
  Details: { product: Product };
  Chat: { productId: string; productName: string };
  MakeOffer: { productId: string; productName: string; productPrice: number };
  Main: undefined;
  Notification: undefined;
  Wishlist: undefined;
  Car_Details: { selectedCategory: string };
  Bike_Details: { selectedCategory: string };
  Property_Details: { selectedCategory: string };
  Mobile_Details: { selectedCategory: string };
  Job_Details: { selectedCategory: string };
  Pet_Details: { selectedCategory: string };
  Furniture_Details: { selectedCategory: string };
  Electronic_And_Appliances_Details: { selectedCategory: string };
  Fashion_Details: { selectedCategory: string };
  Books_Sports_Hobbies_Details: { selectedCategory: string };
  Services_Details: { selectedCategory: string };
  Commercial_Vechicle_And_Spares_Details: { selectedCategory: string };
  Brand: undefined;
  BrandChoose: { vehicleType: "Car" | "Bike"; onSelect?: (selectedBrand: string, selectedModel: string) => void };
  BrandDetails: { brand: Car | Bike };
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
          options={({
            route,
          }: {
            route: RouteProp<RootStackParamList, "Details">;
          }) => ({
            title: route.params.product.name,
          })}
        />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="MakeOffer" component={MakeOffer} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="Car_Details" component={Car_Details} />
        <Stack.Screen name="Bike_Details" component={Bike_Details} />
        <Stack.Screen name="Property_Details" component={Property_Details} />
        <Stack.Screen name="Mobile_Details" component={Mobiles_Details} />
        <Stack.Screen name="Job_Details" component={Job_Details} />
        <Stack.Screen name="Pet_Details" component={Pets_Details} />
        <Stack.Screen name="Furniture_Details" component={Furniture_Details} />
        <Stack.Screen
          name="Electronic_And_Appliances_Details"
          component={Eletronics_and_Appliances}
        />
        <Stack.Screen name="Fashion_Details" component={Fashion_Details} />
        <Stack.Screen
          name="Books_Sports_Hobbies_Details"
          component={Books_Details}
        />
        <Stack.Screen name="Services_Details" component={Services_Details} />
        <Stack.Screen
          name="Commercial_Vechicle_And_Spares_Details"
          component={Services_Details}
        />
        <Stack.Screen name="Brand" component={Brand} />
        <Stack.Screen name="BrandChoose" component={BrandChoose} />
        <Stack.Screen name="BrandDetails" component={BrandDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

// Let me know if you want any adjustments or extra features! 🚀
