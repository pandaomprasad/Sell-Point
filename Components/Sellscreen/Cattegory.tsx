import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import CarSVG from "./SVG/Car";
import BikeSVG from "./SVG/Bike";
import data from "../../JSON/SellCategory.json";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

// Define the SVG components mapping
const svgComponents: { [key: string]: React.FC<{ size: number }> } = {
  Car: CarSVG,
  Bike: BikeSVG,
};

// Define the props type
type ProductCategorySellPageProps = {
  searchQuery: string;
  onCategorySelect: (category: { id: string; name: string; svgSize: number }) => void;
};

const ProductCategory_SellPage: React.FC<ProductCategorySellPageProps> = ({ searchQuery, onCategorySelect }) => {
  const filteredData = data.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {filteredData.map((item: any) => {
        const SvgComponent = svgComponents[item.name] || null;
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.cardContainer}
            onPress={() => onCategorySelect(item)} // Pass selected category to SellScreen
          >
            {SvgComponent ? (
              <SvgComponent size={item.svgSize} />
            ) : (
              <Text>Icon not found</Text>
            )}
            <Text style={styles.CardText}>{item.name}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default ProductCategory_SellPage;

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 50,
  },
  cardContainer: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "red",
    width: SCREEN_WIDTH * 0.44,
    height: SCREEN_HEIGHT * 0.22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  CardText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
