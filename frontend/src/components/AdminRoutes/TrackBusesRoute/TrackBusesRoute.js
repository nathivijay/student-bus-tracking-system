import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '500px',
};

const center = { lat: 12.971598, lng: 77.594566 }; // Default location (e.g., Bangalore)

const TrackBusesRoute = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'YOUR_API_KEY', // Replace with your actual API key
    });

    const [busLocation, setBusLocation] = useState(center); // State to store the bus location

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch('/api/location/driver123'); // Replace with actual driver ID
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json(); // Parse the JSON response
                const { latitude, longitude } = data; // Extract latitude and longitude
                setBusLocation({ lat: latitude, lng: longitude }); // Update state with new location
            } catch (error) {
                console.error('Error fetching location:', error);
            }
        };

        fetchLocation(); // Fetch the initial location

        const interval = setInterval(fetchLocation, 5000); // Fetch location every 5 seconds
        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    if (!isLoaded) return <div>Loading...</div>; // Show a loading message until the map is ready

    return (
        <GoogleMap mapContainerStyle={mapContainerStyle} center={busLocation} zoom={14}>
            <Marker position={busLocation} /> {/* Marker to show the bus location */}
        </GoogleMap>
    );
};

export default TrackBusesRoute;
