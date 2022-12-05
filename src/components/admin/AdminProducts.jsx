import React from "react";
import { AdminProduct } from "..";

const AdminProducts = ({
  token,
  allProducts,
  setAllProducts,
  displayAdminProducts,
  setDisplayAdminProducts,
  setDisplayCreateProduct,
  setDisplayUsers,
}) => {



  return (
    <>
      <div>
        <div>
          {displayAdminProducts ? (
            <div className="adminProducts">
              {allProducts && allProducts.length ? (
                allProducts.map((product) => {
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
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default AdminProducts;
