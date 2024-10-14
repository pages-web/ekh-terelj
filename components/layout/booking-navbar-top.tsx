"use client";
import { usePathname } from "@/i18n/routing";
import { PropsWithChildren } from "react";

const BookingNavbarTop = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  if (pathname.includes("/booking")) {
    if (!pathname.includes("your-details")) {
      return (
        <div className="z-50 md:sticky top-[76px] md:top-[85px] py-3 md:shadow-md bg-background w-full border-b shadow-sm">
          <div className="container w-full py-3">{children}</div>
        </div>
      );
    }
  }
  return null;
};
export default BookingNavbarTop;
