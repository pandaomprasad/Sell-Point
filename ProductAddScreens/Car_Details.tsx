import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  Button,
  ScrollView,
  Image,
  Alert,
  Platform,
  Modal,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Custom_Input from "../Components/Input/Custom_Input";
import OptionSelector from "../Components/Input/Radio_Button";
import {
  launchImageLibrary,
  requestMediaLibraryPermissionsAsync,
} from "react-native-image-picker";

const carData: CarBrand[] = require("../JSON/CarBrandAndModel.json");
import AntDesign from '@expo/vector-icons/AntDesign';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Car_Details({  }) {
  const [ownerName, setOwnerName] = useState("");
  const [description, setDescription] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [fuelType, setFuelType] = useState<string | null>(null);
  const [ownerNum, setownerNum] = useState<string | null>(null);
  const [transmissionType, setTransmissionType] = useState<string | null>(null);
  const [carImage, setCarImage] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modelSelectionVisible, setModelSelectionVisible] = useState(false);
  const [subModelSelectionVisible, setSubModelSelectionVisible] =
    useState(false);

  const [brandSearchQuery, setBrandSearchQuery] = useState("");
  const [modelSearchQuery, setModelSearchQuery] = useState("");
  const [subModelSearchQuery, setSubModelSearchQuery] = useState("");

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedSubModel, setSelectedSubModel] = useState(null);

  const fuelOptions = [
    { id: "1", label: "Petrol", value: "petrol" },
    { id: "2", label: "Diesel", value: "diesel" },
    { id: "3", label: "Electric", value: "electric" },
    { id: "4", label: "Hybrid", value: "hybrid" },
  ];

  const transmissionOptions = [
    { id: "1", label: "Manual", value: "manual" },
    { id: "2", label: "Automatic", value: "automatic" },
  ];
  const ownerOptions = [
    { id: "1", label: "Manual", value: "manual" },
    { id: "2", label: "Automatic", value: "automatic" },
  ];
  interface CarSubModel {
    id: string;
    label: string;
    subModel: string[];
  }
  
  interface CarModel {
    id: string;
    label: string;
    models: CarSubModel[];
  }
  
  interface CarBrand {
    id: string;
    label: string;
    models: CarModel[];
  }
  
  const handleImagePick = async () => {
    if (Platform.OS === "android") {
      const { granted } = await requestMediaLibraryPermissionsAsync();
      if (!granted) {
        Alert.alert(
          "Permission required",
          "Please grant media access to select an image."
        );
        return;
      }
    }
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setCarImage(response.assets[0].uri);
      }
    });
  };
  const isFormValid =
    ownerName &&
    description &&
    sellingPrice &&
    fuelType &&
    ownerNum &&
    transmissionType &&
    selectedBrand &&
    selectedModel &&
    selectedSubModel;

  const handleSubmit = () => {
    if (isFormValid) {
      const carDetails = {
        ownerName,
        description,
        fuelType,
        ownerNum,
        transmissionType,
        sellingPrice,
        carImage,
        selectedBrand,
        selectedModel,
        selectedSubModel,
      };
      console.log("Car Details:", carDetails);
    } else {
      Alert.alert("Form Incomplete", "Please fill out all required fields.");
    }
  };

  const filteredBrands = carData.filter((item) =>
  item.label.toLowerCase().includes(brandSearchQuery.toLowerCase())
);

const filteredModels = selectedBrand?.models.filter((item: { label: string; }) =>
  item.label.toLowerCase().includes(modelSearchQuery.toLowerCase())
);

const filteredSubModels = selectedModel?.subModel.filter((item: string) =>
  item.toLowerCase().includes(subModelSearchQuery.toLowerCase())
);


  return (
    <KeyboardAvoidingView behavior="padding">
      <SafeAreaView>
        <ScrollView>
          <View style={styles.viewBox}>
            <View style={styles.imageContainer}>
              {!carImage ? (
                <Text style={styles.viewBoxText}>There is no image</Text>
              ) : (
                <Image
                  source={{ uri: carImage }}
                  style={{ width: 200, height: 200, marginVertical: 10 }}
                />
              )}
            </View>

            <Button title="Choose Car Photo" onPress={handleImagePick} />
          </View>
          <View style={styles.viewBox}>
            <Text style={styles.viewBoxText}>Brand*</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                backgroundColor: "red",
                height: SCREEN_HEIGHT * 0.05,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.viewBoxText}>
                {selectedBrand && selectedModel && selectedSubModel
                  ? ` ${selectedBrand.label} - ${selectedModel.label} - ${selectedSubModel}`
                  : "Choose Car Model"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewBox}>
            <Text style={styles.viewBoxText}>Fuel Type:</Text>
            <OptionSelector
              options={fuelOptions}
              selectedValue={fuelType}
              onSelect={setFuelType}
            />
          </View>
          <View style={styles.viewBox}>
            <Text style={styles.viewBoxText}>Transmission Type:</Text>
            <OptionSelector
              options={transmissionOptions}
              selectedValue={transmissionType}
              onSelect={setTransmissionType}
            />
            <Text style={styles.viewBoxText}>Owner Numbers:</Text>
            <OptionSelector
              selectedValue={ownerNum}
              options={ownerOptions}
              onSelect={setownerNum}
            />
          </View>
          <View style={styles.viewBox}>
            <Text style={styles.viewBoxText}>Owner Name:</Text>
            <Custom_Input
              value={ownerName}
              onChangeText={setOwnerName}
              maxLength={30}
            />
          </View>
          <View style={styles.viewBox}>
            <Text style={styles.viewBoxText}>Description</Text>
            <Custom_Input
              value={description}
              onChangeText={setDescription}
              multiline
              maxLength={200}
            />
          </View>
          <View style={styles.viewBox}>
            <Text style={styles.viewBoxText}>Selling Price</Text>
            <Custom_Input
              value={sellingPrice}
              onChangeText={setSellingPrice}
              keyboardType="numeric"
              maxLength={6}
            />
          </View>

          {/* Brand Selection Modal */}
          <Modal visible={modalVisible} animationType="slide">
            <SafeAreaView style={styles.modalContainer}>
              <Text style={{
                fontSize:SCREEN_WIDTH*0.04,
                alignSelf: 'center',
                fontWeight:'700',
                color:'#FF6347'
              }}>Please select your car brand</Text>
              <TextInput
                placeholder="Search brand..."
                onChangeText={setBrandSearchQuery}
                value={brandSearchQuery}
                style={{
                  padding: 10,
                  borderWidth: 1,
                  margin: SCREEN_HEIGHT * 0.02,
                  borderRadius: 5,
                }}
                placeholderTextColor="black"
              />
              <FlatList
                data={filteredBrands}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedBrand(item);
                      setModalVisible(false);
                      setModelSelectionVisible(true);
                      setBrandSearchQuery("");
                    }}
                    style={{
                      borderBottomWidth: 1,
                      height: SCREEN_HEIGHT * 0.06,
                      justifyContent: "center",
                      padding: SCREEN_WIDTH * 0.02,
                      borderRadius: 5,
                      width: SCREEN_WIDTH * 0.92,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontSize: SCREEN_HEIGHT * 0.02 }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
<TouchableOpacity
  onPress={() => setModalVisible(false)}
  style={styles.closeButton}
>
  <Text style={styles.closeButtonText}>Next</Text>
</TouchableOpacity>
            </SafeAreaView>
          </Modal>

          {/* Model Selection Modal */}
          <Modal visible={modelSelectionVisible} animationType="slide">
            <SafeAreaView style={styles.modalContainer}>
            <Text style={{
                fontSize:SCREEN_WIDTH*0.04,
                alignSelf: 'center',
                fontWeight:'700',
                color:'#FF6347'
              }}>Please select your car Model</Text>
              <TextInput
                placeholder="Search model..."
                onChangeText={setModelSearchQuery}
                value={modelSearchQuery}
                style={{
                  padding: 10,
                  borderWidth: 1,
                  margin: SCREEN_HEIGHT * 0.02,
                  borderRadius: 5,
                }}
                placeholderTextColor="black"
              />
              <FlatList
                data={filteredModels}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedModel(item);
                      setModelSelectionVisible(false);
                      setSubModelSelectionVisible(true);
                      setModelSearchQuery("");
                    }}
                    style={{
                      borderBottomWidth: 1,
                      height: SCREEN_HEIGHT * 0.06,
                      justifyContent: "center",
                      padding: SCREEN_WIDTH * 0.02,
                      borderRadius: 5,
                      width: SCREEN_WIDTH * 0.92,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontSize: SCREEN_HEIGHT * 0.02 }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
  onPress={() => setModalVisible(false)}
  style={styles.closeButton}
>
  <Text style={styles.closeButtonText}>Next</Text>
</TouchableOpacity>
            </SafeAreaView>
          </Modal>
          <Modal visible={subModelSelectionVisible} animationType="slide">
          <SafeAreaView style={styles.modalContainer}>
            <Text style={{
                fontSize:SCREEN_WIDTH*0.04,
                alignSelf: 'center',
                fontWeight:'700',
                color:'#FF6347'
              }}>Please select your car Model</Text>
                            <TextInput
                placeholder="Search sub-model..."
                onChangeText={setSubModelSearchQuery}
                value={subModelSearchQuery}
                style={{
                  padding: 10,
                  borderWidth: 1,
                  margin: SCREEN_HEIGHT * 0.02,
                  borderRadius: 5,
                }}
              />
              <FlatList
                data={filteredSubModels}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedSubModel(item);
                      setSubModelSelectionVisible(false);
                      setSubModelSearchQuery("");
                    }}
                    style={{
                      borderBottomWidth: 1,
                      height: SCREEN_HEIGHT * 0.06,
                      justifyContent: "center",
                      padding: SCREEN_WIDTH * 0.02,
                      borderRadius: 5,
                      width: SCREEN_WIDTH * 0.92,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontSize: SCREEN_HEIGHT * 0.02 }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
                       <TouchableOpacity
  onPress={() => setModalVisible(false)}
  style={styles.closeButton}
>
  <Text style={styles.closeButtonText}>Next</Text>
</TouchableOpacity>
            </SafeAreaView>
          </Modal>
          <TouchableOpacity
            onPress={handleSubmit}
            style={[
              styles.submitButton,
              isFormValid ? styles.buttonEnabled : styles.buttonDisabled,
            ]}
            disabled={!isFormValid}
          >
            <Text
              style={{ fontSize: SCREEN_HEIGHT * 0.025, fontWeight: "700" }}
            >
              SUBMIT
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  viewBox: {
    paddingHorizontal: SCREEN_HEIGHT * 0.008,
  },
  viewBoxText: {
    fontSize: SCREEN_HEIGHT * 0.02,
    fontWeight: "600",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  inputValid: {
    borderColor: "green",
  },
  inputInvalid: {
    borderColor: "red",
  },
  submitButton: {
    height: SCREEN_HEIGHT * 0.07,
    width: SCREEN_WIDTH * 0.9,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
  },
  buttonEnabled: {
    backgroundColor: "green",
  },
  buttonDisabled: {
    backgroundColor: "gray",
  },
  submitButtonText: {
    fontSize: SCREEN_HEIGHT * 0.025,
    fontWeight: "700",
    color: "white",
  },
  imageContainer:{
    backgroundColor: 'red',
    height:SCREEN_HEIGHT*0.35,
    justifyContent:'center',
    alignItems:'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: "space-between", 
    // padding: 20,
  },
  
  closeButton: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
    width:SCREEN_WIDTH*0.95,
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'center',
    gap:5
  },
  
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  
});
