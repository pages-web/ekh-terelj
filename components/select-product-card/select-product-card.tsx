"use client";

import { BedDouble, CircleAlert, Star, User } from "lucide-react";
import Image from "../ui/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import { useAtom } from "jotai";
import { toggleSelectRateAtom } from "@/store/reserve";
import { IProduct } from "@/types/products";

const SelectProductCard = ({
  className,
  index,
  room,
}: {
  className?: string;
  index: number;
  room: any;
}) => {
  const [toggleSelectRate, setToggleSelectRate] = useAtom(toggleSelectRateAtom);

  return (
    <div className={`space-y-4 border p-4 rounded-xl ${className}`}>
      <Dialog>
        <DialogTrigger>
          <SelectRoomProductCard {...room} />
        </DialogTrigger>
        <DialogContent className="rounded-xl no-scrollbar overflow-y-scroll w-[95%] h-[95%] md:h-[90%] md:max-w-[1000px] px-0 border-0">
          <PopupProductDetail {...room} />
        </DialogContent>
      </Dialog>

      <Button
        className="w-full"
        onClick={() => {
          setToggleSelectRate(!toggleSelectRate);
        }}
      >
        Select rate
      </Button>
    </div>
  );
};
export default SelectProductCard;
