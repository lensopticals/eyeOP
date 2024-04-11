import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/modals/auth/Login";
import SignUp from "./components/modals/auth/SignUp";
import { useSelector } from "react-redux";
import UpdatePassword from "./components/modals/auth/UpdatePassword";
import UpdatePhone from "./components/modals/auth/UpdatePhone";
const Layout = () => {
  const { isOpen, type } = useSelector((state) => state.authModal);
  return (
    <>
      <Navbar />
      {isOpen && type === "login" && <Login />}
      {isOpen && type === "signup" && <SignUp />}
      {isOpen && type === "password" && <UpdatePassword />}
      {isOpen && type === "phone" && <UpdatePhone />}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
