import BookingNavbarTopContent from "@/components/booking-navbar-top-content/booking-navbar-top-content";
import CategoryTabs from "@/components/category-tabs/category-tabs";
import Heading from "@/components/heading/heading";
import BookingNavbarTop from "@/components/layout/booking-navbar-top";
import Stepper from "@/components/stepper/stepper";
import ReserveRedirector from "@/containers/reserve/reserve-redirector";
import { steps } from "@/lib/steps";
import { PropsWithChildren, Suspense } from "react";

const BookingLayout = ({
  children,
  currentActive = 0,
}: PropsWithChildren & { currentActive?: number }) => {
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
