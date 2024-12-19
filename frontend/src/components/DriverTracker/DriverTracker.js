import React, { useEffect, useState } from "react";

const DriverTracker = () => {
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);

  // Function to send location to the server
  const sendLocationToServer = (latitude, longitude) => {
    fetch("http://localhost:8000/api/location", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        driverId: "driver123", // Replace with dynamic driver ID
        latitude,
        longitude,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update location");
        }
      })
      .catch((error) => console.error("Error sending location:", error));
  };

  useEffect(() => {
    // Check if Geolocation API is available
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Driver's location:", latitude, longitude);

          // Send the location to the server
          sendLocationToServer(latitude, longitude);

          setIsLocationEnabled(true); // Location is enabled and being tracked
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocationEnabled(false); // Location services are disabled or failed
        },
        {
          enableHighAccuracy: true, // Use GPS for accurate results
          maximumAge: 0, // Always get fresh data
          timeout: 10000, // Timeout after 10 seconds
        }
      );

      // Cleanup function to stop watching the location when component unmounts
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation is not supported by this browser.");
      setIsLocationEnabled(false); // Geolocation is not supported
    }
  }, []);

  return (
    <>
      <div>
        {!isLocationEnabled ? (
          <p style={{ color: "red" }}>
            Please enable location services for real-time tracking.
          </p>
        ) : (
          <div>Sharing location...</div>
        )}
        {/* Rest of the driver interface */}
      </div>
    </>
  );
};

export default DriverTracker;
