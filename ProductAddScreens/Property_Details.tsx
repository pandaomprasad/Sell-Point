import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import propertyData from "../JSON/Property.json";
import RadioButton from "../Components/Button/RadioButton";
import Custom_Input from "../Components/Input/Custom_Input";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

interface PropertyOptions {
  bhk: string[];
  bathrooms: string[];
  furnishing: string[];
  carParking: string[];
  listedBy: string[];
  bachlores: string[];
  facing: string[];
}

const Property_Details = () => {
  const [saleOrRent, setSaleOrRent] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [selectedBHK, setSelectedBHK] = useState<string>("");
  const [selectedBathroom, setSelectedBathroom] = useState<string>("");
  const [selectedFurnishing, setSelectedFurnishing] = useState<string>("");
  const [selectedCarParking, setselectedCarParking] = useState<string>("");
  const [selectedlistedBy, setSelectedListedBy] = useState<string>("");
  const [selectedBachlores, setSelectedBachlores] = useState<string>("");
  const [selectedFacing, setSelectedFacing] = useState<string>("");

  const [options, setOptions] = useState<PropertyOptions | null>(null);

  // For Custom inputs
  const [supperBuiltUpArea, setsupperBuiltUpArea] = useState<string>("");
  const [carpetArea, setcarpetArea] = useState<string>("");
  const [mainteances, setMainteances] = useState<string>("");
  const [totalFlor, settotalFlor] = useState<string>("");
  const [adTitle, setadTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const isPropertyOptions = (obj: any): obj is PropertyOptions => {
    return (
      obj &&
      Array.isArray(obj.bhk) &&
      Array.isArray(obj.bathrooms) &&
      Array.isArray(obj.furnishing) &&
      Array.isArray(obj.carParking) &&
      Array.isArray(obj.listedBy)
    );
  };

  useEffect(() => {
    console.log("Selected Sale or Rent:", saleOrRent);
    const category = propertyData.find((item) => item.label === saleOrRent);
    console.log("Selected Category:", category);

    console.log("Selected Property Type:", propertyType);
    const selectedProperty = category?.objects.find(
      (obj) => obj.label === propertyType
    );
    console.log("Selected Property:", selectedProperty);

    if (isPropertyOptions(selectedProperty)) {
      setOptions(selectedProperty);
    } else {
      setOptions(null);
    }
  }, [saleOrRent, propertyType]);

  const showDetails = options && options.bhk?.length;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Property Form</Text>

        <Text>For Sale or Rent:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.radioScrollContainer}
        >
          {propertyData.map((item) => (
            <View key={item.id} style={styles.radioOption}>
              <RadioButton
                label={item.label}
                selected={saleOrRent === item.label}
                onPress={() => setSaleOrRent(item.label)}
              />
            </View>
          ))}
        </ScrollView>

        {saleOrRent && (
          <>
            <Text>Select Property Type:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.radioScrollContainer}
            >
              {propertyData
                .find((item) => item.label === saleOrRent)
                ?.objects.map((item) => (
                  <View key={item.id} style={styles.radioOption}>
                    <RadioButton
                      label={item.label}
                      selected={propertyType === item.label}
                      onPress={() => setPropertyType(item.label)}
                    />
                  </View>
                ))}
            </ScrollView>
          </>
        )}

        {showDetails && options && (
          <View style={styles.details}>
            <Text style={styles.subtitle}>Property Details</Text>
            <Text>Super Builtup Area (in sqft):</Text>
            <Custom_Input
              keyboardType="numeric"
              value={supperBuiltUpArea}
              onChangeText={(text) => setsupperBuiltUpArea(text)}
              maxLength={20}
            />
            <Text>Carpet Area (in sqft):</Text>
            <Custom_Input
              keyboardType="numeric"
              value={carpetArea}
              onChangeText={(text) => setcarpetArea(text)}
              maxLength={15}
            />
            <Text>Mainteances (Mothley):</Text>
            <Custom_Input
              keyboardType="numeric"
              value={mainteances}
              onChangeText={(text) => setMainteances(text)}
              maxLength={3}
            />
            <Text>Total Floors:</Text>
            <Custom_Input
              keyboardType="numeric"
              value={totalFlor}
              onChangeText={(text) => settotalFlor(text)}
              maxLength={3}
            />
            <Text>Ad Title:</Text>
            <Custom_Input
              keyboardType="numeric"
              value={adTitle}
              onChangeText={(text) => setadTitle(text)}
              maxLength={30}
            />
            <Text>Description:</Text>
            <Custom_Input
              keyboardType="numeric"
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline
              maxLength={4000}
            />

            <Text>BHK:</Text>
            {options.bhk.length ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.radioScrollContainer}
              >
                {options.bhk.map((bhk, index) => (
                  <View key={index} style={styles.radioOption}>
                    <RadioButton
                      label={bhk}
                      selected={selectedBHK === bhk}
                      onPress={() => setSelectedBHK(bhk)}
                    />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text>No BHK options available</Text>
            )}

            <Text>Bathrooms:</Text>
            {options.bathrooms.length ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.radioScrollContainer}
              >
                {options.bathrooms.map((bathroom, index) => (
                  <View key={index} style={styles.radioOption}>
                    <RadioButton
                      label={bathroom}
                      selected={selectedBathroom === bathroom}
                      onPress={() => setSelectedBathroom(bathroom)}
                    />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text>No Bathroom options available</Text>
            )}

            <Text>Furnishing:</Text>
            {options.furnishing.length ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.radioScrollContainer}
              >
                {options.furnishing.map((furnish, index) => (
                  <View key={index} style={styles.radioOption}>
                    <RadioButton
                      label={furnish}
                      selected={selectedFurnishing === furnish}
                      onPress={() => setSelectedFurnishing(furnish)}
                    />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text>No Furnishing options available</Text>
            )}
            <Text>Car Parking:</Text>
            {options.carParking.length ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.radioScrollContainer}
              >
                {options.carParking.map((car, index) => (
                  <View key={index} style={styles.radioOption}>
                    <RadioButton
                      label={car}
                      selected={selectedCarParking === car}
                      onPress={() => setselectedCarParking(car)}
                    />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text>No Furnishing options available</Text>
            )}
            <Text>Listed By:</Text>
            {options.listedBy.length ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.radioScrollContainer}
              >
                {options.listedBy.map((listed, index) => (
                  <View key={index} style={styles.radioOption}>
                    <RadioButton
                      label={listed}
                      selected={selectedlistedBy === listed}
                      onPress={() => setSelectedListedBy(listed)}
                    />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text>No Furnishing options available</Text>
            )}

            <Text>Bachlores:</Text>
            {options.bachlores.length ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.radioScrollContainer}
              >
                {options.bachlores.map((bachlore, index) => (
                  <View key={index} style={styles.radioOption}>
                    <RadioButton
                      label={bachlore}
                      selected={selectedBachlores === bachlore}
                      onPress={() => setSelectedBachlores(bachlore)}
                    />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text>No Furnishing options available</Text>
            )}

            <Text>Facing:</Text>
            {options.facing.length ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.radioScrollContainer}
              >
                {options.facing.map((face, index) => (
                  <View key={index} style={styles.radioOption}>
                    <RadioButton
                      label={face}
                      selected={selectedFacing === face}
                      onPress={() => setSelectedFacing(face)}
                    />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text>No Furnishing options available</Text>
            )}
          </View>
        )}
      </View>
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
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  details: {
    marginTop: 20,
  },
  radioScrollContainer: {
    marginVertical: 10,
  },
  radioOption: {
    marginRight: 10,
  },
});

export default Property_Details;
