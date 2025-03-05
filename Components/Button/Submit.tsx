import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ViewStyle,
  TextStyle,
} from "react-native";
import React from "react";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

// Define the props type for the Submit component
interface SubmitProps {
  style?: ViewStyle; // Optional style prop for the container
}

const Submit: React.FC<SubmitProps> = ({ style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]}> 
      <Text style={styles.textContainer}>Submit</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    height: SCREEN_HEIGHT * 0.064,
    width: SCREEN_WIDTH * 0.95,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textContainer: {
    fontSize: SCREEN_HEIGHT * 0.025,
    color: "white",
    fontWeight: "700",
  },
});

export default Submit;