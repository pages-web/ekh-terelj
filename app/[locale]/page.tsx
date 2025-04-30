import Image from "@/components/ui/image";
import ReserveSelectDate from "@/components/reserve-select-date/reserve-select-date";

import Offer from "@/components/home-offers/offers";

import Location from "@/components/location/location";
import Trend from "@/components/trend-activities/trend";
import FeatureGrid from "@/components/hom-features/features";

import AboutSection from "@/components/home-about/home-about";
import Accommodation from "@/components/home-Accommodation/accommodation";
import Subscription from "@/components/home-offers/offers";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 lg:gap-16">
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
            src="https://lh3.googleusercontent.com/p/AF1QipPYDHDE4l30MDUE_zNEKHfcBxExHwxZYOJQZwMh=s680-w680-h510"
            width={1440}
            height={920}
            quality={100}
            className="h-full md:w-full brightness-[.8]"
          />
        </div>
      </div>
      <AboutSection />
      <div>
        <h1 className="text-[30px] font-bold text-center mb-1 ">
          Recommended Rooms and Suites
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          Floor-to-ceiling windows unlock sublime views from all 202 rooms and
          suites, each highlighted by sophisticated décor with Chinoiserie
          touches.
        </p>
      </div>
      <Accommodation />
      <Subscription />
      <Location />
      <Trend />
      <FeatureGrid />
    </div>
  );
}
