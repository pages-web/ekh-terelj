"use client";
import { usePathname } from "@/i18n/routing";
import { PropsWithChildren } from "react";

const BookingNavbarTop = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <div className="z-50 sticky top-[85px] py-3 md:shadow-md bg-background w-full">
      <div className="container w-full py-3">{children}</div>
    </div>
  );
};
export default BookingNavbarTop;
