"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Bed, CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { reserveDateAtom, reserveGuestAndRoomAtom } from "@/store/reserve";
import DateForm from "@/containers/reserve/date-form";
import Image from "../ui/image";
import { Link } from "@/i18n/routing";
import RoomForm from "@/containers/reserve/room-form";
import GuestForm from "@/containers/reserve/guest-form";

const BookingNavbarTopContent = () => {
  const [date, setDate] = useAtom(reserveDateAtom);
  const [reserveGuestAndRoom, setReserveGuestAndRoom] = useAtom(
    reserveGuestAndRoomAtom
  );
  const { adults, children, room } = reserveGuestAndRoom;

  return (
    <div className="w-full flex xl:flex-row flex-col justify-center items-center gap-6">
      {/* <div className="flex items-center gap-3">
        <BackButton />
        <span>Choose date</span>
      </div> */}

      <div className="w-full flex flex-col md:flex-row justify-center gap-6">
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

        {/* <Popover>
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
        </Popover> */}

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
      </div>
    </div>
  );
};

export default BookingNavbarTopContent;
