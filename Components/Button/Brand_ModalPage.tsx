import React from "react";
import { Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../Navigation/navigation";
import BrandChoose from "../Bottom Sheet/BrandChoose";
// import { RootStackParamList } from './path/to/your/types'; // Import the type!

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

interface BrandModalPageProps {
  vehicleType: 'Car' | 'Bike';
  onSelect?: (selectedBrand: string, selectedModel: string) => void; // Add the onSelect prop
}


// Tell useNavigation what type of routes are allowed
type NavigationProps = StackNavigationProp<RootStackParamList, 'BrandChoose'>;

const Brand_ModalPage: React.FC<BrandModalPageProps> = ({ vehicleType }) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          console.log("Button pressed, navigating to another screen");
          navigation.navigate("BrandChoose", { vehicleType,
            onSelect: (selectedBrand: string, selectedModel: string) => {
              console.log("Selected Brand:", selectedBrand);
              console.log("Selected Model:", selectedModel);
            },
      
          }); // Navigate with type safety
          
        }}
      >
        <Text>Select {vehicleType} Brand</Text>
        <AntDesign name="down" size={20} color="black" />
      </TouchableOpacity>
      {/* <BrandChoose vehicleType={vehicleType} /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.95,
    alignSelf: "center",
    margin: 5,
    height: SCREEN_HEIGHT * 0.05,
    borderRadius: 5,
    borderWidth: 1,
    padding: 3,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Brand_ModalPage;
