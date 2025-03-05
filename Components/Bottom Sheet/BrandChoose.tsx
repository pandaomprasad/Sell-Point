import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import carData from "../../JSON/CarBrandAndModel.json";

// Define types for Brand
interface Brand {
  id: string;
  label: string;
  models: any[]; // You can define a more specific type for models if needed
}

// Define props for the BrandChoose component
interface BrandChooseProps {
  navigation: {
    navigate: (screen: string, params: { brand: Brand }) => void;
  };
}

const BrandChoose: React.FC<BrandChooseProps> = ({ navigation }) => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleBrandPress = (brand: Brand) => {
    setSelectedBrand(brand);
    navigation.navigate('BrandDetails', { brand });
  };

  // Filter brands based on search input
  const filteredBrands = carData.filter(brand =>
    brand.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Car Brand</Text>
      
      {/* Search Input for Brands */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Brands"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      {filteredBrands.map((brand) => (
        <Button
          key={brand.id}
          title={brand.label}
          onPress={() => handleBrandPress(brand)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default BrandChoose;