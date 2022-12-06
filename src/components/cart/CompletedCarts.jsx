import React, { useEffect, useState } from "react";
import {
  getCartByUserId
} from "../../api"

const CompletedCarts = ({userAccount}) => {
console.log(userAccount)

const [userCartHistory, setUserCartHistory] = useState([]);

useEffect(() => {
  let token = localStorage.getItem("token")
  if (token) {
    async function fetchAllUserCarts() {
      let userCarts = await getCartByUserId(token)
      console.log("user cart data", userCarts)
    }
    fetchAllUserCarts();
  }
}, [])

  return (
    <div id="orderHistoryContainer">
      <div>Order History</div>

    </div>

  );
};
export default CompletedCarts;
