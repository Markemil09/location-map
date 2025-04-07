// app/components/LocationTracker.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, Alert, Text } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { getAddressFromCoordinates } from '../utils/geocoding';
import CustomButton from './CustomButton';
import LocationSearch from './LocationSearch';
import LocationDetails from './LocationDetails';
import LoadingScreen from './LoadingScreen';

const MapComponent = () => {
    const [location, setLocation] = useState<any>(null);
    const [address, setAddress] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const mapRef = useRef<MapView | null>(null);
    const [userLocation, setUserLocation] = useState<Location.LocationObjectCoords | null>(null); // Your actual GPS
    const [searchedLocation, setSearchedLocation] = useState<Location.LocationObjectCoords | null>(null); // Search result
    const [searchedAddress, setSearchedAddress] = useState<string>('');

    useEffect(() => {
        const requestLocationPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'We need location permissions to access your location.');
                setLoading(false);
                return;
            }

            const userLoc = await Location.getCurrentPositionAsync({});
            setUserLocation(userLoc.coords);

            const addr = await getAddressFromCoordinates(userLoc.coords.latitude, userLoc.coords.longitude);
            setSearchedAddress(addr); // optional: show your location on initial load
            setLoading(false);
        };

        requestLocationPermission();
    }, []);

    const recenterMap = () => {
        if (location) {
            mapRef.current?.animateToRegion(
                {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                } as Region,
                1000
            );
        }
    };

    if (loading || !location) {
        return <LoadingScreen />;
    }

    return (
        <View style={{ flex: 1, paddingBottom: 30 }}>
            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: userLocation?.latitude ?? 0,
                    longitude: userLocation?.longitude ?? 0,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                showsUserLocation
            >
                {userLocation && (
                    <Marker
                        coordinate={userLocation}
                        pinColor="blue"
                        title="My Location"
                    />
                )}

                {searchedLocation && (
                    <Marker
                        coordinate={searchedLocation}
                        title="Searched Place"
                        description={searchedAddress}
                    />
                )}
            </MapView>


            <LocationSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSearchedLocation={(coords) => {
                    setSearchedLocation(coords);
                    mapRef.current?.animateToRegion({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                }}
                setSearchedAddress={setSearchedAddress}
            />
            <LocationDetails location={location} address={address} />
            <CustomButton buttonFunction={recenterMap} />
        </View>
    );
};

export default MapComponent;
