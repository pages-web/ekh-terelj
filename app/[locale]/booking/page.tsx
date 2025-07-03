"use client";

import BookingLayout from "./booking-layout";
import SelectRoomProducts from "@/components/select-room-products/select-room-products";

import SelectedRoomCard from "@/components/selected-room-card/selected-room-card";
import { selectedRoomsAtom } from "@/store/rooms";
import { useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import { useEffect } from "react";

const SelectRoom = () => {
  const setSelectedRooms = useSetAtom(selectedRoomsAtom);

  useEffect(() => {
    setSelectedRooms(RESET);
  }, []);

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
