"use client";
import { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { useAtom } from "jotai";
import {
  reserveGuestsAdultCountAtom,
  reserveGuestsChildrenCountAtom,
  reserveGuestsPetAtom,
  reserveGuestsRoomCountAtom,
} from "@/store/reserve";
import CountField from "../count-field/count-field";
import PetField from "../pet-field/pet-field";
import { PopoverClose } from "../ui/popover";

const ReserveRoomGuestsFields = () => {
  const [room, setRoom] = useAtom(reserveGuestsRoomCountAtom);
  const [adults, setAdults] = useAtom(reserveGuestsAdultCountAtom);
  const [children, setChildren] = useAtom(reserveGuestsChildrenCountAtom);
  const [pet, setPet] = useAtom(reserveGuestsPetAtom);

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col gap-3">
        <h2 className="text-textxl">Guests</h2>
        <CountField title="Room" count={room} setCount={setRoom} />
        <CountField title="Adults" count={adults} setCount={setAdults} />
        <CountField title="Children" count={children} setCount={setChildren} />
      </div>
      <div className="flex flex-col gap-6">
        <PetField />
      </div>
      <PopoverClose className="self-end">
        <Button className="w-fit">Apply</Button>
      </PopoverClose>
    </div>
  );
};
export default ReserveRoomGuestsFields;
