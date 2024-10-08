"use client";
import { useRouter } from "@/i18n/routing";
import { reserveCountAtom, reserveDateAtom } from "@/store/reserve";
import { useAtom } from "jotai";
import { useEffect } from "react";

const ReserveRedirector = () => {
  const [date] = useAtom(reserveDateAtom);
  const [reserveCount] = useAtom(reserveCountAtom);
  const router = useRouter();

  useEffect(() => {
    if (!date) {
      router.push("/booking");
    }
    if (!reserveCount || reserveCount.room === 0) {
      router.push("/booking");
    }
    if (!reserveCount || reserveCount.adults === 0) {
      router.push("/booking");
    }
  }, []);

  return <></>;
};
export default ReserveRedirector;
