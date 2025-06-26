import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const CheckoutForm = ({onSubmit, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !cardComplete) {
      setError("Please enter complete and valid card information.");
      return;
    }

    setProcessing(true);
    setError("");

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("✅ PaymentMethod:", paymentMethod);
      onSubmit()
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        onChange={(event) => {
          setError(event.error ? event.error.message : "");
          setCardComplete(event.complete);
        }}
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        
        type="submit"
        disabled={!stripe || processing || !cardComplete}
        className="btn btn-primary w-full mt-4"
      >
        {processing ? "Processing..." : `Pay ৳${totalPrice?.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
