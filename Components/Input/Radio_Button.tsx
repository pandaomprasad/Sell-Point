import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get("window").height;

// Define props for the OptionSelector component
interface OptionSelectorProps<T> {
    options: { id: string; label: string; value: T }[];
    onSelect?: (value: T) => void;
    selectedValue?: T | null; // Optional prop to control the selected value
}

const OptionSelector = <T,>({ options, onSelect, selectedValue }: OptionSelectorProps<T>) => {
    const handleSelect = (value: T) => {
        if (onSelect) {
            onSelect(value);
        }
    };

    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ height: SCREEN_HEIGHT * 0.1 }}
        >
            <View style={styles.container}>
                {options.map((option) => {
                    // Debugging logs
                    console.log('Selected Value:', selectedValue);
                    console.log('Current Option Value:', option.value);

                    return (
                        <TouchableOpacity
                            key={option.id}
                            style={[
                                styles.option,
                                selectedValue === option.value && styles.selectedOption
                            ]}
                            onPress={() => handleSelect(option.value)}
                        >
                            <Text style={[
                                styles.optionText,
                                selectedValue === option.value && styles.selectedOptionText
                            ]}>
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    option: {
        padding: 10,
        width: 120, 
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    selectedOption: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    optionText: {
        color: '#333',
        textAlign: 'center',
    },
    selectedOptionText: {
        color: '#fff',
    },
});

export default OptionSelector;