import { useEffect, useState } from "react";
import * as Location from 'expo-location';

interface Coordinates {
    latitude: number;
    longitude: number;
}

export default function useUserLocation() {
    const [location, setLocation] = useState<Coordinates | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let subscriber: Location.LocationSubscription | null = null;

        const requestLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permission to access location was denied');
                    setLoading(false);
                    return;
                }

                const loc = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });

                setLocation(loc.coords);
                setLoading(false);

                subscriber = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.High,
                        timeInterval: 5000,
                        distanceInterval: 10,
                    },
                    (locUpdate) => setLocation(locUpdate.coords)
                );
            } catch (error) {
                console.error('Error fetching location', error);
                setLoading(false);
            }
        };

        requestLocation();

        return () => {
            if (subscriber) {
                subscriber.remove();
            }
        };
    }, []);

    return { location, loading };
}