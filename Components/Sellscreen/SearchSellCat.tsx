import React, { useState, useRef } from "react";
import { View, TextInput, TouchableOpacity, Animated, StyleSheet,Dimensions } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

type SearchInputProps = {
  onSearch: (query: string) => void;
};

const SearchSellCat: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [text, setText] = useState<string>("");
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = (): void => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = (): void => {
    if (!text) {
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleChangeText = (input: string): void => {
    const filteredText = input.replace(/[^a-zA-Z]/g, "");
    setText(filteredText);
    onSearch(filteredText);
  };

  const clearText = (): void => {
    setText("");
    onSearch("");
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "80deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, { transform: [{ rotate: rotateInterpolate }] }]}> 
        <Feather name="search" size={16} color={text ? "#15A986" : "#111"} />
      </Animated.View>
      <TextInput
        style={styles.input}
        placeholder="Search categories"
        value={text}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {text.length > 0 && (
        <TouchableOpacity style={styles.closeBtn} onPress={clearText}>
          <AntDesign name="close" size={16} color="#111" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 40,
    width: SCREEN_WIDTH*0.9,
    position: "relative",
    alignSelf:'center',
    marginVertical:15
  },
  iconContainer: {
    position: "absolute",
    left: 10,
  },
  input: {
    flex: 1,
    paddingLeft: 30,
    height: "100%",
  },
  closeBtn: {
    position: "absolute",
    right: 10,
    padding: 5,
  },
});

export default SearchSellCat;
