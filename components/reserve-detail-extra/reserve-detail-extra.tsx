"use client";
import { IProduct } from "@/types/products";
import { Button } from "../ui/button";
import { useAtom } from "jotai";
import {
  reserveExtrasAtom,
  selectedRoomAtom,
  selectedRoomsAtom,
} from "@/store/reserve";
import { useState } from "react";
import { RESET } from "jotai/utils";

const ReserveDetailExtra = ({
  product,
  array,
  index,
}: {
  product: IProduct;
  array: any[];
  index: number;
}) => {
  const [isAdd, setIsAdd] = useState<boolean>(true);
  const [reserveExtras, setReserveExtras] = useAtom(reserveExtrasAtom);
  const [selectedRoom, setSelectedRoom] = useAtom(selectedRoomAtom);
  // setSelectedRoom(RESET);
  return (
    <div className="flex justify-between items-center gap-4 border rounded-lg p-4">
      <span>{product.name}</span>
      <Button
        className={`cursor-pointer text-textsm border px-4 py-2 rounded-lg`}
        variant={isAdd ? "outline" : "destructive"}
        onClick={() => {
          setIsAdd(!isAdd);
          isAdd
            ? setSelectedRoom({
                room: selectedRoom.room,
                extras: selectedRoom.extras
                  ? [
                      ...selectedRoom.extras,
                      {
                        ...product,
                        information: { parentId: selectedRoom.room?._id },
                      },
                    ]
                  : [
                      {
                        ...product,
                        information: { parentId: selectedRoom.room?._id },
                      },
                    ],
              })
            : setSelectedRoom({
                room: selectedRoom.room,
                extras: selectedRoom.extra.filter(
                  (item: IProduct) => item._id !== product._id
                ),
              });
        }}
      >
        {isAdd ? "Add" : "Remove"}
      </Button>
    </div>
  );
};
export default ReserveDetailExtra;
