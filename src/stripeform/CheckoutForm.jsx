import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CheckoutForm = ({
  onSubmit,
  orderinfo,
  quantity,
  totalPrice,
  recipeId,
  deliveryCharge,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
const navigate = useNavigate()
  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_URL}creat-payment-intent`, {
        recipeId,
        totalPrice,
        quantity,
        deliveryCharge,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [recipeId, totalPrice, quantity, deliveryCharge]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !cardComplete) {
      setError("Please enter complete and valid card information.");
      return;
    }

    setProcessing(true);
    setError("");

    const card = elements.getElement(CardElement);

    const { error: createPaymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          name: orderinfo?.buyerInfo?.name,
          email: orderinfo?.buyerInfo?.email,
          phone: orderinfo?.buyerInfo?.phone,
        },
      });

    if (createPaymentMethodError) {
      setError(createPaymentMethodError.message);
      setProcessing(false);
      return;
    }

    
    onSubmit();

    // Confirm the payment with Stripe using clientSecret
    const { error: confirmPaymentError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmPaymentError) {
      setError(confirmPaymentError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent) {
      const fullOrder = {
        ...orderinfo,
        transaction_id: paymentIntent.id,
        paymentStatus: paymentIntent.status,
        paidAt: new Date(),
      };

      try {
        await axios.post(`${import.meta.env.VITE_URL}orders`, fullOrder);
        toast.success("Your order is complete!");
        navigate(`/recipedeteils/${recipeId}`);
      } catch {
        toast.error("Order save failed!");
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto mt-20">
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
        {processing ? "Processing..." : `Pay $${Math.round(totalPrice)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
