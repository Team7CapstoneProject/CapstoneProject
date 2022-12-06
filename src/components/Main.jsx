import React, { useState, useEffect } from "react";
import {
  AdminDashboard,
  Cart,
  Checkout,
  CompletedCarts,
  Home,
  LogIn,
  Navbar,
  ProductsSearch,
  ProductView,
  Register,
  UserDashboard,
} from "./";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import {
  createCart,
  getAllProducts,
  getCartByUserId,
  myAccount,
  getCartProductsByCart,
} from "../api";

const Main = () => {
  let token = localStorage.getItem("token");

  //------------GET MY ACCOUNT--------------------
  const [userAccount, setUserAccount] = useState({});
  useEffect(() => {
    if (token) {
      async function fetchUserAccount() {
        const response = await myAccount(token);
        setUserAccount(response);
      }
      fetchUserAccount();
    }
  }, []);

  //---------------------SETTING STATE FOR NAVBAR GREETING---------------------
  const [navGreeting, setNavGreeting] = useState("");

  //-----------GET PRODUCTS DATA------------------
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    async function fetchAllProducts() {
      const productResponse = await getAllProducts();
      setAllProducts(productResponse);
    }
    fetchAllProducts();
  }, []);

  //-----------CREATE OR FETCH CART DATA------------------
  const [cart, setCart] = useState();

  useEffect(() => {
    async function fetchCart() {
      const user_id = userAccount.id;
      if (token && user_id) {
        let userCart = await getCartByUserId(token);
        userCart = userCart.filter((cart) => cart.is_complete === false);
        if (userCart.length===1) {
          setCart(userCart[0]);
        } else {
          const newCart = await createCart(token, user_id);
          setCart(newCart);
        }
      }
    }
    fetchCart();
  }, [userAccount]);

  //-----------GET CART PRODUCTS BY CART ------------------
  const [cartProducts, setCartProducts] = useState();
  useEffect(() => {
    async function fetchCartProducts() {
      if (cart) {
        const cartId = cart.id;
        const cartProductsResponse = await getCartProductsByCart(cartId);
        setCartProducts(cartProductsResponse);
      }
    }
    fetchCartProducts();
  }, [cart]);

  //-----------ROUTES------------------
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <Navbar
            token={token}
            cart={cart}
            setUserAccount={setUserAccount}
            userAccount={userAccount}
            navGreeting={navGreeting}
            setNavGreeting={setNavGreeting}
          />
        }
      >
        <Route
          path="/"
          element={
            <Home allProducts={allProducts} setAllProducts={setAllProducts} />
          }
        />

        <Route
          path="/account"
          element={
            <UserDashboard
              token={token}
              userAccount={userAccount}
              setUserAccount={setUserAccount}
              setNavGreeting={setNavGreeting}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <AdminDashboard
              token={token}
              allProducts={allProducts}
              setAllProducts={setAllProducts}
            />
          }
        />

        <Route
          path="/products"
          element={
            <ProductsSearch
              token={token}
              userAccount={userAccount}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              allProducts={allProducts}
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/products/:productId"
          element={<ProductView allProducts={allProducts} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              token={token}
              userAccount={userAccount}
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/login"
          element={
            <LogIn
              setNavGreeting={setNavGreeting}
              setUserAccount={setUserAccount}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              setNavGreeting={setNavGreeting}
              setUserAccount={setUserAccount}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout token={token} cart={cart} userAccount={userAccount} />
          }
        />
        <Route
          path="/orderHistory"
          element={<CompletedCarts cart={cart} setCart={setCart} />}
        />
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
