import React, { useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  getBrainstreeToken,
  processPayment,
} from "../../services/ProductService";
import { useNavigate } from "react-router-dom";
import { removeAllCartItems } from "../../features/cartSlice";

const CheckoutInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, token } = useSelector((state) => state.user.data);
  const { cartItems } = useSelector((state) => state.cart);

  const [braintreeClientToken, setBraintreeClientToken] = useState();
  const [instance, setInstance] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) getBrainTreeClientToken();
  }, [token]);

  const getBrainTreeClientToken = async () => {
    try {
      const response = await getBrainstreeToken();
      setBraintreeClientToken(response.clientToken);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      // const totalAmount = cartTotal();

      const response = await processPayment(nonce, cartItems, token);
      setIsLoading(false);
      toast.success("Payment was successful");
      dispatch(removeAllCartItems());
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.log(error);
    }
  };

  const cartTotal = () => {
    let total = 0;
    cartItems && cartItems.map((cartItem) => (total += cartItem.price));
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="checkout-info">
      <h2>Cart Summary</h2>
      <h3>Total You Have To Pay: {cartTotal()}</h3>
      <h3>Delivery Address: {userData.address}</h3>
      <button>Update Delivery Address </button>
      <button>{token ? "Checkout" : "Login to Checkout"} </button>

      <div>
        {!braintreeClientToken || !cartItems.length ? (
          ""
        ) : (
          <>
            <DropIn
              options={{
                authorization: braintreeClientToken,
                // paypal: {
                //   flow: "vault",
                // },
              }}
              onInstance={(instance) => setInstance(instance)}
            />
            <button
              disabled={isLoading}
              className="btn"
              onClick={handlePayment}
            >
              {isLoading ? "Processing" : "buy"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutInfo;

// There are 2 steps
/**
 * step 1: signup braintree which is created by paypal
 * step 2: login to braintee and grab sandbox merchant ID, private key, public key which we need to put in server environment variable
 * step 3: create a get request /braintree/token in the backend so we can get a client token from braintree using braintree package
 * step 4: from client side make request to the route /braintree/token and store in a state
 * step 5: if we have the client token then show the payment ui DropIn from braintree-web-drop-in-react
 * step 6: add the the papyal integration -> sandbox.braintreegateway.com -> processing -> paypal -> options -> set the original paypal email, client id, paypal client secret
 * step 7: make the request to the backend for processing the payment
 * productRoutes.post("/braintree/payment", processBraintreePayment);
 * step 8: if successful show a toast message and remove items from cart in the front end
 * step 8: create an order model for managing the order history
 * also show the order data to the admin dashboard
 *
 */
