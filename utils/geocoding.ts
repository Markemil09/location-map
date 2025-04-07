import * as Location from 'expo-location';

export const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
    try {
        const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        return geocode.length > 0 ? `${geocode[0]?.name}, ${geocode[0]?.street}. ${geocode[0]?.city}, ${geocode[0]?.country}` : 'No address available';
    } catch (error) {
        return 'No address available';
    }
};