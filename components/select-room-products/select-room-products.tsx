"use client";

import SelectProductCard from "@/components/select-product-card/select-product-card";
import SelectRateCard from "@/components/select-rate-card/select-rate-card";
import { useMediaQuery } from "@/hooks/use-media-query";
import useRooms, { useCheckRooms, useRoomCategories } from "@/sdk/hooks/rooms";
import { reserveDateAtom } from "@/store/reserve";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const SelectRoomProducts = () => {
  const [date] = useAtom(reserveDateAtom);
  const { roomCategories, rooms, loading } = useCheckRooms({
    variables: {
      startDate: date?.from,
      endDate: date?.to,
    },
  });
  console.log(rooms);
  const [denominator, setDenominator] = useState(1);
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isMd = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setDenominator(1);
    if (isMd) {
      setDenominator(2);
    }
    if (isLg) {
      setDenominator(3);
    }
  }, [isMd, isLg]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6">
      {rooms?.map((room, index) => {
        return (
          <>
            <SelectProductCard
              key={index}
              index={index}
              className=""
              room={room}
            />
            {(index + 1) % denominator === 0 && (
              <SelectRateCard
                className={
                  isLg ? "col-span-3" : isMd ? "col-span-2" : "col-span-1"
                }
                key={index}
              />
            )}
          </>
        );
      })}
    </div>
  );
};
export default SelectRoomProducts;
