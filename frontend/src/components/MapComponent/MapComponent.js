import React, { useEffect, useState } from "react";
import "./MapComponent.css";

const MapComponent = () => {
  const [mapUrl, setMapUrl] = useState(
    "https://maps.google.com/maps?q=0,0&z=2&output=embed"
  );

  // Function to update map URL
  const updateMap = (lat, lng) => {
    if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
      setMapUrl(`https://maps.google.com/maps?q=${lat},${lng}&z=10&output=embed`);
    } else {
      alert("Please enter valid numeric coordinates for latitude and longitude.");
    }
  };

  // Fetch location from the database every few seconds
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/location/driver123"); // Replace with your API endpoint
        const data = await response.json();
        const { latitude, longitude } = data;

        if (latitude && longitude) {
            console.log(latitude,longitude," fetched")
          updateMap(latitude, longitude);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    // Fetch location periodically (e.g., every 5 seconds)
    const interval = setInterval(fetchLocation, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="MapComponent">
        <h1>Map</h1>
      <div className="map-container">
        <iframe
          id="mapFrame"
          title="Google Map"
          src={mapUrl}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MapComponent;
