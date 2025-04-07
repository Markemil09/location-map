// app/components/LocationSearch.tsx
import React from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as Location from 'expo-location';

interface Props {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    setSearchedLocation: (location: Location.LocationObjectCoords) => void;
    setSearchedAddress: (address: string) => void;
}

const LocationSearch = ({ searchQuery, setSearchQuery, setSearchedLocation, setSearchedAddress }: Props) => {
    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        try {
            const results = await Location.geocodeAsync(searchQuery);
            if (results.length > 0) {
                const { latitude, longitude } = results[0];
                const coords = { latitude, longitude } as Location.LocationObjectCoords;
                setSearchedLocation(coords);

                const [place] = await Location.reverseGeocodeAsync(coords);
                const address = `${place.name}, ${place.street}, ${place.city}, ${place.country}`;
                setSearchedAddress(address);
            } else {
                alert('No results found.');
            }
        } catch (err) {
            alert('Error searching for location');
        }
    };

    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for places"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                <Text style={styles.buttonText}>Go</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        position: 'absolute',
        top: 50,
        left: 10,
        right: 10,
        flexDirection: 'row',
        zIndex: 1,
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    searchButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 15,
        justifyContent: 'center',
        marginLeft: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    },
});

export default LocationSearch;
