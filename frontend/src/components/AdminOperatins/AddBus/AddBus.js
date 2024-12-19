import React, { useState } from "react";
import "../AddStudent/AddStudent.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { X } from "lucide-react";

const AddBus = () => {
  
  const [formData, setFormData] = useState({
    busNo: "",
    driverName: "",
    location: "",
  });

  const [errors, setErrors] = useState({
    busNo: "",
    driverName: "",
    location: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { busNo: "", driverName: "", location: "" };

    if (!formData.busNo) {
      newErrors.busNo = "Bus Number is required";
      isValid = false;
    }

    if (!formData.driverName) {
      newErrors.driverName = "Driver Name is required";
      isValid = false;
    }

    if (!formData.location) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSuccessLogin = () => {
    setFormData({
      busNo: "",
      driverName: "",
      location: "",
    });
    console.log("student added succesfully");
  };

  const onFailureLogin = (err) => {
    setErrors({ ...errors, message: err });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("form submitted sucessful");
      const { busNo, driverName, location } = formData;
      const userDetails = {
        bus_number: busNo,
        driver_name: driverName,
        location: location,
      };
      const options = {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(
        "http://localhost:8000/add-bus",
        options
      );
      const data = await response.json();
      if (response.ok === true) {
        onSuccessLogin();
      } else {
        onFailureLogin(data.error);
      }
    }
  };

  return (
    <>
      <Popup
        modal
        trigger={<button className="add-student-button">Add Bus</button>}
      >
        {(close) => (
          <>
            <div className="modal-popup">
              <button className="modal-close-button" onClick={() => close()}>
                <X size={26} />
              </button>

              <h2 className="modal-heading">Add New Bus</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="busNo" className="form-label">
                    Bus Number
                  </label>
                  <input
                    type="text"
                    id="busNo"
                    name="busNo"
                    value={formData.busNo}
                    onChange={handleChange}
                    className="form-input"
                  />
                  {errors.busNo && (
                    <p className="error-message">{errors.busNo}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="driverName" className="form-label">
                    Driver Name
                  </label>
                  <input
                    type="text"
                    id="driverName"
                    name="driverName"
                    value={formData.driverName}
                    onChange={handleChange}
                    className="form-input"
                  />
                  {errors.driverName && (
                    <p className="error-message">{errors.driverName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-input"
                  />
                  {errors.location && (
                    <p className="error-message">{errors.location}</p>
                  )}
                </div>

                <button type="submit" className="submit-button">
                  Add Student
                </button>
                {errors.message && (
                  <p className="error-message">{errors.message}</p>
                )}
              </form>
            </div>
          </>
        )}
      </Popup>
    </>
  );
};

export default AddBus;
