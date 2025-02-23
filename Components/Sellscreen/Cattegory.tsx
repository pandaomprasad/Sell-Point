import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import CarSVG from "./SVG/Car";
import BikeSVG from "./SVG/Bike";
import data from "../../JSON/SellCategory.json";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const svgComponents: Record<string, React.ElementType> = {
  Car: CarSVG,
  Bike: BikeSVG,
  // Property: PropertySvg,
};

interface Props {
  searchQuery: string;
}

const ProductCategory_SellPage: React.FC<Props> = ({searchQuery}) => {

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {filteredData.map((item) => {
        const SvgComponent = svgComponents[item.name];
        return (
          <TouchableOpacity key={item.id} style={styles.cardContainer}>
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
    paddingBottom: 50, // Prevents last row from being cut off
  },
  cardContainer: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "red",
    width: SCREEN_WIDTH * 0.44, // 2 items per row
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
