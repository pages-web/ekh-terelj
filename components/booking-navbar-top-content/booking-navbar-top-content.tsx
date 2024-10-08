"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Bed, CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useAtom } from "jotai";
import { reserveCountAtom, reserveDateAtom } from "@/store/reserve";
import BackButton from "../back-button/back-button";
import ReserveButton from "../../containers/reserve/reserve-button";
import CountForm from "@/containers/reserve/count-form";

const BookingNavbarTopContent = () => {
  const [date, setDate] = useAtom(reserveDateAtom);
  const [reserveCount, setReserveCount] = useAtom(reserveCountAtom);
  const { adults, children, room } = reserveCount || "";

  return (
    <div className="w-full flex gap-6">
      {/* <div className="flex items-center gap-3">
        <BackButton />
        <span>Choose date</span>
      </div> */}

      <div className="w-full grid grid-cols-2 md:flex justify-center gap-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal col-span-2",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
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
            <CountForm />
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
            <CountForm />
          </PopoverContent>
        </Popover>
      </div>

      {/* <div className="flex items-center gap-6">
        <span className="text-textlg text-[#33977D] font-bold">
          750.000₮/Night
        </span>
        <ReserveButton path="/your-details" />
      </div> */}
    </div>
  );
};

export default BookingNavbarTopContent;
