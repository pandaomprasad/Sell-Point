import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import RadioButton from "../Components/Button/RadioButton";
import Custom_Input from "../Components/Input/Custom_Input";
import fashionData from "../JSON/Fashion.json";
import Submit from "../Components/Button/Submit";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface FashionDetails {
  clothing: string[];
  style: string[];
}

interface Fashion {
  category: string;
  details: FashionDetails;
}

const Fashion_Details = () => {
  const [selectedCategory, setSelectedCategory] = useState<Fashion | null>(null);
  const [selectedClothing, setSelectedClothing] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<string>("");

  const [adTitle, setAdTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Fashion Details Form</Text>

        <Text>Select Category:</Text>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {fashionData.map((item: Fashion, index: number) => (
            <View key={index} style={styles.radioOption}>
              <RadioButton
                label={item.category}
                selected={selectedCategory?.category === item.category}
                onPress={() => {
                  setSelectedCategory(item);
                  setSelectedClothing("");
                  setSelectedStyle("");
                }}
              />
            </View>
          ))}
        </ScrollView>

        {selectedCategory && (
          <>
            <Text>Select Clothing Type:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedCategory.details.clothing.map((item, index) => (
                <View key={index} style={styles.radioOption}>
                  <RadioButton
                    label={item}
                    selected={selectedClothing === item}
                    onPress={() => setSelectedClothing(item)}
                  />
                </View>
              ))}
            </ScrollView>

            <Text>Select Style:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedCategory.details.style.map((item, index) => (
                <View key={index} style={styles.radioOption}>
                  <RadioButton
                    label={item}
                    selected={selectedStyle === item}
                    onPress={() => setSelectedStyle(item)}
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

export default Fashion_Details;
