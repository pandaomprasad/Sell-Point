import { TextInput, StyleSheet, Dimensions, View, Text } from 'react-native';
import React, { useState } from 'react';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

// Define the props interface
interface CustomInputProps {
  multiline?: boolean; // Optional prop
  maxLength?: number; // Optional prop for maximum length
  keyboardType?: 
    | 'default' 
    | 'email-address' 
    | 'numeric' 
    | 'phone-pad' 
    | 'decimal-pad' 
    | 'ascii-capable' 
    | 'visible-password'; // Optional prop for keyboard type
  value: string; // Required prop for input value
  onChangeText: (text: string) => void; // Required prop for handling text change
}

const Custom_Input: React.FC<CustomInputProps> = ({ multiline, maxLength, keyboardType = 'default', value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, multiline && styles.multilineContainer]} // Apply dynamic styles
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1} // Set number of lines for multiline
        maxLength={maxLength} // Set the maximum length
        value={value} // Bind the input value to the state
        onChangeText={onChangeText} // Handle text change
        keyboardType={keyboardType} // Set the keyboard type dynamically
      />
      {maxLength && (
        <Text style={styles.charCount}>
          {value.length}/{maxLength} characters
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.95,
    alignSelf: 'center',
    margin: 5,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 3,
    height:SCREEN_HEIGHT*0.05
  },
  multilineContainer: {
    height: SCREEN_HEIGHT * 0.1, // Set a larger height for multiline
  },
  charCount: {
    alignSelf: 'flex-end', // Align character count to the right
    marginTop: 5, // Space between input and character count
    color: 'gray', // Color for the character count
  },
});

export default Custom_Input;