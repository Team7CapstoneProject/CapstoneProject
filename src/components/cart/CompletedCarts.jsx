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
