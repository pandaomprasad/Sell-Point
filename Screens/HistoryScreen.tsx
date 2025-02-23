import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/store';
import { setProduct, removeFromWishlist } from '../Redux/slices/productSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SwipeableItem from 'react-native-swipeable-item';

const SCREEN_HEIGHT = Dimensions.get("window").height;

// Type for navigation
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Details">;

export default function HistoryScreen() {
  const wishlist = useSelector((state: RootState) => state.product.wishlist);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();

  const handlePress = (product: any) => {
    dispatch(setProduct(product));
    navigation.navigate("Details", { product });
  };

  const handleDelete = (productId: string) => {
    Alert.alert(
      "Remove from Wishlist",
      "Are you sure you want to remove this product?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", onPress: () => dispatch(removeFromWishlist(productId)) },
      ]
    );
  };

  const renderRightActions = (productId: string) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDelete(productId)}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.header}>Wishlist</Text>
      {wishlist.length > 0 ? (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.product_id}
          renderItem={({ item }) => (
            <SwipeableItem
              key={item.product_id}
              item={item}
              renderUnderlayLeft={() => renderRightActions(item.product_id)}
              snapPointsLeft={[80]}
            >
              <TouchableOpacity onPress={() => handlePress(item)} style={styles.card}>
                <Image source={{ uri: item.image_url }} style={styles.image} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={styles.address}>{item.seller.address}</Text>
              </TouchableOpacity>
            </SwipeableItem>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No items in your wishlist</Text>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    height: SCREEN_HEIGHT * 0.2,
    borderRadius: 5,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff5722',
  },
  address: {
    fontSize: 14,
    color: '#757575',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 10,
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// I replaced the deprecated Swipeable with SwipeableItem and added swipe-to-delete! Let me know if you want more adjustments! 🚀
