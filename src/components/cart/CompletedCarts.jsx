import React, { useEffect, useState } from "react";
import { getCartByUserId } from "../../api";

const CompletedCarts = ({ token, userAccount }) => {
  const [userCartHistory, setUserCartHistory] = useState();

  useEffect(() => {
    if (token) {
      async function fetchAllUserCarts() {
        let userCarts = await getCartByUserId(token);
        if (userCarts && userCarts.length) {
          let completedUserCarts = userCarts.filter(
            (cart) => cart.is_complete === true
          );
          setUserCartHistory(completedUserCarts);
        }
      }
      fetchAllUserCarts();
    }
  }, []);

  return (
    <div id="orderHistoryContainer">
      <div>Order History</div>
      <div id="orderHistoryItems">
        {userCartHistory && userCartHistory.length ? (
          userCartHistory.map((cart) => {
            return (
              <div id="userCompletedCarts" key={`Cart-${cart.id}`}>
                <div>Order Number: {cart.id}</div>
                <div>Content:</div>
                <div id="orderHistoryProducts">
                  {
                    cart.products && cart.products.length ? (
                      cart.products.map((product) => {
                       return (
                        <div key={`product-${product.id}`}>
                          <div>Name: {product.name}</div>
                          <div>Price: {product.price}</div>
                          <div>Quantity: {product.quantity}</div>
                        </div>
                        )
                      })
                    ) : null
                  }
                </div>
              </div>
            );
          })
        ) : (
          <div>No previous order found</div>
        )}
      </div>
    </div>
  );
};
export default CompletedCarts;
