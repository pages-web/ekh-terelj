import BookingNavbarTopContent from "@/components/booking-navbar-top-content/booking-navbar-top-content";
import CategoryTabs from "@/components/category-tabs/category-tabs";
import Heading from "@/components/heading/heading";
import BookingNavbarTop from "@/components/layout/booking-navbar-top";
import Stepper from "@/components/stepper/stepper";
import ReserveRedirector from "@/containers/reserve/reserve-redirector";
import { usePathname, useRouter } from "@/i18n/routing";
import { steps } from "@/lib/steps";
import {
  reserveCompletedAtom,
  reserveCountAtom,
  reserveDateAtom,
  selectedRoomsAtom,
  totalAmountAtom,
} from "@/store/reserve";
import { useAtom, useAtomValue } from "jotai";
import { PropsWithChildren, Suspense, useEffect } from "react";

const BookingLayout = ({
  children,
  currentActive = 0,
}: PropsWithChildren & { currentActive?: number }) => {
  const reserveCount = useAtomValue(reserveCountAtom);
  const selectedRooms = useAtomValue(selectedRoomsAtom);
  const date = useAtomValue(reserveDateAtom);
  const totalAmount = useAtomValue(totalAmountAtom);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (
      !date?.to &&
      !date?.from &&
      reserveCount?.adults === 0 &&
      reserveCount?.room === 0 &&
      !pathname.includes("confirmation")
    ) {
      router.push("/");
    }
  }, [date, selectedRooms, reserveCount]);
  console.log(reserveCount);

  return (
    <div className="min-h-screen container space-y-4 md:space-y-10 py-4 md:py-10">
      <div className="w-full flex justify-center">
        <div className="w-full md:w-[80%]">
          <Stepper steps={steps} currentActive={currentActive} />
        </div>
      </div>
      {children}
      {/* <Suspense>
        <ReserveRedirector />
      </Suspense> */}
    </div>
  );
};
export default BookingLayout;
