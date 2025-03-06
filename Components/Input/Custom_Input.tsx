import { TextInput, StyleSheet, Dimensions, View, Text } from 'react-native';
import React, { useState } from 'react';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

interface CustomInputProps {
  multiline?: boolean;
  maxLength?: number;
  keyboardType?: 
    | 'default' 
    | 'email-address' 
    | 'numeric' 
    | 'phone-pad' 
    | 'decimal-pad' 
    | 'ascii-capable' 
    | 'visible-password';
  value: string;
  onChangeText: (text: string) => void;
}

const Custom_Input: React.FC<CustomInputProps> = ({ multiline, maxLength, keyboardType = 'default', value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);

  // Determine border color based on focus and value
  const getBorderColor = () => {
    if (isFocused) return '#007bff'; // Blue when focused
    if (value) return '#007bff'; // Green if value is present
    return '#ccc'; // Default gray
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input, 
          multiline && styles.multilineContainer,
          { borderColor: getBorderColor() } // Dynamic border color
        ]}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        maxLength={maxLength}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)} // Handle focus
        onBlur={() => setIsFocused(false)} // Handle blur
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
    height: SCREEN_HEIGHT * 0.05,
  },
  multilineContainer: {
    height: SCREEN_HEIGHT * 0.1,
  },
  charCount: {
    alignSelf: 'flex-end',
    marginTop: 5,
    color: 'gray',
  },
});

export default Custom_Input;
