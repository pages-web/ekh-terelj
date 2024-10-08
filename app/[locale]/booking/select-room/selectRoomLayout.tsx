import CategoryTabs from "@/components/category-tabs/category-tabs";
import Heading from "@/components/heading/heading";
import Stepper from "@/components/stepper/stepper";
import { steps } from "@/lib/steps";
import { PropsWithChildren } from "react";

const SelectRoomLayout = ({ children }: PropsWithChildren) => {
  const categories = [
    { name: "Hotel room", path: "/booking/select-room" },
    { name: "Suites", path: "/booking/select-room/suites" },
    {
      name: "Signature suites",
      path: "/booking/select-room/signatures-suites",
    },
    { name: "Homes", path: "/booking/select-room/homes" },
  ];

  return (
    <div className="space-y-10 py-10">
      {/* <Heading
        title="Top Trending Hotel Rooms Views"
        desc="A masterclass of sophistication, a stay at Atlantis The Royal delivers extraordinary luxury, unlike anywhere else."
      /> */}
      <CategoryTabs tabs={categories} defaultTab={categories[0]} />
      {children}
    </div>
  );
};
export default SelectRoomLayout;
