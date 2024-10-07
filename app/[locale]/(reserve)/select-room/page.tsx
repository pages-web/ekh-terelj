import CategoryTabs from "@/components/category-tabs/category-tabs";
import Heading from "@/components/heading/heading";
import SelectRoomLayout from "./select-room-layout";
import ProductCard from "@/components/product-card/product-card";
import SelectProductCard from "@/components/select-product-card/select-product-card";

const SelectRoom = () => {
  return (
    <SelectRoomLayout>
      <div className="grid grid-cols-3 gap-6">
        {Array(5)
          .fill(1)
          .map((_, index) => {
            return <SelectProductCard key={index} />;
          })}
      </div>
    </SelectRoomLayout>
  );
};
export default SelectRoom;
