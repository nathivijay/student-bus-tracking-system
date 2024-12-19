import React, { useState } from "react";
import "./AddStudent.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { X } from "lucide-react";

const AddStudentModal = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    pinNo: "",
    busNo: "",
  });

  const [errors, setErrors] = useState({
    name: "",
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
    const newErrors = { name: "", pinNo: "", busNo: "", message: "" };

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

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
      name: "",
      pinNo: "",
      busNo: "",
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
      const { name, pinNo, busNo } = formData;
      const userDetails = {
        student_pin: pinNo,
        student_name: name,
        bus_number: busNo,
        password: pinNo,
      };
      const options = {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(
        "http://localhost:8000/add-student",
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
        trigger={<button className="add-student-button">Add Student</button>}
      >
        {(close) => (
          <>
            <div className="modal-popup">
              <button className="modal-close-button" onClick={() => close()}>
                <X size={26} />
              </button>

              <h2 className="modal-heading">Add New Student</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="form-label">
                    Student Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                  {errors.name && (
                    <p className="error-message">{errors.name}</p>
                  )}
                </div>

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

export default AddStudentModal;
