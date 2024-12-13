import ReservedRoomDetail from "@/components/reserved-room-detail/reserved-room-detail";
import BookingLayout from "../booking-layout";

import DealEndAlert from "@/components/deal-end-alert/deal-end-alert";
import CheckoutPage from "@/components/checkout-detail/checkout-page";

const YourDetails = () => {
  return (
    <BookingLayout currentActive={2}>
      <div className="flex flex-col-reverse md:flex-row justify-center gap-6">
        <div className="md:w-[50%] space-y-10 border p-4 rounded-xl shadow-lg relative">
          {/* <SecuredConnection /> */}
          {/* <AccountPart /> */}
          <CheckoutPage />
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
