import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/modals/auth/Login";
import SignUp from "./components/modals/auth/SignUp";
import { useSelector } from "react-redux";
const Layout = () => {
  const { isOpen, type } = useSelector((state) => state.authModal);
  return (
    <>
      <Navbar />
      {isOpen && (type === "login" ? <Login /> : <SignUp />)}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
