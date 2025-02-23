import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import data from "../../JSON/SellCategory.json";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface CategoryProps {
  onSelectCategory: (category: string | null) => void;
}

interface CategoryItem {
  id: number;
  name: string;
  svgSize: number;
}

const Category: React.FC<CategoryProps> = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handlePress = (item: CategoryItem) => {
    const newCategory = item.id === 0 ? null : item.name;
    setSelectedCategory(item.id);
    onSelectCategory(newCategory);
  };

  const renderItem = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.Cardcontainer,
        item.id === selectedCategory ? styles.selected : null,
      ]}
      onPress={() => handlePress(item)}
    >
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: SCREEN_HEIGHT * 0.06,
    padding: 5,
  },
  Cardcontainer: {
    backgroundColor: "#ddd",
    height: SCREEN_HEIGHT * 0.04,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 15,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal: 20,
  },
  selected: {
    backgroundColor: "#6C63FF",
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
});

// Now categories show as buttons, and the selected category is highlighted! 🚀
