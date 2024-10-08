"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useAtom } from "jotai";
import { reserveCountAtom, reserveDateAtom } from "@/store/reserve";
import { useToast } from "@/hooks/use-toast";

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
  const [reserveCount] = useAtom(reserveCountAtom);
  const { toast } = useToast();
  const ToastHandler = () => {
    if (!date?.to || !date.from) {
      return toast({
        variant: "destructive",
        title: "Pick a date",
      });
    }
    if (!reserveCount?.room || reserveCount?.room === 0) {
      return toast({
        variant: "destructive",
        title: "Add a room",
      });
    }
    if (!reserveCount?.adults || reserveCount?.adults === 0) {
      return toast({
        variant: "destructive",
        title: "Add a guests",
      });
    }
  };

  return (
    <Link
      href={
        !date?.from ||
        !date?.to ||
        !reserveCount?.room ||
        !reserveCount?.adults ||
        reserveCount?.room === 0 ||
        reserveCount?.adults === 0
          ? "/booking"
          : "/booking/select-room"
      }
      locale={locale === "en" ? "en" : "mn"}
      className={className}
    >
      <Button
        variant={"secondary"}
        className="font-bold"
        size={"lg"}
        onClick={() => ToastHandler()}
      >
        Reserve {arrow && <ArrowRight className="ml-2 w-5 h-5" />}
      </Button>
    </Link>
  );
};
export default ReserveButton;
