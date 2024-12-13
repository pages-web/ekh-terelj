"use client";

import Stepper from "@/components/stepper/stepper";
import { usePathname, useRouter } from "@/i18n/routing";
import { steps } from "@/lib/steps";
import { reserveInfoAtom } from "@/store/reserve";
import { selectedRoomsAtom } from "@/store/rooms";
import { useAtomValue } from "jotai";
import { PropsWithChildren } from "react";

const BookingLayout = ({
  children,
  currentActive = 0,
}: PropsWithChildren & { currentActive?: number }) => {
  const selectedRooms = useAtomValue(selectedRoomsAtom);
  const router = useRouter();
  const pathname = usePathname();

  const reserveInfo = useAtomValue(reserveInfoAtom);
  const { adults, room, to, from } = reserveInfo || {};

  // useEffect(() => {
  //   if (
  //     !to &&
  //     !from &&
  //     adults === 0 &&
  //     room === 0 &&
  //     !pathname.includes("confirmation")
  //   ) {
  //     router.push("/");
  //   }
  // }, [reserveInfo, selectedRooms]);

  // if (
  //   to &&
  //   from &&
  //   adults === 0 &&
  //   room === 0 &&
  //   !pathname.includes("confirmation")
  // )
  //   return (
  //     <div className="min-h-screen container space-y-4 md:space-y-10 py-4 md:py-10"></div>
  //   );

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
