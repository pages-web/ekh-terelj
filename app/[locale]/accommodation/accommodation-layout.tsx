import CategoryTabs from "@/components/category-tabs/category-tabs";
import Heading from "@/components/heading/heading";
import { PropsWithChildren } from "react";

const AccommodationLayout = ({ children }: PropsWithChildren) => {
  const categories = [
    { name: "Hotel room", path: "/accommodation" },
    { name: "Suites", path: "/accommodation/suites" },
    { name: "Signature suites", path: "/accommodation/signatures-suites" },
    { name: "Homes", path: "/accommodation/homes" },
  ];
  return (
    <div className="min-h-screen container space-y-10 py-10">
      <Heading
        title="Top Trending Hotel Rooms Views"
        desc="A masterclass of sophistication, a stay at Atlantis The Royal delivers extraordinary luxury, unlike anywhere else."
      />
      <CategoryTabs tabs={categories} />
      {children}
    </div>
  );
};
export default AccommodationLayout;
