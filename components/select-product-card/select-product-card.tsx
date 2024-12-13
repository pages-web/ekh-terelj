"use client";

import { BedDouble, CircleAlert, Star, User } from "lucide-react";
import Image from "../ui/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PopupProductDetail from "../popup-product-detail/popup-product-detail";
import { Button } from "../ui/button";
import { useCallback, useEffect, useState } from "react";
import SelectRateCard from "../select-rate-card/select-rate-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/custom-ui/custom-accordion";
import { Separator } from "../ui/separator";
import SelectRoomProductCard from "../select-room-product-card/select-room-product-card";
import { useAtom, useSetAtom } from "jotai";

import { IProduct, IRoom } from "@/types/products";
import { toggleSelectRateAtom } from "@/store/other";
import ExtraServices from "../checkout-detail/extra-services/extra-services";
import { useToast } from "@/hooks/others/use-toast";
import { RESET } from "jotai/utils";
import {
  addSelectedRoomAtom,
  selectedRoomAtom,
  selectedRoomsAtom,
} from "@/store/rooms";
import { reserveGuestAndRoomAtom } from "@/store/reserve";
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
        <DialogTrigger>
          <SelectRoomProductCard {...room} />
        </DialogTrigger>
        <DialogContent className="rounded-xl no-scrollbar overflow-y-scroll w-[95%] h-[95%] md:h-[90%] md:max-w-[1000px] px-0 border-0">
          <PopupProductDetail {...room} />
        </DialogContent>
      </Dialog>

      {/* <Dialog>
        <DialogTrigger asChild> */}
      <Button className="w-full" onClick={HandleSelectRoom}>
        Select room
      </Button>
      {/* </DialogTrigger>
        <DialogContent>
          <DialogTitle className="text-textlg flex-row items-center gap-2">
            Select additional services{" "}
            <span className="text-textxs">(optional)</span>
          </DialogTitle>

          <Separator />
          <ExtraServices />

          <DialogClose asChild>
            <Button onClick={HandleSelectRoom}>Done</Button>
          </DialogClose>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};
export default SelectProductCard;
