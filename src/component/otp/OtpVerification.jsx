import React, { useState } from "react";
import { otpVerify } from "../Healper/apiCalling";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function OptVerification(props) {
  const [data, setData] = useState({
    userData: props.userData,
    otp: "",
  });
  const [showLoader, setShowLoader] = useState(false);

  const navigate = useNavigate();

  function navigateToAnother() {
    navigate("/");
  }

  async function handleProcess(values, e) {
    e.preventDefault();
    otpVerify(values).then((e) => {
      console.log(e);
      if (e.success === true) {
        setShowLoader(true);
        setTimeout(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: e.message,
            showConfirmButton: false,
            timer: 3000,
          });
          Cookies.set("LoggedIn", true);
          navigateToAnother();
        }, 2500);
      } else {
        setTimeout(() => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: e.message,
            showConfirmButton: false,
            timer: 3000,
          });
          setShowLoader(false);
        }, 2500);
      }
    });
  }

  return (
    <div className="otp-container">
      <h1 className="otp-heading">Enter OTP to Verify</h1>
      <form className="otp-form">
        <label className="otp-label">OTP:</label>
        <input
          className="otp-input"
          type="text"
          placeholder="Enter OTP"
          required
          value={data.otp}
          onChange={(event) =>
            setData({
              ...data,
              otp: event.target.value,
            })
          }
        />
        <button
          className="otp-button"
          type="submit"
          disabled={data.otp !== "" ? false : true}
          onClick={(e) => handleProcess(data, e)}
        >
          Verify
          {showLoader ? <Loader /> : ""}
        </button>
      </form>
    </div>
  );
}
