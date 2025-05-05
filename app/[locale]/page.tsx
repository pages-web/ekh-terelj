"use client";

import Image from "@/components/ui/image";
import ReserveSelectDate from "@/components/reserve-select-date/reserve-select-date";

import Location from "@/components/location/location";
import Trend from "@/components/trend-activities/trend";
import FeatureGrid from "@/components/hom-features/features";

import AboutSection from "@/components/home-about/home-about";
import Accommodation from "@/components/home-Accommodation/accommodation";
import Subscription from "@/components/home-offers/offers";
import {
  useCmsCustomFieldGroups,
  useCmsPosts,
  useCustomCmsPosts,
} from "@/sdk/queries/cms";
import HomeBooking from "@/components/home-booking/home-booking";

export default function HomePage() {
  const { customPosts } = useCustomCmsPosts();
  console.log(customPosts, "customPosts");

  return (
    <div className="flex flex-col gap-8 lg:gap-28 container">
      <HomeBooking />
      <AboutSection />
      <Accommodation />
      <Subscription />
      <Location />
      {/* <Trend /> */}
      {/* <FeatureGrid /> */}
    </div>
  );
}
