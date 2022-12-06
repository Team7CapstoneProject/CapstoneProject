import React, { useEffect, useState } from "react";
import {
  getCartByUserId
} from "../../api"

const CompletedCarts = ({userAccount}) => {
console.log(userAccount)

const [userCartHistory, setUserCartHistory] = useState();

useEffect(() => {
  let token = localStorage.getItem("token");
  if (token) {
    async function fetchAllUserCarts() {
      let userCarts = await getCartByUserId(token);
      console.log("user cart data", userCarts);
      if (userCarts && userCarts.length) {
        let completedUserCarts = userCarts.filter((cart) => cart.is_complete === true);
        console.log("completed carts", completedUserCarts);
        setUserCartHistory(completedUserCarts);
      }
    }
    fetchAllUserCarts();
  }
}, [])

console.log("user cart history data!", userCartHistory)
  return (
    <div id="orderHistoryContainer">
      <div>Order History</div>
      <div id="orderHistoryItems">
        {
          userCartHistory && userCartHistory.length ? (
            userCartHistory.map((cart) => {
              return(
                <div id="userCompletedCarts" key={`Cart-${cart.id}`}>
                  <div>Order: {cart.id}</div>
                </div>
              )
            })
          ) : (
            <div>No previous order found</div>
          )
        }
      </div>
    </div>

  );
};
export default CompletedCarts;
