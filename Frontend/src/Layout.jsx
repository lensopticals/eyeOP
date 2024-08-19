import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/modals/auth/Login";
import SignUp from "./components/modals/auth/SignUp";
import { useSelector } from "react-redux";
import UpdatePassword from "./components/modals/auth/UpdatePassword";
import UpdatePhone from "./components/modals/auth/UpdatePhone";
import UpdateEmail from "./components/modals/auth/UpdateEmail";
import ScrollToTop from "./components/ScrollToTop";
const Layout = () => {
  const { isOpen, type } = useSelector((state) => state.authModal);
  return (
    <>
      <ScrollToTop />
      <Navbar />
      {isOpen && type === "login" && <Login />}
      {isOpen && type === "signup" && <SignUp />}
      {isOpen && type === "password" && <UpdatePassword />}
      {isOpen && type === "phone" && <UpdatePhone />}
      {isOpen && type === "email" && <UpdateEmail />}

      <main className="overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
