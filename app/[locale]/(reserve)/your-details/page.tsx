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

const YourDetails = () => {
  return (
    <div className="container min-h-screen space-y-11 py-14">
      <Heading title="Secure Booking" />
      <div className="flex gap-6">
        <div className="w-[50%] space-y-10">
          <AccountPart />
          <CheckoutForm />
        </div>
        <div className="w-[50%]">
          <ReservedRoomDetail />
        </div>
      </div>
    </div>
  );
};
export default YourDetails;
