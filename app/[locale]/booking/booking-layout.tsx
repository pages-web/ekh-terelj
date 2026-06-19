"use client";

import Stepper from "@/features/booking/components/stepper/stepper";
import PrivateRoute from "@/features/auth/components/private-route";
import { steps } from "@/features/booking/lib/steps";
import { PropsWithChildren } from "react";

const BookingLayout = ({
  children,
  currentActive = 0,
}: PropsWithChildren & { currentActive?: number }) => {
  return (
    <PrivateRoute>
      <div className="min-h-screen container space-y-4 md:space-y-10 py-4 md:py-10">
        <div className="w-full flex justify-center">
          <div className="w-full md:w-[80%]">
            <Stepper steps={steps} currentActive={currentActive} />
          </div>
        </div>
        {children}
      </div>
    </PrivateRoute>
  );
};
export default BookingLayout;
