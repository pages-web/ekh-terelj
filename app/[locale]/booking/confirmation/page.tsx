"use client";
import BookingLayout from "../booking-layout";
import { useRouter } from "@/i18n/routing";
import { useAtom } from "jotai";
import { reserveCompletedAtom } from "@/store/reserve";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const YourDetails = () => {
  const router = useRouter();

  const [reserveCompleted, setReserveCompleted] = useAtom(reserveCompletedAtom);

  // if (!reserveCompleted) {
  //   router.push("/booking");
  // }

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      event.returnValue = ""; // Necessary for some browsers
      setReserveCompleted(false);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <BookingLayout currentActive={4}>
      <div className="flex justify-between">
        <div className="space-y-6">
          <h1>Your booking confirmed</h1>
          <div className="flex gap-2">
            <Button>Print full version</Button>
            <Button>Save confirmation to phone</Button>
          </div>
        </div>

        <div className="border p-6">
          <p>Confirmation code: 12321312321</p>
        </div>
      </div>
      <Separator />
      <div>Booking details here</div>
    </BookingLayout>
  );
};
export default YourDetails;
