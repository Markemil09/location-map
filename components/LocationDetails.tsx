import React from "react";
import { Text, View, StyleSheet } from 'react-native';

interface LocationDetailsProps {
    location: any;
    address: string;
}

const LocationDetails = ({ location, address }: LocationDetailsProps) => (
    <View style={styles.detailsContainer}>
        <Text style={styles.locationDetails}>Address: {address}</Text>
    </View>
);

const styles = StyleSheet.create({
    detailsContainer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
    },
    locationDetails: {
        fontSize: 16,
        color: '#333',
    }
});

export default LocationDetails;