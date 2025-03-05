import { View } from "react-native";
import React, { useState } from "react";
import SearchSellCat from "../Components/Sellscreen/SearchSellCat";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ProductCategory_SellPage from "../Components/Sellscreen/Cattegory";
import { RootStackParamList } from "../Navigation/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SellScreen() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigation = useNavigation<NavigationProp>();

  const handleCategorySelect = (category: { name: string }) => {
    if (category?.name) {
      // Map category names to their respective screens
      const screenMap: { [key: string]: keyof RootStackParamList } = {
        Car: "Car_Details",
        Bike: "Bike_Details",
        Job: "Job_Details",
        Property: "Property_Details",
        Mobiles: "Mobile_Details",
        Pets:"Pet_Details",
        Furniture:"Furniture_Details",
        Electronics_And_Appliances:"Electronic_And_Appliances_Details",
        Fashion:"Fashion_Details",
        Books_Sports_Hobbies:"Books_Sports_Hobbies_Details",
        Services:"Services_Details",
        Commercial_Vechicle_And_Spares:"Commercial_Vechicle_And_Spares_Details"
        // Ensure this matches exactly
        // Add more mappings as needed
      };

      const targetScreen = screenMap[category.name];
      if (targetScreen) {
        // Use type assertion to inform TypeScript that targetScreen is a valid key
        navigation.navigate(targetScreen as keyof RootStackParamList, { selectedCategory: category.name });
      } else {
        console.warn(`No screen found for category: ${category.name}`);
      }
    }
  };

  return (
    <>
      <SearchSellCat onSearch={setSearchQuery} />
      <ProductCategory_SellPage
        searchQuery={searchQuery}
        onCategorySelect={handleCategorySelect}
      />
    </>
  );
}