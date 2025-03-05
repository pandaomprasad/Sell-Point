import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import vehiclesData from '../../JSON/multiLevelDropdownData.json';

interface Model {
  id: string;
  label: string;
}

interface Car {
  id: string;
  label: string;
  models: Model[];
}

interface Bike {
  id: string;
  label: string;
  models: Model[];
}

interface VehiclesData {
  Car: Car[];
  Bike: Bike[];
  Job: any[];
}

type BrandChooseRouteProp = RouteProp<{ BrandChoose: { vehicleType: 'Car' | 'Bike' } }, 'BrandChoose'>;

const BrandChoose: React.FC = () => {
  const route = useRoute<BrandChooseRouteProp>();
  const navigation = useNavigation();
  const { vehicleType } = route.params;

  const [data, setData] = useState<VehiclesData | null>(null);

  useEffect(() => {
    setData(vehiclesData);
    console.log("Loaded vehicle data:", vehiclesData);
  }, []);

  if (!data) {
    return <Text>Loading...</Text>;
  }

  const renderVehicleDetails = () => {
    const vehicles = data[vehicleType];

    if (!vehicles || vehicles.length === 0) {
      return <Text>No {vehicleType} data available.</Text>;
    }

    return vehicles.map((item) => (
      <View key={item.id} style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.label}
          onPress={() => navigation.navigate('BrandDetails', { brand: item })}
        >
          <Text style={styles.labelText}>{item.label}</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{vehicleType} Brands</Text>
      {renderVehicleDetails()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 15,
  },
  label: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  labelText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default BrandChoose;
