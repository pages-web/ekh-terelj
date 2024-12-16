"use client";
import { totalAmountAtom } from "@/store/payments";
import { Elements } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { loadStripe } from "@stripe/stripe-js";
import { useAtom } from "jotai";
import CheckoutForm from "./checkout-form";
import { useQuery } from "@apollo/client";
import { queries } from "@/sdk/graphql/payments";
import { IPayment } from "@/types/payments";
import { useMemo, useState, useEffect } from "react";

const CheckoutPage = () => {
  const [totalAmount] = useAtom(totalAmountAtom);
  const { data: paymentsData, loading, error } = useQuery(queries.payments);

  // Find Stripe configuration
  const stripeData = paymentsData?.payments?.find(
    (payment: IPayment) => payment.kind === "stripe"
  );

  // Dynamically load Stripe instance based on the public key
  const [stripeInstance, setStripeInstance] = useState<any>(null);

  useEffect(() => {
    if (stripeData?.config?.publishableKey) {
      loadStripe(stripeData.config.publishableKey).then(setStripeInstance);
    }
  }, [stripeData?.config?.publishableKey]);

  // Memoize options to avoid unnecessary re-renders
  const stripeOptions = useMemo(() => {
    if (!stripeData || !totalAmount) return null;

    return {
      mode: "payment",
      amount: 1000,
      currency: "usd", //optional, can be mnt
      paymentMethodTypes: ["card"],
    };
  }, [stripeData, totalAmount]);

  return (
    <Elements
      stripe={stripeInstance}
      options={{
        mode: "payment",
        // amount: convertToSubcurrency(totalAmount),
        amount: 1000,
        currency: "usd", //optional, can be mnt
        paymentMethodTypes: ["card"],
      }}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;
