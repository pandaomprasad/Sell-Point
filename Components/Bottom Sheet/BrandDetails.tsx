import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';

// Define types for Brand, Model, and SubModel
interface SubModel {
  id: string;
  label: string;
}

interface Model {
  id: string;
  label: string;
  subModel: string[];
}

interface Brand {
  id: string;
  label: string;
  models: Model[];
}

// Define props for the BrandDetails component
interface BrandDetailsProps {
  route: {
    params: {
      brand: Brand;
    };
  };
  navigation: any; // You can replace 'any' with a more specific type if you have it
}

const BrandDetails: React.FC<BrandDetailsProps> = ({ route, navigation }) => {
  const { brand } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [searchModel, setSearchModel] = useState('');
  const [searchSubModel, setSearchSubModel] = useState('');

  const handleModelPress = (model: Model) => {
    setSelectedModel(model);
    setModalVisible(true); // Show the modal when a model is selected
  };

  const handleSubModelPress = (submodel: string) => {
    // Navigate to Car_Details screen with selected data
    navigation.navigate('Car_Details', {
      brand: brand.label,
      model: selectedModel?.label,
      submodel: submodel,
    });
    setModalVisible(false); // Close the modal after selection
  };

  // Filter models based on search input
  const filteredModels = brand.models.filter(model =>
    model.label.toLowerCase().includes(searchModel.toLowerCase())
  );

  // Filter submodels based on search input
  const filteredSubModels = selectedModel?.subModel.filter(submodel =>
    submodel.toLowerCase().includes(searchSubModel.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Model for {brand.label}</Text>
      
      {/* Search Input for Models */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Models"
        value={searchModel}
        onChangeText={setSearchModel}
      />
      
      {filteredModels.map((model) => (
        <Button
          key={model.id}
          title={model.label}
          onPress={() => handleModelPress(model)}
        />
      ))}

      {/* Modal for Submodel Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose a Submodel for {selectedModel?.label}</Text>
            
            {/* Search Input for Submodels */}
            <TextInput
              style={styles.searchInput}
              placeholder="Search Submodels"
              value={searchSubModel}
              onChangeText={setSearchSubModel}
            />
            
            {filteredSubModels?.map((submodel) => (
              <TouchableOpacity key={submodel} onPress={() => handleSubModelPress(submodel)}>
                <Text style={styles.submodelText}>{submodel}</Text>
              </TouchableOpacity>
            ))}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  submodelText: {
    fontSize: 16,
    marginVertical: 5,
    color: 'blue',
  },
});

export default BrandDetails;