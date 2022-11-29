import React, { useState, useEffect } from "react";
import {
  Navbar,
  Home,
  LogIn,
  Register,
  Account,
  ProductsSearch,
  Cart,
  CompletedCarts,
  EditProduct,
} from "./";
import {
  createRoutesFromElements,
  RouterProvider,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import { getAllProducts } from "../api";

const Main = () => {
  //-----------GET PRODUCTS DATA------------------------------
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    async function fetchAllProducts() {
      const productResponse = await getAllProducts();
      setAllProducts(productResponse);
    }
    fetchAllProducts();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route
          path="/products"
          element={<ProductsSearch allProducts={allProducts} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orderhistory" element={<CompletedCarts />} />
        <Route path="/admin" element={<EditProduct />} />
      </Route>
    )
  );

  return (
    <div id="main">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default Main;
