import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import RadioButton from "../Components/Button/RadioButton";
import Custom_Input from "../Components/Input/Custom_Input";
import petData from "../JSON/Pets.json";
import Submit from "../Components/Button/Submit";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface PetDetails {
  size: string[];
  diet: string[];
}

interface Pet {
  petType: string;
  details: PetDetails;
}

const Pet_Details = () => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedDiet, setSelectedDiet] = useState<string>("");

  const [adTitle, setAdTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Pet Details Form</Text>

        <Text>Select Pet Type:</Text>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {petData.map((item: Pet, index: number) => (
            <View key={index} style={styles.radioOption}>
              <RadioButton
                label={item.petType}
                selected={selectedPet?.petType === item.petType}
                onPress={() => {
                  setSelectedPet(item);
                  setSelectedSize("");
                  setSelectedDiet("");
                }}
              />
            </View>
          ))}
        </ScrollView>

        {selectedPet && (
          <>
            <Text>Select Size:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedPet.details.size.map((size, index) => (
                <View key={index} style={styles.radioOption}>
                  <RadioButton
                    label={size}
                    selected={selectedSize === size}
                    onPress={() => setSelectedSize(size)}
                  />
                </View>
              ))}
            </ScrollView>

            <Text>Select Diet:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedPet.details.diet.map((diet, index) => (
                <View key={index} style={styles.radioOption}>
                  <RadioButton
                    label={diet}
                    selected={selectedDiet === diet}
                    onPress={() => setSelectedDiet(diet)}
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

export default Pet_Details;
