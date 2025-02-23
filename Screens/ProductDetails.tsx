// ProductDetails.tsx
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import React from 'react';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Type the route props

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProductDetails() {
  const route = useRoute<DetailsScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { product } = route.params;

  const handleChatPress = () => {
    navigation.navigate('Chat', {
      productId: product.product_id,
      productName: product.name,
    });
  };

  const handleOfferPress = () => {
    navigation.navigate('MakeOffer', {
      productId: product.product_id,
      productName: product.name,
      productPrice: product.price,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: product.image_url }} style={styles.image} />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.subtitle}>Company: {product.company}</Text>
        <Text style={styles.subtitle}>Model: {product.model}</Text>
        <Text style={styles.subtitle}>Category: {product.category}</Text>
        <Text style={styles.sellerTitle}>Seller Details</Text>
        <Text style={styles.subtitle}>Name: {product.seller.name}</Text>
        <Text style={styles.subtitle}>Address: {product.seller.address}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Chat" onPress={handleChatPress} color="#007bff" />
        <Button title="Make an Offer" onPress={handleOfferPress} color="#28a745" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#007bff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  sellerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

// This makes sure navigation knows about Chat and MakeOffer with the correct params! Let me know if you’d like me to update your navigation types too! 🚀
