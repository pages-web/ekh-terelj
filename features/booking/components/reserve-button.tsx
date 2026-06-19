"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useAtom } from "jotai";
import { reserveDateAtom, reserveGuestAndRoomAtom } from "@/features/booking/store/reserve";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const ReserveButton = ({
  arrow,
  path,
  className,
}: {
  arrow?: boolean;
  path?: string;
  className?: string;
}) => {
  const tBooking = useTranslations("Booking");
  const locale = useParams().locale;
  const [date] = useAtom(reserveDateAtom);
  const [reserveGuestAndRoom] = useAtom(reserveGuestAndRoomAtom);

  const ToastHandler = () => {
    if (!date?.to || !date.from) {
      return toast.error(tBooking("pickDate"));
    }
    if (!reserveGuestAndRoom?.room || reserveGuestAndRoom?.room === 0) {
      return toast.error(tBooking("addRoom"));
    }
    if (!reserveGuestAndRoom?.adults || reserveGuestAndRoom?.adults === 0) {
      return toast.error(tBooking("addGuests"));
    }
  };

  return (
    <Link
      href={
        !date?.from ||
        !date?.to ||
        !reserveGuestAndRoom?.room ||
        !reserveGuestAndRoom?.adults ||
        reserveGuestAndRoom?.room === 0 ||
        reserveGuestAndRoom?.adults === 0
          ? ""
          : "/booking"
      }
      locale={locale === "en" ? "en" : "mn"}
      className={className}
    >
      <Button className="font-bold" size={"lg"} onClick={() => ToastHandler()}>
        {tBooking("reserve")} {arrow && <ArrowRight className="ml-2 w-5 h-5" />}
      </Button>
    </Link>
  );
};
export default ReserveButton;
