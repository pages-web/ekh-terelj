"use client";

import SelectProductCard from "@/features/booking/components/select-product-card/select-product-card";
import { useCheckRooms } from "@/features/rooms/hooks/rooms";
import { reserveDateAtom } from "@/features/booking/store/reserve";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { Loading } from "@/components/ui/loading";

const SelectRoomProducts = ({ className }: { className?: string }) => {
  const [date] = useAtom(reserveDateAtom);
  const variables = useMemo(
    () => ({ startDate: date?.from, endDate: date?.to }),
    [date?.from, date?.to],
  );
  const { rooms, refetch, loading } = useCheckRooms({
    variables,
  });

  useEffect(() => {
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

  if (rooms.length === 0) {
    return (
      <div className="w-full pt-40 flex justify-center font-bold">
        There are no available rooms for the selected date.
      </div>
    );
  }

  return (
    <div className={`grid lg:grid-cols-2 gap-y-3 gap-x-6 ${className}`}>
      {rooms?.map((room) => {
        return <SelectProductCard key={room._id} room={room} />;
      })}
    </div>
  );
};
export default SelectRoomProducts;
