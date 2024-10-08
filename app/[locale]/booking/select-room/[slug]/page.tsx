import BookingLayout from "../../booking-layout";
import SelectRoomLayout from "../selectRoomLayout";

const AccommodationSlug = () => {
  return (
    <BookingLayout currentActive={1}>
      <SelectRoomLayout></SelectRoomLayout>
    </BookingLayout>
  );
};
export default AccommodationSlug;
