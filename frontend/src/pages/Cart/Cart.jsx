import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // No need to import ToastContainer here

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(50);
  const [couponApplied, setCouponApplied] = useState(false);

  const navigate = useNavigate();

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  const applyCouponCode = () => {
    if (couponCode === "THIVA30") {
      setDiscount(getTotalCartAmount() * 0.3);
      setCouponApplied(true);
      toast.success("Coupon applied successfully.", {
        style: { backgroundColor: 'green', color: 'white' }
      });
    } else if (couponCode === "THIVFIRST") {
      setDeliveryFee(0);
      setCouponApplied(true);
      toast.success("Coupon applied successfully.")
    } else {
      toast.error("Invalid coupon code.");
    }
  };

  const removeCouponCode = () => {
    setDiscount(0);
    // setDeliveryFee(50);
    setCouponCode("");
    setCouponApplied(false);
    toast.success("Coupon removed successfully.");
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-header">
          <h2>Food details</h2>
        </div>
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id} className="cart-item">
                <div className="item-details">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-info">
                    <p className="item-title">{item.name}</p>
                    <p className="item-price">₹{item.price}</p>
                  </div>
                </div>
                <p className="item-quantity">{cartItems[item._id]}</p>
                <p className="item-total">₹{item.price * cartItems[item._id]}</p>
                <p onClick={() => removeFromCart(item._id)} className="remove-item">🗑️</p>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <div className="cart-summary-details">
          <div className="summary-item">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <div className="summary-item">
            <p>Discount</p>
            <p>-₹{discount}</p>
          </div>
          {/* <div className="summary-item">
            <p>Delivery Fee</p>
            <p style={{ color: deliveryFee === 0 ? "green" : "red" }}>₹{deliveryFee}</p>
          </div> */}
          <div className="summary-item total">
            <b>Total</b>
            <b>₹{Math.max(getTotalCartAmount() - discount + 0)}</b>
          </div>
        </div>
        <button onClick={() => navigate('/order')} className="checkout-button">Checkout</button>
      </div>
      <div className="cart-coupon">
        <p className="coupon-title">Apply Coupon Code</p>
        <div className="coupon-input">
          <input
            type="text"
            placeholder="Enter promo code"
            value={couponCode}
            onChange={handleCouponCodeChange}
            disabled={couponApplied} // Disable input if coupon is applied
          />
          {couponApplied ? (
            <button onClick={removeCouponCode} className="apply-coupon-button">Remove</button>
          ) : (
            <button onClick={applyCouponCode} className="apply-coupon-button">Apply</button>
          )}
        </div>
        <div className="coupon-info">
          <p>Apply "THIVFIRST" for free delivery</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;