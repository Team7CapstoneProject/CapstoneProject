import React from "react";
const Home = ({ allProducts }) => {
  //Not working yet. Im trying to filter the products so it makes a new array with only products that are on sale. Then we can map through those and display them for the home page.
  let filteredSaleProducts = allProducts.filter((product) => {
    product.on_sale === true;
  });

  return (
    <>
      <img
        src="https://i.imgur.com/Z4YeMD5.png"
        alt="display of holiday sale items"
        className="saleImage"
      />
      <h3 className="newIn">What's New</h3>
      {/* display featured products */}
      <div className="featProductDiv">
        <p className="featProduct"> ... featured product display ... </p>
      </div>
    </>
  );
};
export default Home;
