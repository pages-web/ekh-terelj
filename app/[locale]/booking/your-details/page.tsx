"use client";
import AccountPart from "@/components/checkout-detail/account-part/account-part";
import CheckoutForm from "@/components/checkout-detail/checkout-form";
import PersonalInfoPart from "@/components/checkout-detail/personal-info-part/personal-info-part";
import Heading from "@/components/heading/heading";
import ReservedRoomDetail from "@/components/reserved-room-detail/reserved-room-detail";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BookingLayout from "../booking-layout";
import { Button } from "@/components/ui/button";
import { LockKeyhole } from "lucide-react";
import SecuredConnection from "@/components/checkout-detail/secured-connection";
import { useQuery } from "@apollo/client";
import { queries } from "@/sdk/graphql/customers";
import PaymentPart from "@/components/checkout-detail/payment-part/payment-part";
import StripePayment from "@/containers/payments/stripe/stripe";
import { Elements } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { loadStripe } from "@stripe/stripe-js";
import { totalAmountAtom } from "@/store/reserve";
import { useAtom } from "jotai";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const YourDetails = () => {
  const [totalAmount] = useAtom(totalAmountAtom);
  return (
    <BookingLayout currentActive={2}>
      <div className="flex flex-col-reverse md:flex-row justify-center gap-6">
        <div className="md:w-[50%] space-y-10 border p-4 rounded-xl shadow-lg relative">
          {/* <SecuredConnection /> */}
          {/* <AccountPart /> */}
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(totalAmount),
              currency: "usd", //optional, can be mnt
              paymentMethodTypes: ["card"],
            }}
          >
            <CheckoutForm />
          </Elements>
        </div>
        <div className="md:sticky top-24 h-fit md:w-[30%] border p-4 rounded-xl shadow-lg">
          <ReservedRoomDetail />
        </div>
      </div>
    </BookingLayout>
  );
};
export default YourDetails;
