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
  Checkout,
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
  getCartByUserId,
} from "../api";

const Main = () => {
  //------------GET MY ACCOUNT--------------------
  const [userAccount, setUserAccount] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
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
   if (userAccount.first_name) {
     const nameDisplay = userAccount.first_name
     initialNavGreeting = `Welcome back, ${nameDisplay}!`;
   } else {
     initialNavGreeting = "";
   }
   const [navGreeting, setNavGreeting] = useState(initialNavGreeting);
 
     // let initialNavGreeting;
   // if (token) {
   //   initialNavGreeting = `Welcome back, ${localStorage.getItem("first_name")}!`;
   // } else {
   //   initialNavGreeting = "";
   // }
 
   //------------VISITING USER---------------------
   // const [unregisteredUser, setUnregisteredUser] = useState([]);
   // useEffect(()=>{
   //   const visitingUser =
   //   setUnregisteredUser(visitingUser)
   // }, [])

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
  const [cart, setCart] = useState([]);
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
          <Navbar navGreeting={navGreeting} setNavGreeting={setNavGreeting} userAccount={userAccount} />
        }
      >
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<LogIn setNavGreeting={setNavGreeting} />}
        />
        <Route
          path="/register"
          element={<Register setNavGreeting={setNavGreeting} />}
        />
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
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} userAccount={userAccount} />}
        />
        <Route path="/orderhistory" element={<CompletedCarts />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    )
  );

  console.log("user account state data!!", userAccount)
  return (
    <div id="main">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default Main;
