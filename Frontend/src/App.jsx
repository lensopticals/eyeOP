import Layout from "./Layout";
import ProfilePage from "./Pages/User/ProfilePage";
import ProductCard from "./components/ProductCard";
import ProductsPage from "./Pages/Product/ProductsPage";
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
import UserDashboard from "./Pages/User/UserDashboard";
import ProductDetails from "./Pages/Product/ProductDetails";
import HomePage from "./Pages/Home/HomePage";
import CartPage from "./Pages/Cart/CartPage";
import Payment from "./Pages/Buy/Payment";
import EditAddressPage from "./Pages/Buy/EditAddressPage";
import AddressForm from "./Pages/Buy/AddressForm";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OrderPage from "./Pages/Orders/OrderPage";
import OrderDetail from "./Pages/Orders/OrderDetail";
import MyAddress from "./Pages/User/MyAddress";
import Addresses from "./Pages/Buy/Addresses";

import Transactions from "./Pages/User/Transactions";
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
          path="transactions"
          element={
            <ProtectedRoutes>
              <Transactions />
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
        <Route
          path="my/addresses"
          element={
            <ProtectedRoutes>
              <MyAddress />
            </ProtectedRoutes>
          }
        ></Route>
        <Route path="/shop/:category" element={<ProductByCategory />} />
        <Route path="/product/:slug/:id" element={<ProductDetails />} />
        <Route
          path="/buy/:id"
          element={
            <ProtectedRoutes>
              <AddressForm />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/buy/"
          element={
            <ProtectedRoutes>
              <AddressForm />
            </ProtectedRoutes>
          }
        />
        <Route path="/checkout/address/:id" element={<Addresses />} />
        <Route path="/checkout/address/" element={<Addresses />} />
        <Route path="/address/edit/:id" element={<EditAddressPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/order/:id" element={<OrderDetail />} />
        <Route
          path="cart"
          element={
            <ProtectedRoutes>
              <CartPage />
            </ProtectedRoutes>
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
