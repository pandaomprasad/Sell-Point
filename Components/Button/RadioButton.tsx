import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View,Dimensions } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").height;
interface RadioButtonProps {
    label: string;
    selected: boolean;
    onPress: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, selected, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.container, selected && styles.selectedContainer]}
            onPress={onPress}
        >
            <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 10,
        borderColor: '#007bff',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        paddingHorizontal:SCREEN_WIDTH*0.05
    },
    selectedContainer: {
        backgroundColor: '#007bff',
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    selectedLabel: {
        color: '#fff',
    },
});

export default RadioButton;

// Now the circle is removed, and the whole button fills on selection! Let me know if you’d like anything else adjusted. 🚀
