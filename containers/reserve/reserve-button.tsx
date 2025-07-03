"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useAtom } from "jotai";
import { reserveDateAtom, reserveGuestAndRoomAtom } from "@/store/reserve";
import { toast } from "sonner";

const ReserveButton = ({
  arrow,
  path,
  className,
}: {
  arrow?: boolean;
  path?: string;
  className?: string;
}) => {
  const locale = useParams().locale;
  const [date] = useAtom(reserveDateAtom);
  const [reserveGuestAndRoom] = useAtom(reserveGuestAndRoomAtom);

  const ToastHandler = () => {
    if (!date?.to || !date.from) {
      return toast.error("Pick a date");
    }
    if (!reserveGuestAndRoom?.room || reserveGuestAndRoom?.room === 0) {
      return toast.error("Add a room");
    }
    if (!reserveGuestAndRoom?.adults || reserveGuestAndRoom?.adults === 0) {
      return toast.error("Add a guests");
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
        Reserve {arrow && <ArrowRight className="ml-2 w-5 h-5" />}
      </Button>
    </Link>
  );
};
export default ReserveButton;
