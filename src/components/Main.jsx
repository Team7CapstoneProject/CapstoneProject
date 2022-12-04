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
  getCartProductsByCart,
  getCartByUserId,
  myAccount,
} from "../api";

const localStorageCart = JSON.parse(localStorage.getItem("cart") || "[]");

const Main = () => {
  let token = localStorage.getItem("token");

  //------------GET MY ACCOUNT--------------------
  const [userAccount, setUserAccount] = useState({});
  useEffect(() => {
    if (localStorage.getItem("token")) {
      async function fetchUserAccount() {
        const accountOfUser = await myAccount(token);
        // console.log("user account object!!", accountOfUser)
        setUserAccount(accountOfUser);
        // console.log("user account state data!!", userAccount)
      }
      fetchUserAccount();
    }
  }, []);

  //---------------------SETTING STATE FOR NAVBAR GREETING---------------------
  let initialNavGreeting;
  if (token) {
    initialNavGreeting = `Welcome back, ${localStorage.getItem("first_name")}!`;
  } else {
    initialNavGreeting = "";
  }
  const [navGreeting, setNavGreeting] = useState(initialNavGreeting);

  //-----------GET PRODUCTS DATA------------------
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    async function fetchAllProducts() {
      const productResponse = await getAllProducts();
      setAllProducts(productResponse);
    }
    fetchAllProducts();
  }, []);

  //-----------CREATE CART DATA------------------
  useEffect(() => {
    async function fetchCart() {
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("userId");
      if (token) {
        const userCart = await getCartByUserId(token);
        if (userCart) {
          setCart(userCart[0]);
        } else {
          const newCart = await createCart(token, user_id);
          setCart(newCart);
        }
      }
    }
    fetchCart();
  }, []);

  //-------TESTING CART TO LOCAL STORAGE FUNCTIONALITY-----
  //need to add functionality for detecting if there is not a signed in user, this is for guest user functionality only to persist cart

  //trying this json parse method for pulling cart data from local storage for persistence on the users end

  const [cart, setCart] = useState(localStorageCart);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  //-----------GET CART PRODUCTS BY CART ------------------
  const [cartProducts, setCartProducts] = useState();
  useEffect(() => {
    async function fetchCartProducts() {
      if (cart) {
        const cartId = cart.id;
        const productsInCart = await getCartProductsByCart(cartId);
        setCartProducts(productsInCart);
      }
    }
    fetchCartProducts();
  }, []);

  //-----------ROUTES------------------
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <Navbar
            token={token}
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
          element={<Cart token={token} cart={cart} setCart={setCart} />}
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
          element={<Register setNavGreeting={setNavGreeting} setUserAccount={setUserAccount}/>}
        />

        <Route
          path="/checkout"
          element={
            <Checkout token={token} cart={cart} userAccount={userAccount} />
          }
        />
        <Route path="/orderHistory" element={<CompletedCarts />} />
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
