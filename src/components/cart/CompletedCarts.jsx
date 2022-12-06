import React, { useEffect, useState } from "react";
import { getCartByUserId } from "../../api";

const CompletedCarts = ({ userAccount }) => {
  console.log(userAccount);

  const [userCartHistory, setUserCartHistory] = useState();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      async function fetchAllUserCarts() {
        let userCarts = await getCartByUserId(token);
        console.log("user cart data", userCarts);
        if (userCarts && userCarts.length) {
          let completedUserCarts = userCarts.filter(
            (cart) => cart.is_complete === true
          );
          console.log("completed carts", completedUserCarts);
          setUserCartHistory(completedUserCarts);
        }
      }
      fetchAllUserCarts();
    }
  }, []);

  console.log("user cart history data!", userCartHistory);
  return (
    <div className="orderHistoryContainer">
      <h2 className="cartHeader">Your order history</h2>
      <div id="orderHistoryItems">
        {userCartHistory && userCartHistory.length ? (
          userCartHistory.map((cart) => {
            return (
              <div className="userCompletedCarts" key={`Cart-${cart.id}`}>
                <div>Order: {cart.id}</div>
                <div id="orderHistoryProducts">
                  {cart.products && cart.products.length
                    ? cart.products.map((product) => {
                        return (
                          <div
                            className="individualOrderHistoryProduct"
                            key={`product-${product.id}`}
                          >
                            <div className="infoDiv">
                              Product purchased: {product.name}
                            </div>
                            <div className="infoDiv">
                              Price: ${product.price}
                            </div>
                            <div className="infoDiv">
                              Quantity: {product.quantity}
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            );
          })
        ) : (
          <div>No previous orders found</div>
        )}
      </div>
    </div>
  );
};
export default CompletedCarts;
