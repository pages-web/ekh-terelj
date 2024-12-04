"use client";

import SelectProductCard from "@/components/select-product-card/select-product-card";
import { useCheckRooms } from "@/sdk/queries/rooms";
import { reserveDateAtom } from "@/store/reserve";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Loading } from "../ui/loading";

const SelectRoomProducts = ({ className }: { className?: string }) => {
  const [date] = useAtom(reserveDateAtom);
  const { roomCategoriesByProduct, refetch, loading } = useCheckRooms({
    variables: { startDate: date?.from, endDate: date?.to },
  });

  useEffect(() => {
    // Only send the query if both from and to dates are available
    if (date?.from && date?.to) {
      refetch({
        startDate: date.from,
        endDate: date.to,
      });
    }
  }, [date, refetch]);

  if (loading) {
    return (
      <div className="w-full pt-40 flex justify-center font-bold">
        <Loading />
      </div>
    );
  }

  if (!roomCategoriesByProduct) {
    return (
      <div className="w-full pt-40 flex justify-center font-bold">
        There are no available rooms for the selected date.
      </div>
    );
  }

  return (
    <div className={`grid lg:grid-cols-2 gap-y-3 gap-x-6 ${className}`}>
      {roomCategoriesByProduct?.map((room, index) => {
        return <SelectProductCard key={index} room={room} />;
      })}
    </div>
  );
};
export default SelectRoomProducts;
