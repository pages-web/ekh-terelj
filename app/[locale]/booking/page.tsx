"use client";
import CategoryTabs from "@/components/category-tabs/category-tabs";
import Heading from "@/components/heading/heading";
import ProductCard from "@/components/product-card/product-card";
import SelectProductCard from "@/components/select-product-card/select-product-card";
import BookingLayout from "./booking-layout";
import SelectRateCard from "@/components/select-rate-card/select-rate-card";
import SelectRoomProducts from "@/components/select-room-products/select-room-products";
import useRooms from "@/sdk/queries/rooms";
import { useQuery } from "@apollo/client";
import ReservedRoomDetail from "@/components/reserved-room-detail/reserved-room-detail";
import SelectedRoomCard from "@/components/selected-room-card/selected-room-card";

const SelectRoom = () => {
  return (
    <BookingLayout currentActive={1}>
      <div className="flex justify-center gap-6 md:gap-12">
        <SelectRoomProducts className="w-[60%]" />
        <div className="md:sticky top-48 h-fit md:w-[30%] border p-4 rounded-xl shadow-lg">
          <SelectedRoomCard />
        </div>
      </div>
    </BookingLayout>
  );
};
export default SelectRoom;
