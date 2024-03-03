import React, { useEffect } from "react";
import { toast } from "react-toastify";

const HomePage = () => {
  useEffect(() => {
    toast.success("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }, []);
  return <div>HomePage</div>;
};

export default HomePage;
