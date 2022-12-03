import React from "react";
import { AdminProduct } from "..";

const AdminProducts = ({
  allProducts,
  setAllProducts,
  displayAdminProducts,
  setDisplayAdminProducts,
  setDisplayCreateProduct,
  setDisplayUsers,
}) => {
  //receiving products as prop here from main component

  //this piece of state works with the handleclick func below to display product data when state is true, defaults to false
  // const [displayAdminProducts, setDisplayAdminProducts] = useState(false);

  //this handle click func prevents default so page does not reload and changes displayAdminProducts state to true/false on each click
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

  //handleclick func from above is set up to activate on "See All Products" button
  //products also will only display if the piece of state passes as true, then if product prop data has value/length it will map through the product id
  //the ternary will display "no products found" div if there is no products to display
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
