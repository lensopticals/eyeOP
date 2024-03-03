import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthModal = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthtype] = useState("signUp");
  return (
    <div className="z-[1000]">
      {showAuthModal && authType === "login" && <Login />}
    </div>
  );
};

export default AuthModal;
