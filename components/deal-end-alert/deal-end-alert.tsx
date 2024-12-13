"use client";
import { dealDurationAtom, dealIdAtom } from "@/store/rooms";
import { intervalToDuration } from "date-fns";
import { useAtom, useAtomValue } from "jotai";
import { AlarmClock } from "lucide-react";
import { useEffect } from "react";

const DealEndAlert = () => {
  const [dealDuration, setDealDuration] = useAtom(dealDurationAtom);
  const dealId = useAtomValue(dealIdAtom);
  useEffect(() => {
    // if (!!dealId) {
    const interval = setInterval(() => {
      setDealDuration((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    // }
    //  else {
    //   console.log("end");
    //   clearInterval(interval);
    // }

    return () => clearInterval(interval);
  }, [dealId, setDealDuration]);

  function formatSeconds(seconds: number) {
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

    const formatted = [
      duration.days ? `${duration.days}d` : "",
      duration.hours ? `${duration.hours}h` : "",
      duration.minutes
        ? `${duration.minutes < 10 ? "0" : ""}${duration.minutes}m`
        : "00m",
      duration.seconds
        ? `${duration.seconds < 10 ? "0" : ""}${duration.seconds}s`
        : "00s",
    ]
      .filter(Boolean)
      .join(" ");

    return formatted;
  }
  return (
    <div className="border rounded-lg border-destructive bg-destructive/30 p-3 text-black font-bold flex items-center text-textsm gap-2">
      <AlarmClock className="h-7 w-7 text-destructive" /> Hurry! Deal ends in{" "}
      {formatSeconds(dealDuration)}
    </div>
  );
};
export default DealEndAlert;
