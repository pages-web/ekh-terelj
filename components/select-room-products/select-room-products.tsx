"use client";

import SelectProductCard from "@/components/select-product-card/select-product-card";
import SelectRateCard from "@/components/select-rate-card/select-rate-card";
import { useMediaQuery } from "@/hooks/use-media-query";
import useRooms, {
  useCheckRooms,
  useRoomCategories,
} from "@/sdk/queries/rooms";
import { reserveDateAtom } from "@/store/reserve";
import { ICategory, IProduct } from "@/types/products";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const SelectRoomProducts = () => {
  const [date] = useAtom(reserveDateAtom);
  const { roomCategoriesByProduct, refetch, rooms, loading } = useCheckRooms({
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

  const [denominator, setDenominator] = useState(1);
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isMd = useMediaQuery("(min-width: 768px)");

  console.log(isLg, isMd);

  useEffect(() => {
    setDenominator(1);
    if (isMd) {
      setDenominator(2);
    }
    if (isLg) {
      setDenominator(3);
    }
  }, [isMd, isLg]);

  if (loading) {
    return (
      <div className="w-full pt-40 flex justify-center font-bold">
        loading...
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
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6">
      {roomCategoriesByProduct?.map((room, index) => {
        return (
          <>
            <SelectProductCard key={index} index={index} room={room} />
            {(index + 1) % denominator === 0 && (
              <SelectRateCard
                className={
                  isLg ? "col-span-3" : isMd ? "col-span-2" : "col-span-1"
                }
                room={room}
                index={index}
                key={index + 1}
              />
            )}
          </>
        );
      })}
    </div>
  );
};
export default SelectRoomProducts;
