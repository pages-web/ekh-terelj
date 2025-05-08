import Heading from "@/components/heading/heading";
import { PropsWithChildren } from "react";
import Accommodation from "@/components/home-Accommodation/accommodation";

export default function AccommodationLayout() {
  return (
    <div className="min-h-screen container space-y-10 py-10">
      <Accommodation />
    </div>
  );
}
