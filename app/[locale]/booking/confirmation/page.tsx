"use client";
import BookingLayout from "../booking-layout";
import { useRouter } from "@/i18n/routing";
import { useAtom } from "jotai";
import { reserveCompletedAtom } from "@/store/reserve";
import { useEffect } from "react";

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
    <BookingLayout currentActive={3}>
      <div className="pt-20 flex justify-center items-center">
        Reserve completed
      </div>
    </BookingLayout>
  );
};
export default YourDetails;
