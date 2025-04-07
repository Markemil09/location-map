import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CustomButtonProps {
    buttonFunction: () => void;
}

const CustomButton = ({ buttonFunction }: CustomButtonProps) => (
    <TouchableOpacity style={styles.button} onPress={buttonFunction}>
        <Text style={styles.buttonText}>My Location</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#808080',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default CustomButton;