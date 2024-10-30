"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Bed, CalendarIcon, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useAtom } from "jotai";
import { reserveCountAtom, reserveDateAtom } from "@/store/reserve";
import BackButton from "../back-button/back-button";
import ReserveButton from "../../containers/reserve/reserve-button";
import CountForm from "@/containers/reserve/count-form";
import DateForm from "@/containers/reserve/date-form";
import Image from "../ui/image";
import { Link } from "@/i18n/routing";

const BookingNavbarTopContent = () => {
  const [date, setDate] = useAtom(reserveDateAtom);
  const [reserveCount, setReserveCount] = useAtom(reserveCountAtom);
  const { adults, children, room } = reserveCount;

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
              {date?.from ? format(date.from, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="min-w-[300px] w-fit p-5" align="start">
            <DateForm />
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
              <MapPin className="mr-2 min-h-5 min-w-5" />
              {date?.to ? format(date.to, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="min-w-[300px] w-fit p-5" align="start">
            <DateForm />
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

      <div className="w-full lg:w-[50%] grid grid-cols-4 md:grid-cols-3 items-center gap-6 ">
        <h1 className="text-textxl font-bold col-span-4 md:col-span-1">
          Booking for:
        </h1>
        <Link
          href={"https://www.booking.com/"}
          className="w-full col-span-2 md:col-span-1"
        >
          <Image
            src="/images/booking.png"
            width={300}
            height={83}
            className="w-full"
          />
        </Link>

        <Link
          href={"https://www.expedia.com/"}
          className="w-full col-span-2 md:col-span-1"
        >
          <Image
            src="/images/expedia.png"
            width={300}
            height={83}
            className="w-full"
          />
        </Link>
      </div>
    </div>
  );
};

export default BookingNavbarTopContent;
