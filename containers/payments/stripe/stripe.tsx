"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CheckoutPage from "./checkoutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const StripePayment = () => {
  const amount = 1000;
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: convertToSubcurrency(amount),
        currency: "usd", //optional, can be mnt
        paymentMethodTypes: ["card"],
      }}
    >
      <CheckoutPage amount={amount} />
    </Elements>
  );
};
export default StripePayment;
