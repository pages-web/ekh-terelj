import CategoryTabs from "@/components/category-tabs/category-tabs";
import Heading from "@/components/heading/heading";
import ProductCard from "@/components/product-card/product-card";
import SelectProductCard from "@/components/select-product-card/select-product-card";
import BookingLayout from "../booking-layout";
import SelectRoomLayout from "./selectRoomLayout";

const SelectRoom = () => {
  return (
    <BookingLayout currentActive={1}>
      <SelectRoomLayout>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array(5)
            .fill(1)
            .map((_, index) => {
              return <SelectProductCard key={index} />;
            })}
        </div>
      </SelectRoomLayout>
    </BookingLayout>
  );
};
export default SelectRoom;
