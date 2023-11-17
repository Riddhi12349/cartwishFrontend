import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../Home/HomePage";
import ProductsPage from "../Products/ProductsPage";
import SingleProductPage from "../Products/SingleProduct/SingleProductPage";
import CartPage from "../Cart/CartPage";
import MyOrderPage from "../MyOrder/MyOrderPage";
import LoginPage from "../Authentication/LogInPage";
import SignupPage from "../Authentication/SignupPage.jsx";
import Logout from "../Authentication/Logout";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/products" element={<ProductsPage />}></Route>
      <Route
        path="/products/product/:id"
        element={<SingleProductPage />}
      ></Route>
      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/" element={<HomePage />}></Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/myorders" element={<MyOrderPage />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Route>
    </Routes>
  );
};

export default Routing;
