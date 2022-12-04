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

// The product tab can be toggled on and off to display/hide all the products. If it's on, it turns the create product tab and user tab off. 
  function handleClickSeeAllAdminProducts(event) {
    if (!displayAdminProducts) {
      event.preventDefault();
      setDisplayAdminProducts(true);
      setDisplayCreateProduct(false);
      setDisplayUsers(false);
    } else {
      setDisplayAdminProducts(false);
    }
  }

  return (
    <>
      <div>
        <button
          onClick={handleClickSeeAllAdminProducts}
          className="adminButton"
        >
          See All Products
        </button>
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
