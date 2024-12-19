import React, { useState } from "react";
import "./UpdateStudent.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { X } from "lucide-react";

const UpdateStudent = () => {
  const [formData, setFormData] = useState({
    pinNo: "",
    busNo: "",
  });

  const [errors, setErrors] = useState({
    pinNo: "",
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
    const newErrors = { pinNo: "", busNo: "", message: "" };

    if (!formData.pinNo) {
      newErrors.pinNo = "Pin Number is required";
      isValid = false;
    } else if (formData.pinNo.length < 6) {
      newErrors.pinNo = "Pin Number must be at least 6 characters";
      isValid = false;
    }

    if (!formData.busNo) {
      newErrors.busNo = "Bus Number is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSuccessLogin = () => {
    setFormData({
      pinNo: "",
      busNo: "",
    });
    console.log("student Updated succesfully");
  };

  const onFailureLogin = (err) => {
    setErrors({ ...errors, message: err });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("form submitted sucessful");
      const { pinNo, busNo } = formData;
      const userDetails = {
        student_pin: pinNo,
        bus_number: busNo,
      };
      const options = {
        method: "PUT",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(
        "http://localhost:8000/update-student",
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
        trigger={
          <button className="update-student-button">Update Student</button>
        }
      >
        {(close) => (
          <>
            <div className="modal-popup">
              <button className="modal-close-button" onClick={() => close()}>
                <X size={26} />
              </button>

              <h2 className="modal-heading">Update Student</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="pinNo" className="form-label">
                    PIN Number
                  </label>
                  <input
                    type="text"
                    id="pinNo"
                    name="pinNo"
                    value={formData.pinNo}
                    onChange={handleChange}
                    className="form-input"
                  />
                  {errors.pinNo && (
                    <p className="error-message">{errors.pinNo}</p>
                  )}
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
                  {errors.busNo && (
                    <p className="error-message">{errors.busNo}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="update-submit-button"
                >
                  Update Student
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

export default UpdateStudent;
