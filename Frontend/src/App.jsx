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
import UserDashboard from "./Pages/User/UserDashboard";
import ProductDetails from "./Pages/Product/ProductDetails";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/Cart/CartPage";
import ApplicationForm from "./components/Buy/ApplicationForm";
import Payment from "./Pages/Buy/Payment";
import ApplicationFormCart from "./components/Buy/ApplicationFormCart";
import AddressPage from "./components/Buy/AddressPage";
import AddressPageCart from "./components/Buy/AddressPageCart";
import EditAddressPage from "./Pages/Buy/EditAddressPage";
import Addresses from "./Pages/Buy/Addresses";
import AddressForm from "./Pages/Buy/AddressForm";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  });
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/shop/products" element={<ProductsPage />}></Route>

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
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/buy/:id" element={<AddressForm />} />
        <Route path="/buy/" element={<AddressForm />} />
        <Route path="/checkout/address/:id" element={<Addresses />} />
        <Route path="/checkout/address/" element={<Addresses />} />
        <Route path="/address/edit/:id" element={<EditAddressPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route
          path="cart"
          element={
            // <ProtectedRoutes>
            <CartPage />
            // </ProtectedRoutes>
          }
        ></Route>
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
