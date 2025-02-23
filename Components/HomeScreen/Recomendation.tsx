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
}

const Recomendations: React.FC<RecomendationsProps> = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const products = useSelector((state: RootState) => state.product.productList);

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

// Now your recommendations filter live based on the search query! Let me know if you want any tweaks! 🚀
