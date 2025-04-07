import Heading from "@/components/heading/heading";
import { PropsWithChildren } from "react";
import Accommodation from "@/components/home-Accommodation/accommodation";

export default function AccommodationLayout() {
  const accommodations = [1, 2];

  return (
    <div className="min-h-screen container space-y-10 py-10">
      <Heading
        className="text-center"
        title="Top Trending Hotel Rooms Views"
        desc="A masterclass of sophistication, a stay at Atlantis The Royal delivers extraordinary luxury, unlike anywhere else."
      />
      {accommodations.map((_, index) => (
        <Accommodation key={index} />
      ))}
    </div>
  );
}
