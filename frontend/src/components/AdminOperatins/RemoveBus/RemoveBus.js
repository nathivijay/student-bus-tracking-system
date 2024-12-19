import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import '../RemoveStudent/RemoveStudent.css'
import { X } from "lucide-react";

const RemoveBus = () => {

  const [busNo, setBusNo] = useState("")

  const [errors, setErrors] = useState({
      busNo: "",
      message: "",
    });

  const handleChange = e => {
    setBusNo(e.target.value);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { pinNo: ""};

    if (!busNo) {
      newErrors.pinNo = "Pin number is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSuccessLogin = () => {
    setBusNo('')
    console.log('student Removed succesfully')
  };

  const onFailureLogin = (err) => {
    setErrors({ ...errors, message: err });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if (validateForm()) {
      console.log("form submitted sucessful");
      const userDetails = { bus_number: busNo};
      const options = {
        method: "DELETE",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(
        "http://localhost:8000/remove-bus",
        options
      );
      const data = await response.json();
      if (response.ok === true) {
        onSuccessLogin();
      } else {
        onFailureLogin(data.error);
      }
    }
  }

  return (
    <>
      <Popup
        modal
        trigger={<button className="rm-student-button">Remove Bus</button>}
      >
        {(close) => (
          <div className="modal-popup">
            <button className="modal-close-button" onClick={()=>close()}>
              <X size={20} />
            </button>

            <h2 className="modal-heading">Remove Bus</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="busNo"
                  className="form-label"
                >
                  Bus Number
                </label>
                <input
                  type="text"
                  id="busNo"
                  name="busNo"
                  value={busNo}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.busNo && <p className="error-message">{errors.busNo}</p>}
              </div>

              <button
                type="submit"
                className='rm-submit-button'
              >
                Remove Student
              </button>
              {errors.message && <p className="error-message">{errors.message}</p>}
            </form>
          </div>
        )}
      </Popup>
    </>
  );
};

export default RemoveBus;
