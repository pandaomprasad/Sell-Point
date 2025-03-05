import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Brand_ModalPage from '../Components/Button/Brand_ModalPage';

const Bike_Details = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bike Details Screen</Text>

      <Brand_ModalPage
        vehicleType="Bike"
        onSelect={(selectedBrand, selectedModel) => {
          setBrand(selectedBrand);
          setModel(selectedModel);
          console.log('Selected Brand:', selectedBrand);
          console.log('Selected Model:', selectedModel);
        }}
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Selected Brand: {brand || 'None'}</Text>
        <Text style={styles.label}>Selected Model: {model || 'None'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Bike_Details;
