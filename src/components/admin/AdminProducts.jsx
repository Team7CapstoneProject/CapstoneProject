import React, { useState } from "react";
import { AdminProduct } from "..";


const AdminProducts = ({ allAdminProducts }) => {
  const [displayAdminProducts, setDisplayAdminProducts] = useState(false);

  function handleClickSeeAllAdminProducts(event) {
    if (!displayAdminProducts) {
      event.preventDefault();
      setDisplayAdminProducts(true);
    } else {
        setDisplayAdminProducts(false);
    }
  }

  return (
    <>
      <div>
        <button onClick={handleClickSeeAllAdminProducts}>See All Products</button>
        <div>
          {displayAdminProducts ? (
            <div>
              {allAdminProducts && allAdminProducts.length ? (
                allAdminProducts.map((adminProduct) => {
                  return <AdminProduct key={`product-${adminProduct.id}`} adminProduct={adminProduct} />;
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