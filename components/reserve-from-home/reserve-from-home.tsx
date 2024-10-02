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
import ReserveButton from "../reserve-button/reserve-button";
import ReserveRoomGuestsFields from "../reserve-room-guests-fields/reserve-room-guests-fields";
import { useAtom } from "jotai";
import {
  reserveDateAtom,
  reserveGuestsAdultCountAtom,
  reserveGuestsChildrenCountAtom,
  reserveGuestsPetAtom,
  reserveGuestsRoomCountAtom,
} from "@/store/reserve";
import { useParams } from "next/navigation";

export const ChildrenWithTitle = ({
  children,
  title,
}: React.PropsWithChildren & { title: string }) => {
  return (
    <div className="w-full max-w-[200px] flex flex-col gap-3">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

const ReserveFromHome = () => {
  const [date, setDate] = useAtom(reserveDateAtom);
  const [room] = useAtom(reserveGuestsRoomCountAtom);
  const [adults] = useAtom(reserveGuestsAdultCountAtom);
  const [children] = useAtom(reserveGuestsChildrenCountAtom);
  const [active, setActive] = useState(0);

  const filters = [
    { name: "Hotels", id: 0 },
    { name: "Villas", id: 1 },
    { name: "Apartments", id: 2 },
    { name: "Resort", id: 3 },
  ];

  return (
    <div className="flex flex-col p-6 gap-8 rounded-[12px] bg-white">
      <div className="flex gap-6 items-center">
        <h2>Filter:</h2>
        <div className="flex gap-3">
          {filters.map((filter) => {
            return (
              <Button
                variant={filter.id === active ? "default" : "outline"}
                onClick={() => setActive(filter.id)}
              >
                {filter.name}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between items-end">
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
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  format(date.from, "LLL dd, y")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </ChildrenWithTitle>

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
                <MapPin className="mr-2 h-4 w-4" />
                {date?.to ? (
                  format(date.to, "LLL dd, y")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.to}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </ChildrenWithTitle>

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
              <ReserveRoomGuestsFields />
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
                {adults > 0 || children > 0 ? (
                  adults + children
                ) : (
                  <span>Add room</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[300px] p-5 " align="start">
              <ReserveRoomGuestsFields />
            </PopoverContent>
          </Popover>
        </ChildrenWithTitle>

        <ReserveButton />
      </div>
    </div>
  );
};
export default ReserveFromHome;
