import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import RadioButton from "../Components/Button/RadioButton";
import Custom_Input from "../Components/Input/Custom_Input";
import furnitureData from "../JSON/Furniture.json";
import Submit from "../Components/Button/Submit";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface FurnitureDetails {
  material: string[];
  style: string[];
}

interface Furniture {
  furnitureType: string;
  details: FurnitureDetails;
}

const Furniture_Details = () => {
  const [selectedFurniture, setSelectedFurniture] = useState<Furniture | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<string>("");

  const [adTitle, setAdTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Furniture Details Form</Text>

        <Text>Select Furniture Type:</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {furnitureData.map((item: Furniture, index: number) => (
            <View key={index} style={styles.radioOption}>
              <RadioButton
                label={item.furnitureType}
                selected={selectedFurniture?.furnitureType === item.furnitureType}
                onPress={() => {
                  setSelectedFurniture(item);
                  setSelectedMaterial("");
                  setSelectedStyle("");
                }}
              />
            </View>
          ))}
        </ScrollView>

        {selectedFurniture && (
          <>
            <Text>Select Material:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedFurniture.details.material.map((material, index) => (
                <View key={index} style={styles.radioOption}>
                  <RadioButton
                    label={material}
                    selected={selectedMaterial === material}
                    onPress={() => setSelectedMaterial(material)}
                  />
                </View>
              ))}
            </ScrollView>

            <Text>Select Style:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedFurniture.details.style.map((style, index) => (
                <View key={index} style={styles.radioOption}>
                  <RadioButton
                    label={style}
                    selected={selectedStyle === style}
                    onPress={() => setSelectedStyle(style)}
                  />
                </View>
              ))}
            </ScrollView>

            <Text>Ad Title:</Text>
            <Custom_Input
              keyboardType="default"
              value={adTitle}
              onChangeText={(text) => setAdTitle(text)}
              maxLength={30}
            />
            <Text>Description:</Text>
            <Custom_Input
              keyboardType="default"
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline
              maxLength={4000}
            />
          </>
        )}
      </View>
      <Submit />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: SCREEN_HEIGHT * 0.01,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  radioOption: {
    marginRight: 10,
  },
});

export default Furniture_Details;
