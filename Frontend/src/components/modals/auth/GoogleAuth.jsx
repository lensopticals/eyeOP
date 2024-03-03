import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../../utils/firebase.config";
import { googleAuth } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const googleLoginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      dispatch(
        googleAuth({
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        })
      );
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };
  return (
    <button
      onClick={googleLoginHandler}
      className="flex items-center justify-center w-full py-4 my-1 text-sm font-medium transition duration-300 rounded-lg text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-200"
    >
      <img
        className="h-5 mr-2"
        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
        alt
      />
      Sign in with Google
    </button>
  );
};

export default GoogleAuth;
