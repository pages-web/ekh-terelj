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

const YourDetails = () => {
  return (
    <BookingLayout currentActive={2}>
      <Heading title="Secure Booking" className="hidden md:block" />
      <div className="flex flex-col-reverse md:flex-row gap-6">
        <div className="md:w-[50%] space-y-10 border p-4 rounded-xl shadow-lg">
          <AccountPart />
          <CheckoutForm />
        </div>
        <div className="md:w-[50%] border p-4 rounded-xl shadow-lg">
          <ReservedRoomDetail />
        </div>
      </div>
    </BookingLayout>
  );
};
export default YourDetails;
