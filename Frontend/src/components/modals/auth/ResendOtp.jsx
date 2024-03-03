import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../utils/firebase.config";

const ResendOtp = ({ countryCode, phone }) => {
  const [isDisabeled, setIsDisabeled] = useState(false);
  const resendOtpHandler = async () => {
    if (!phone || phone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    let appVerifier;
    try {
      appVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
      });

      let phoneNo = countryCode + phone;
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNo,
        appVerifier
      );
    } catch (error) {
      // Reset the recaptcha
      console.log("Failed to send OTP: ", error);
    } finally {
      setIsDisabeled(true);
    }
  };
  return (
    <>
      {isDisabeled ? (
        <p className="text-red-700 font-semibold">
          Please Enter the mobile No. again
        </p>
      ) : (
        <p onClick={resendOtpHandler} className="text-purple-600 font-bold">
          resend OTP
        </p>
      )}
      <div id="recaptcha"></div>
    </>
  );
};

export default ResendOtp;
