import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

interface Model {
  id: string;
  label: string;
}

interface Brand {
  id: string;
  label: string;
  models: Model[];
}

type ModelDetailsRouteProp = RouteProp<{ ModelDetails: { brand: Brand } }, 'ModelDetails'>;

const BrandDetails: React.FC = () => {
    const route = useRoute<ModelDetailsRouteProp>();
    const { brand } = route.params;
  
    const handleModelPress = (model: Model) => {
      console.log("Selected Brand:", brand.label);
      console.log("Selected Model Details:", model);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{brand.label} Models</Text>
        <FlatList
          data={brand.models}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.modelItem} 
              onPress={() => handleModelPress(item)}
            >
              <Text style={styles.modelLabel}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
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
  modelItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  modelLabel: {
    fontSize: 18,
    color: '#333',
  },
});

export default BrandDetails;
