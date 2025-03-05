import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Custom_Input from "../Components/Input/Custom_Input";
import OptionSelector from "../Components/Input/Radio_Button";
import Submit from "../Components/Button/Submit";
import Brand_ModalPage from "../Components/Button/Brand_ModalPage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetModal from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModal";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

// Define types for each selection
type FuelValue = "petrol" | "diesel" | "electric" | "hybrid";
type TransmissionValue = "manual" | "automatic";
type OwnersValue = "1" | "2" | "3" | "4+";

const Car_Details = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [kmDriven, setKmDriven] = useState("");
  const [adTitle, setAdTitle] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [fuelType, setFuelType] = useState<FuelValue | null>(null);
  const [transmission, setTransmission] = useState<TransmissionValue | null>(
    null
  );
  const [owners, setOwners] = useState<OwnersValue | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const isFormValid = () => {
    return (
      brand &&
      model &&
      kmDriven &&
      adTitle &&
      additionalInfo &&
      fuelType &&
      transmission &&
      owners
    );
  };


  return (
    <GestureHandlerRootView style={{flex:1}}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <ScrollView contentContainerStyle={styles.scrollView}>
              <View style={styles.Box_Container}>
                <Text>Select Brand</Text>
                <Brand_ModalPage  vehicleType="Car"  />
              </View>
              <View style={styles.Box_Container}>
                <Text>Select Model</Text>
                <Brand_ModalPage vehicleType="Bike" />
              </View>
              <View style={styles.Box_Container}>
                <Text>Fuel Type*</Text>
                <OptionSelector
                  options={[
                    { id: "1", label: "Petrol", value: "petrol" },
                    { id: "2", label: "Diesel", value: "diesel" },
                    { id: "3", label: "Electric", value: "electric" },
                    { id: "4", label: "Hybrid", value: "hybrid" },
                  ]}
                  onSelect={(value) => setFuelType(value as FuelValue)}
                  selectedValue={fuelType}
                />
              </View>
              <View style={styles.Box_Container}>
                <Text>Transmission*</Text>
                <OptionSelector
                  options={[
                    {
                      id: "1",
                      label: "Manual",
                      value: "manual" as TransmissionValue,
                    }, // Correctly cast to TransmissionValue
                    {
                      id: "2",
                      label: "Automatic",
                      value: "automatic" as TransmissionValue,
                    }, // Correctly cast to TransmissionValue
                  ]}
                  onSelect={(value) =>
                    setTransmission(value as TransmissionValue)
                  } // Ensure value is cast to TransmissionValue
                  selectedValue={transmission}
                />
              </View>
              <View style={styles.Box_Container}>
                <Text>KM Driven</Text>
                <Custom_Input
                  multiline={false}
                  maxLength={6}
                  keyboardType="numeric"
                  value={kmDriven}
                  onChangeText={setKmDriven}
                />
              </View>
              <View style={styles.Box_Container}>
                <Text>No Of Owners*</Text>
                <OptionSelector
                  options={[
                    { id: "1", label: "1 Owner", value: "1" as OwnersValue },
                    { id: "2", label: "2 Owners", value: "2" as OwnersValue },
                    { id: "3", label: "3 Owners", value: "3" as OwnersValue },
                    { id: "4", label: "4+ Owners", value: "4+" as OwnersValue },
                  ]}
                  onSelect={(value) => setOwners(value as OwnersValue)}
                  selectedValue={owners}
                />
              </View>
              <View style={styles.Box_Container}>
                <Text>Ad Title</Text>
                <Custom_Input
                  multiline={false}
                  maxLength={20}
                  value={adTitle}
                  onChangeText={setAdTitle}
                />
              </View>
              <View style={styles.Box_Container}>
                <Text>Additional Information</Text>
                <Custom_Input
                  multiline={true}
                  maxLength={50}
                  value={additionalInfo}
                  onChangeText={setAdditionalInfo}
                />
              </View>
            </ScrollView>
            <Submit
              style={{ backgroundColor: isFormValid() ? "red" : "gray" }}
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 20,
    paddingTop: Platform.OS === "ios" ? 10 : 0,
  },
  Box_Container: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: SCREEN_WIDTH * 0.95,
    alignSelf: "center",
    marginBottom: 15,
  },
});

export default Car_Details;
