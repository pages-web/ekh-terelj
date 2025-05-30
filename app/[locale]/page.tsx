"use client";

import Image from "@/components/ui/image";
import ReserveSelectDate from "@/components/reserve-select-date/reserve-select-date";

import Location from "@/components/location/location";
import Trend from "@/components/trend-activities/trend";
import FeatureGrid from "@/components/hom-features/features";

import AboutSection from "@/components/home-about/home-about";
import Accommodation from "@/components/home-Accommodation/accommodation";
import Subscription from "@/components/home-offers/offers";
import { useCmsPosts } from "@/sdk/queries/cms";
import HomeBooking from "@/components/home-booking/home-booking";
import Gallery from "@/components/gallery/gallery";
import HomeRestaurant from "@/components/home-restaurant/home-restaurant";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 lg:gap-28 container">
      <HomeBooking />
      {/* <AboutSection /> */}
      <Accommodation />
      <HomeRestaurant />
      <Gallery />
      {/* <Subscription /> */}
      <Location />
      {/* <Trend />
      <FeatureGrid /> */}
    </div>
  );
}
