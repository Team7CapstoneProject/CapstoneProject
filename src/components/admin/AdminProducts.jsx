import React from "react";
import { AdminProduct } from "..";

const AdminProducts = ({ token, products, allProducts, setAllProducts }) => {
  return (
    <>
      <div>
        <div className="adminProducts">
          {products && products.length ? (
            products.map((product) => {
              return (
                <AdminProduct
                  key={`product-${product.id}`}
                  token={token}
                  product={product}
                  allProducts={allProducts}
                  setAllProducts={setAllProducts}
                />
              );
            })
          ) : (
            <div> No Products Found</div>
          )}
        </div>
      </div>
    </>
  );
};
export default AdminProducts;
