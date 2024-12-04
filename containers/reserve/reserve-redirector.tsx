"use client";
import { useRouter } from "@/i18n/routing";
import {  reserveDateAtom, reserveGuestAndRoomAtom } from "@/store/reserve";
import { useAtom } from "jotai";
import { useEffect } from "react";

const ReserveRedirector = () => {
  const [date] = useAtom(reserveDateAtom);
  const [reserveGuestAndRoom] = useAtom(reserveGuestAndRoomAtom);
  const router = useRouter();

  useEffect(() => {
    if (!date) {
      router.push("/booking");
    }
    if (!reserveGuestAndRoom || reserveGuestAndRoom.room === 0) {
      router.push("/booking");
    }
    if (!reserveGuestAndRoom || reserveGuestAndRoom.adults === 0) {
      router.push("/booking");
    }
  }, []);

  return <></>;
};
export default ReserveRedirector;
