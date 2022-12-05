import React from "react";
import { Link } from "react-router-dom";
const Home = ({ allProducts }) => {
  //Not working yet. Im trying to filter the products so it makes a new array with only products that are on sale. Then we can map through those and display them for the home page.
  let filteredSaleProducts = allProducts.filter((product) => {
    product.on_sale === true;
  });

  return (
    <>
      <img
        src="https://i.imgur.com/X4Ry23P.png"
        alt="display of holiday sale items"
        className="saleImage"
      />

      <h3 className="newIn">
        check out our new ACOUSTASONIC® PLAYER JAZZMASTER®
      </h3>
      <p className="clickBelow">click below to learn more</p>
      {/* display featured products */}
      {/* <div className="featProductDiv">
        <p className="featProduct"> ... featured product display ... </p>
      </div> */}
      <Link to="/products/2" className="saleLink">
        <img
          src="https://i.imgur.com/MfAxonm.png"
          alt="display of holiday sale Acoustasonic"
          className="saleImage2"
        />
      </Link>
    </>
  );
};
export default Home;
