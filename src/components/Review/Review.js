import React from "react";
import { useEffect, useState } from "react";
import "./Review.css";
import gify from "../../images/giphy.gif";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import fakeData from "./../../fakeData/index";
import ReviewItems from "./../ReviewItems/ReviewItems";
import Cart from "./../Cart/Cart";
import { useHistory } from "react-router-dom";

const Review = () => {
  const [count, setCount] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory();

  const handleProceedCheckout = () => {
    history.push("/shipment");
    // setCount([]);
    // setOrderPlaced(true);
    // processOrder();
  };

  const handelRemoveProduct = (props) => {
    const product = count.filter((pd) => pd.key !== props);
    setCount(product);
    removeFromDatabaseCart(props);
  };
  useEffect(() => {
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);

    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = saveCart[key];
      return product;
    });
    setCount(cartProducts);
  }, []);

  let thankyou;
  if (orderPlaced) {
    thankyou = <img src={gify} alt="" />;
  }

  return (
    <div className="shop-container">
      <div className="product-container">
        <h1>Ordered Items: {count.length}</h1>
        {count.map((pd) => (
          <ReviewItems
            handelRemoveProduct={handelRemoveProduct}
            product={pd}
            key={pd.key}
          ></ReviewItems>
        ))}
        {thankyou}
      </div>
      <div className="card-container">
        <Cart cart={count}>
          <button onClick={handleProceedCheckout} className="remove-button">
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
