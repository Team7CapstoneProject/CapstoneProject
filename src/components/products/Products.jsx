import React from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../";

const Products = ({ token, userAccount, products, cart, setCart, setNavGreeting }) => {
  let { productId } = useParams();
  return (
    <>
      <div className="products">
        {products && products.length ? (
          products.map((product) => {
            productId = product.id;
            return (
              <Link
                key={`link-${product.id}`}
                className="productsLink"
                to={`${productId}`}
              >
                <Product
                  key={`productId-${product.id}`}
                  product={product}
                  token={token}
                  userAccount={userAccount}
                  cart={cart}
                  setCart={setCart}
                  setNavGreeting={setNavGreeting}
                />
              </Link>
            );
          })
        ) : (
          <div>No Products Found</div>
        )}
      </div>
    </>
  );
};

export default Products;
