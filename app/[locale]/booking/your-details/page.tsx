"use client";
import CheckoutForm from "@/components/checkout-detail/checkout-form";
import ReservedRoomDetail from "@/components/reserved-room-detail/reserved-room-detail";
import BookingLayout from "../booking-layout";
import { Elements } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { loadStripe } from "@stripe/stripe-js";
import { useAtom } from "jotai";
import DealEndAlert from "@/components/deal-end-alert/deal-end-alert";
import { totalAmountAtom } from "@/store/payments";

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
        <div className="md:sticky top-24 h-fit md:w-[30%] space-y-6">
          <DealEndAlert />
          <div className="border p-4 rounded-xl shadow-lg">
            <ReservedRoomDetail />
          </div>
        </div>
      </div>
    </BookingLayout>
  );
};
export default YourDetails;
