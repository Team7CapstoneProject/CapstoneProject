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
  AdminDashboard,
} from "./";
import {
  createRoutesFromElements,
  RouterProvider,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import {
  myAccount,
  createCart,
  getAllProducts,
  getCartProductsByCart,
} from "../api";

const Main = () => {
  //------------VISITING USER---------------------
  // const [unregisteredUser, setUnregisteredUser] = useState([]);
  // useEffect(()=>{
  //   const visitingUser =
  //   setUnregisteredUser(visitingUser)
  // }, [])

  //------------GET MY ACCOUNT--------------------

  let token = localStorage.getItem("token");
  const [userAccount, setUserAccount] = useState([]);
  useEffect(() => {
    async function fetchUserAccount() {
      const accountOfUser = await myAccount(token);
      setUserAccount(accountOfUser);
    }
    fetchUserAccount();
  }, []);

  //-----------GET PRODUCTS DATA------------------
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    async function fetchAllProducts() {
      const productResponse = await getAllProducts();
      // console.log("all product data", productResponse)
      setAllProducts(productResponse);
    }
    fetchAllProducts();
  }, []);

  //-----------CREATE CART DATA------------------
  const [cart, setCart] = useState([]);
  useEffect(() => {
    async function fetchCart() {
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("userId");

      const userCart = await createCart(token, user_id);

      setCart(userCart);
    }
    fetchCart();
  }, []);
  //-----------GET CARTPRODUCTS BY CART ------------------

  const [cartProducts, setCartProducts] = useState();
  useEffect(() => {
    async function fetchCartProducts() {
      const cart_id = cart.id;
      const productsInCart = await getCartProductsByCart(cart_id);
      setCartProducts(productsInCart);
    }
    fetchCartProducts();
  }, []);

  //-----------ROUTES------------------
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route
          path="/products"
          element={
            <ProductsSearch
              allProducts={allProducts}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              // userCart={userCart}
              // setUserCart={setUserCart}
            />
          }
        />
        <Route path="/orderhistory" element={<CompletedCarts />} />
        <Route path="/admin" element={<AdminDashboard />} />
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
