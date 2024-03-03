import { useDispatch, useSelector } from "react-redux";
import { openAuthModal } from "../../redux/features/modalSlice";
import { loadUser } from "../../redux/actions/userActions";
import { useEffect } from "react";
import LoginComponent from "../LoginComponent";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  if (isAuthenticated) {
    return children;
  } else {
    return <LoginComponent />;
  }
};

export default ProtectedRoutes;
