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

export default function HomePage() {
  const { customPosts } = useCustomCmsPosts();
  console.log(customPosts, "customPosts");

  return (
    <div className="flex flex-col gap-8 lg:gap-28">
      <div className="relative overflow-hidden">
        <div className="min-h-screen flex flex-col justify-end container pt-10 pb-10 md:pb-12">
          <div className="space-y-6 md:mb-[84px]">
            <h1 className="text-[40px] md:text-[64px] text-white">
              Find your best staycation
            </h1>
            <ReserveSelectDate />
          </div>
        </div>
        <div className="h-[1000px] md:min-h-screen w-full absolute -top-[84px] left-0 -z-10">
          <Image
            src="/images/bg.png"
            width={1440}
            height={920}
            quality={100}
            className="h-full md:w-full brightness-[.8]"
            alt=""
          />
        </div>
      </div>

      <AboutSection />
      <Accommodation />
      <Subscription />
      <Location />
      <Trend />
      <FeatureGrid />
    </div>
  );
}
