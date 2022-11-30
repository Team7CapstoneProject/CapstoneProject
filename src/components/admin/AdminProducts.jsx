import React, { useState } from "react";
import { AdminProduct } from "..";


const AdminProducts = ({ allAdminProducts }) => {
  //receiving products as prop here from admin dashboard component
  
  //this piece of state works with the handleclick func below to display product data when state is true, defaults to false
  const [displayAdminProducts, setDisplayAdminProducts] = useState(false);

  //this handle click func prevents default so page does not reload and changes displayAdminProducts state to true/false on each click
  function handleClickSeeAllAdminProducts(event) {
    if (!displayAdminProducts) {
      event.preventDefault();
      setDisplayAdminProducts(true);
    } else {
        setDisplayAdminProducts(false);
    }
  }

  //handleclick func from above is set up to activate on "See All Products" button
  //products also will only display if the piece of state passes as true, then if product prop data has value/length it will map through the product id
  //the ternary will display "no products found" div if there is no products to display
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