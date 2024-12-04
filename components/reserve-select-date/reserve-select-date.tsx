"use client";

import { Button } from "../ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { Bed, CalendarIcon, MapPin, Users } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import ReserveButton from "../../containers/reserve/reserve-button";
import { useAtom } from "jotai";
import { reserveDateAtom, reserveGuestAndRoomAtom } from "@/store/reserve";
import DateForm from "@/containers/reserve/date-form";
import RoomForm from "@/containers/reserve/room-form";
import GuestForm from "@/containers/reserve/guest-form";

export const ChildrenWithTitle = ({
  children,
  title,
}: React.PropsWithChildren & { title: string }) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

const ReserveSelectDate = () => {
  const [date] = useAtom(reserveDateAtom);
  const [reserveGuestAndRoom] = useAtom(reserveGuestAndRoomAtom);
  const [active, setActive] = useState(0);
  const { adults, children, room } = reserveGuestAndRoom || "";

  return (
    <div className="w-full flex flex-col p-6 gap-8 rounded-[12px] bg-white border shadow-lg">
      {/* <div className="flex gap-6 items-center">
        <h2>Filter:</h2>
        <div className="flex no-scrollbar overflow-x-scroll gap-3">
          {filters.map((filter) => {
            return (
              <Button
                variant={filter.id === active ? "default" : "outline"}
                onClick={() => {
                  setActive(filter.id);
                }}
              >
                {filter.name}
              </Button>
            );
          })}
        <div className="flex no-scrollbar overflow
        </div>
      </div> */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-end gap-6 ">
        <ChildrenWithTitle title="Check-in">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 min-h-5 h-5 w-5 min-w-5" />
                {date?.from && date?.to ? (
                  format(date.from, "PPP") + ` - ` + format(date.to, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[300px] w-fit p-5" align="start">
              <DateForm />
            </PopoverContent>
          </Popover>
        </ChildrenWithTitle>
        {/* 
        <ChildrenWithTitle title="Check-out">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <MapPin className="mr-2 min-h-5 min-w-5" />
                {date?.to ? format(date.to, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[300px] w-fit p-5" align="start">
              <DateForm />
            </PopoverContent>
          </Popover>
        </ChildrenWithTitle> */}

        <ChildrenWithTitle title="Room">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <Bed className="mr-2 h-4 w-4" />
                {room ? (
                  room + `${room > 1 ? " rooms" : " room"}`
                ) : (
                  <span>Add room</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[300px] p-5" align="start">
              <RoomForm />
            </PopoverContent>
          </Popover>
        </ChildrenWithTitle>

        <ChildrenWithTitle title="Guest">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <Users className="mr-2 h-4 w-4" />
                {!!adults && adults + `${adults > 1 ? " Adults" : " Adult"}`}
                {!!adults && !!children && ", "}
                {!!children &&
                  children + `${children > 1 ? " Children" : " Child"}`}
                {!children && !adults && "Add guests"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[300px] p-5 " align="start">
              <GuestForm />
            </PopoverContent>
          </Popover>
        </ChildrenWithTitle>
        <ReserveButton arrow className="hidden lg:block" />
      </div>
      <ReserveButton arrow className="lg:hidden self-end" />
    </div>
  );
};
export default ReserveSelectDate;
