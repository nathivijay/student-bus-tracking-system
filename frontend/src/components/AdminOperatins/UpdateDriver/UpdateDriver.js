// UpdateStudent

import React, { useState } from "react";
import "../UpdateStudent/UpdateStudent.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { X } from "lucide-react";

const UpdateDriver = () => {
  const [formData, setFormData] = useState({
    name: "",
    busNo: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    busNo: "",
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
    const newErrors = { busNo: "", name: "", message: "" };

    if (!formData.busNo) {
      newErrors.busNo = "Bus Number is required";
      isValid = false;
    }

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSuccessLogin = () => {
    setFormData({
      busNo: "",
      name: "",
    });
    console.log("Bus Updated succesfully");
  };

  const onFailureLogin = (err) => {
    setErrors({ ...errors, message: err });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("form submitted sucessful");
      const { busNo, name } = formData;
      const userDetails = {
        bus_number: busNo,
        driver_name: name,
      };
      const options = {
        method: "PUT",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8000/update-bus", options);
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
        trigger={
          <button className="update-student-button">Update Driver</button>
        }
      >
        {(close) => (
          <>
            <div className="modal-popup">
              <button className="modal-close-button" onClick={() => close()}>
                <X size={26} />
              </button>

              <h2 className="modal-heading">Update Driver</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="form-label">
                    Driver Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                  {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

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
                  {errors.busNo && <p className="error-message">{errors.busNo}</p>}
                </div>

                <button
                  type="submit"
                  //   disabled={!isValid}
                  //   className={`w-full py-2 px-4 rounded-md text-white ${
                  //     isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                  //   } transition-colors`}
                  className={`update-submit-button`}
                >
                  Update Driver
                </button>
                  {errors.message && <p className="error-message">{errors.message}</p>}
                  </form>
            </div>
          </>
        )}
      </Popup>
    </>
  );
};

export default UpdateDriver;
