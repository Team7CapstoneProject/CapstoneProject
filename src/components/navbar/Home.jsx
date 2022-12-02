import React from "react";
const Home = () => {
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
