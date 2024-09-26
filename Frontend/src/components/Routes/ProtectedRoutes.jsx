import { useDispatch, useSelector } from "react-redux";
import { closeAuthModal, openAuthModal } from "../../redux/features/modalSlice";
import { loadUser } from "../../redux/actions/userActions";
import { useEffect } from "react";
import LoginComponent from "../LoginComponent";
import Login from "../modals/auth/Login";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { isOpen } = useSelector((state) => state.authModal);

  const navigate = useNavigate();
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
