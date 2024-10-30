import CategoryTabs from "@/components/category-tabs/category-tabs";
import Heading from "@/components/heading/heading";
import ProductCard from "@/components/product-card/product-card";
import SelectProductCard from "@/components/select-product-card/select-product-card";
import BookingLayout from "./booking-layout";
import SelectRateCard from "@/components/select-rate-card/select-rate-card";
import SelectRoomProducts from "@/components/select-room-products/select-room-products";
import useRooms from "@/sdk/queries/rooms";

const SelectRoom = async () => {
  return (
    <BookingLayout currentActive={1}>
      <SelectRoomProducts />
    </BookingLayout>
  );
};
export default SelectRoom;
