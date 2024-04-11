import Layout from "./Layout";
import ProfilePage from "./Pages/User/ProfilePage";
import ProductCard from "./components/ProductCard";
import ProductsPage from "./components/ProductsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/userActions";
import EditProfile from "./Pages/User/EditProfile";
import ProductByCategory from "./Pages/Product/ProductByCategory";
import Navbar from "./components/Navbar";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  });
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<ProductsPage />}></Route>

        <Route
          path="my/profile"
          element={
            <ProtectedRoutes>
              <ProfilePage />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="my/dashboard"
          element={
            <ProtectedRoutes>
              <UserDashboard />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="profile/edit"
          element={
            <ProtectedRoutes>
              <EditProfile />
            </ProtectedRoutes>
          }
        ></Route>
        <Route path="/shop/:category" element={<ProductByCategory />} />
        <Route path="/allProducts/:id" element={<ProductDetails />} />
      </Route>
    )
  );

  return (
    <main>
      <ToastContainer autoClose={2000} />
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
