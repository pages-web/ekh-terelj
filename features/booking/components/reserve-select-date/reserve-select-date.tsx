"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils/cn";
import { format } from "date-fns";
import { Bed, CalendarIcon, Users } from "lucide-react";
import React from "react";
import ReserveButton from "@/features/booking/components/reserve-button";
import { useAtom } from "jotai";
import { reserveDateAtom, reserveGuestAndRoomAtom } from "@/features/booking/store/reserve";
import DateForm from "@/features/booking/components/date-form";
import RoomForm from "@/features/booking/components/room-form";
import GuestForm from "@/features/booking/components/guest-form";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Booking");
  const [date] = useAtom(reserveDateAtom);
  const [reserveGuestAndRoom] = useAtom(reserveGuestAndRoomAtom);
  const { adults, children, room } = reserveGuestAndRoom || "";

  return (
    <div className="w-full flex flex-col p-6 gap-8 rounded-[12px] bg-white border shadow-lg">
      <div className="w-full flex flex-col lg:flex-row justify-between items-end gap-6 ">
        <ChildrenWithTitle title={t("checkIn")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="check-in-date"
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !date?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 min-h-5 h-5 w-5 min-w-5" />
                {date?.from ? (
                  format(date.from, "PPP")
                ) : (
                  <span>{t("pickDate")}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[300px] w-fit p-5" align="start">
              <DateForm />
            </PopoverContent>
          </Popover>
        </ChildrenWithTitle>

        <ChildrenWithTitle title={t("checkOut")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="check-out-date"
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !date?.to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 min-h-5 h-5 w-5 min-w-5" />
                {date?.to ? (
                  format(date.to, "PPP")
                ) : (
                  <span>{t("pickDate")}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[300px] w-fit p-5" align="start">
              <DateForm />
            </PopoverContent>
          </Popover>
        </ChildrenWithTitle>

        <ChildrenWithTitle title={t("room")}>
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
                  t("rooms", { count: room })
                ) : (
                  <span>{t("addRoom")}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[300px] p-5" align="start">
              <RoomForm />
            </PopoverContent>
          </Popover>
        </ChildrenWithTitle>

        <ChildrenWithTitle title={t("guest")}>
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
                {!!adults && t("adult", { count: adults })}
                {!!adults && !!children && ", "}
                {!!children && t("child", { count: children })}
                {!children && !adults && t("addGuests")}
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
