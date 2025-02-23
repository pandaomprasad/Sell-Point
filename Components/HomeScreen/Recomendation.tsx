// Recomendations.tsx
import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../Redux/slices/productSlice";
import { RootState } from "../../Redux/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation/navigation";

// Type for navigation
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Details">;

interface RecomendationsProps {
  searchQuery: string;
  selectedCategory: string | null;
}

const Recomendations: React.FC<RecomendationsProps> = ({ searchQuery, selectedCategory }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const products = useSelector((state: RootState) => state.product.productList);

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  const handlePress = (product: any) => {
    dispatch(setProduct(product));
    navigation.navigate("Details", { product });
  };

  return (
    <FlatList
      data={filteredProducts}
      keyExtractor={(item) => item.product_id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Image
              source={{ uri: item.image_url }}
              style={{ width: 100, height: 100 }}
            />
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
            <Text>{item.seller.address} </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default Recomendations;

// Now your recommendations filter based on both search query and category! Let me know if you want any tweaks! 🚀
