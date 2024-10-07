import CategoryTabs from "@/components/category-tabs/category-tabs";
import Heading from "@/components/heading/heading";
import ReserveStepper from "@/components/stepper/stepper";
import { PropsWithChildren } from "react";

const SelectRoomLayout = ({ children }: PropsWithChildren) => {
  const categories = [
    { name: "Hotel room", path: "/select-room" },
    { name: "Suites", path: "/select-room/suites" },
    { name: "Signature suites", path: "/select-room/signatures-suites" },
    { name: "Homes", path: "/select-room/homes" },
  ];
  return (
    <div className="min-h-screen container space-y-10 py-10">
      {/* <Heading
        title="Top Trending Hotel Rooms Views"
        desc="A masterclass of sophistication, a stay at Atlantis The Royal delivers extraordinary luxury, unlike anywhere else."
      /> */}
      <ReserveStepper />
      <CategoryTabs tabs={categories} defaultTab={categories[0]} />
      {children}
    </div>
  );
};
export default SelectRoomLayout;
