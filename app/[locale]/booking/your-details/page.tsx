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

const YourDetails = () => {
  return (
    <BookingLayout currentActive={2}>
      <div className="flex flex-col-reverse md:flex-row justify-center gap-6">
        <div className="md:w-[50%] space-y-10 border p-4 rounded-xl shadow-lg relative">
          {/* <SecuredConnection /> */}
          {/* <AccountPart /> */}
          <CheckoutForm />
        </div>
        <div className="md:sticky top-24 h-fit md:w-[30%] border p-4 rounded-xl shadow-lg">
          <ReservedRoomDetail />
        </div>
      </div>
    </BookingLayout>
  );
};
export default YourDetails;
