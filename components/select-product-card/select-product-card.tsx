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
import {
  addSelectedRoomAtom,
  reserveCountAtom,
  selectedRoomAtom,
  selectedRoomsAtom,
} from "@/store/reserve";
import { IProduct } from "@/types/products";
import { toggleSelectRateAtom } from "@/store/other";
import ExtraServices from "../checkout-detail/extra-services/extra-services";
import { useToast } from "@/hooks/use-toast";
import { RESET } from "jotai/utils";

const SelectProductCard = ({
  className,
  index,
  room,
}: {
  className?: string;
  index: number;
  room: IProduct;
}) => {
  const [toggleSelectRate, setToggleSelectRate] = useAtom(toggleSelectRateAtom);
  const [selectedRoom, setSelectedRoom] = useAtom(selectedRoomAtom);
  const [selectedRooms, setSelectedRooms] = useAtom(selectedRoomsAtom);
  const [reserveCount] = useAtom(reserveCountAtom);
  const [, addSelectedRoom] = useAtom(addSelectedRoomAtom);

  const { toast } = useToast();

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

      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="w-full"
            onClick={() => {
              // setToggleSelectRate(true);
            }}
          >
            Select room
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="text-textlg flex-row items-center gap-2">
            Select additional services{" "}
            <span className="text-textxs">(optional)</span>
          </DialogTitle>

          <Separator />
          <ExtraServices />

          <DialogClose asChild>
            <Button
              onClick={() => {
                setSelectedRoom({
                  ...selectedRoom,
                  room: room,
                });
                addSelectedRoom(reserveCount.room);
                setSelectedRoom(RESET);
                selectedRooms.length >= reserveCount.room &&
                  toast({
                    variant: "destructive",
                    title: "It's full",
                    description: "You can't add more rooms",
                  });
              }}
            >
              Done
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default SelectProductCard;
