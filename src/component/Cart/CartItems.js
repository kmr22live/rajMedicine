import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  increaseItemQuantity,
  removeFromCart,
  decreaseItemQuantity,
  fullCartTotal,
  enableAddToCartBtn,
} from "../../store/CartSlice";

export const CartItems = ({ data }) => {
  const dispatch = useDispatch();
  const [cartCount, setCartCount] = useState(1);

  useEffect(() => {
    dispatch(fullCartTotal());
  }, [cartCount]);

  const handleAdd = (datafromclick) => {
    dispatch(increaseItemQuantity(datafromclick));
    setCartCount((prev) => prev + 1);
  };
  const handleSub = (datafromclick) => {
    if (cartCount > 1) {
      dispatch(decreaseItemQuantity(datafromclick));
      setCartCount((prev) => prev - 1);
    } else if (cartCount === 1) {
      dispatch(removeFromCart(datafromclick));
      dispatch(enableAddToCartBtn(datafromclick));
      dispatch(fullCartTotal());
    }
  };
  return (
    <>
      <div className="cardList" key={"cartItem" + data.id}>
        <div className="cartContent">
          <div className="cartContent-inner">
            <div className="img">
              <img
                src="https://res.cloudinary.com/druttjvrf/image/upload/v1685439354/Raj_2_didtzk.png"
                alt=""
              />
            </div>
            <div className="details">
              <p className="details-text">{data.Name}</p>
              <label htmlFor="">Unit Price ₹{data.mrp}</label>

              <div className="price">
                <div className="qty flexCenter">
                  <button className="plus" onClick={() => handleAdd(data)}>
                    <i class="fa-solid fa-plus"></i>
                  </button>
                  <button className="num">{cartCount}</button>
                  <button className="minus" onClick={() => handleSub(data)}>
                    <i class="fa-solid fa-minus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="priceTitle">₹{data.mrp * cartCount}</div>
        </div>
      </div>
    </>
  );
};
