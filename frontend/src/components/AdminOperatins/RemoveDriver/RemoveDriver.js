import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import '../RemoveStudent/RemoveStudent.css'
import { X } from "lucide-react";

const RemoveDriver = () => {

  const [pinNo, setPinNo] = useState("")

  const [errors, setErrors] = useState({
      pinNo: "",
      message: "",
    });

  const handleChange = e => {
    setPinNo(e.target.value);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { pinNo: ""};

    if (!pinNo) {
      newErrors.pinNo = "Pin number is required";
      isValid = false;
    } else if (pinNo.length < 6) {
      newErrors.pinNo = "Pin number must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSuccessLogin = () => {
    setPinNo('')
    console.log('student Removed succesfully')
  };

  const onFailureLogin = (err) => {
    setErrors({ ...errors, message: err });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if (validateForm()) {
      console.log("form submitted sucessful");
      const userDetails = { student_pin: pinNo};
      const options = {
        method: "DELETE",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(
        "http://localhost:8000/remove-student",
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
        trigger={<button className="rm-student-button">Remove Driver</button>}
      >
        {(close) => (
          <div className="modal-popup">
            <button className="modal-close-button" onClick={()=>close()}>
              <X size={20} />
            </button>

            <h2 className="modal-heading">Remove Driver</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="pinNo"
                  className="form-label"
                >
                  Driver Number
                </label>
                <input
                  type="text"
                  id="pinNo"
                  name="pinNo"
                  value={pinNo}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.pinNo && <p className="error-message">{errors.pinNo}</p>}
              </div>

              <button
                type="submit"
                className='rm-submit-button'
              >
                Remove Driver
              </button>
              {errors.message && <p className="error-message">{errors.message}</p>}
            </form>
          </div>
        )}
      </Popup>
    </>
  );
};

export default RemoveDriver;
