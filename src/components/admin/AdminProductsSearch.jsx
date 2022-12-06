import React, { useEffect, useState } from "react";
import { AdminProducts } from "..";

const AdminProductsSearch = ({ token, allProducts, setAllProducts }) => {
  const [products, setProducts] = useState(allProducts);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  function searchProducts(searchValue) {
    if (searchValue !== "") {
      const filteredProducts = allProducts.filter((product) => {
        return Object.values(product.name)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setProducts(filteredProducts);
    } else {
      setProducts(allProducts);
    }
  }

  const handleChange = (input) => {
    input.preventDefault();
    searchProducts(input.target.value);
  };

  return (
    <>
      <div className="productPage">
        <div>
          <form className="productSearchForm">
            <input
              className="productSearchInput"
              type="text"
              placeholder="Search Product Name"
              onChange={handleChange}
              autoFocus
            />
          </form>
        </div>
        <AdminProducts
          token={token}
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          products={products}
        />
      </div>
    </>
  );
};

export default AdminProductsSearch;
