import CategoryTabs from "@/components/category-tabs/category-tabs";
import Heading from "@/components/heading/heading";
import ProductCard from "@/components/product-card/product-card";
import SelectProductCard from "@/components/select-product-card/select-product-card";
import BookingLayout from "../booking-layout";
import SelectRoomLayout from "./selectRoomLayout";
import SelectRateCard from "@/components/select-rate-card/select-rate-card";
import SelectRoomProducts from "@/components/select-room-products/select-room-products";

const SelectRoom = () => {
  return (
    <BookingLayout currentActive={1}>
      <SelectRoomLayout>
        <SelectRoomProducts />
      </SelectRoomLayout>
    </BookingLayout>
  );
};
export default SelectRoom;
