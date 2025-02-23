// Recomendations.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, addToWishlist } from "../../Redux/slices/productSlice";
import { RootState } from "../../Redux/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation/navigation";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Details">;

interface RecomendationsProps {
  searchQuery: string;
  selectedCategory: string | null;
}

const Recomendations: React.FC<RecomendationsProps> = ({
  searchQuery,
  selectedCategory,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const products = useSelector((state: RootState) => state.product.productList);
  const wishlist = useSelector((state: RootState) => state.product.wishlist);

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  const handlePress = (product: any) => {
    dispatch(setProduct(product));
    navigation.navigate("Details", { product });
  };

  const toggleWishlist = (product: any) => {
    dispatch(addToWishlist(product));
  };

  return (
    <FlatList
      data={filteredProducts}
      keyExtractor={(item) => item.product_id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)} style={styles.Card}>
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <TouchableOpacity
              style={styles.wish}
              onPress={() => toggleWishlist(item)}
            >
              <MaterialCommunityIcons
                name={wishlist.some((wishItem) => wishItem.product_id === item.product_id)
                  ? "heart"
                  : "heart-outline"}
                size={24}
                color={wishlist.some((wishItem) => wishItem.product_id === item.product_id)
                  ? "red"
                  : "black"}
              />
            </TouchableOpacity>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.address}>{item.seller.address} </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  Card: {
    backgroundColor: "#ddd",
    padding: 5,
  },
  image: {
    height: SCREEN_HEIGHT * 0.2,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
  },

  price: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#ff5722",
  },

  address: {
    fontSize: 16,
    color: "#757575",
  },
  wish: {
    position: "absolute",
    right: 15,
    top: 15,
    padding: 5,
    zIndex: 1,
    backgroundColor: "#ddd",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Recomendations;

// Now clicking the heart button adds/removes products from the wishlist, and the filled heart shows for selected products! 🚀
