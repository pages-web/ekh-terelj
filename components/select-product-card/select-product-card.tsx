"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PopupProductDetail from "../popup-product-detail/popup-product-detail";
import { Button } from "../ui/button";
import SelectRoomProductCard from "../select-room-product-card/select-room-product-card";
import { IRoom } from "@/types/products";
import { useSelectRoom } from "@/hooks/room/room-hooks";

const SelectProductCard = ({
  className,
  room,
}: {
  className?: string;
  room: IRoom;
}) => {
  const { HandleSelectRoom } = useSelectRoom({ room });
  return (
    <div className={`h-fit space-y-4 border p-4 rounded-xl ${className}`}>
      <Dialog>
        <DialogTrigger asChild>
          <SelectRoomProductCard {...room} />
        </DialogTrigger>
        <DialogContent className="rounded-xl no-scrollbar overflow-y-scroll w-[95%] h-[95%] md:h-[90%] md:max-w-[1000px] px-0 border-0">
          <PopupProductDetail {...room} />
        </DialogContent>
      </Dialog>

      <Button className="w-full" onClick={HandleSelectRoom}>
        Өрөөг сонгох
      </Button>
    </div>
  );
};
export default SelectProductCard;
