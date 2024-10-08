import { useTranslations } from "next-intl";
import Image from "@/components/ui/image";
import ReserveSelectDate from "@/components/reserve-select-date/reserve-select-date";
import HotelDining from "@/components/dining/dining";
import Offer from "@/components/offers/offers";
import Gallery from "@/components/gallery/gallery";
import Discount from "@/components/discount/discount";
import Discover from "@/components/discover/discover";
import Trending from "@/components/trending/trending";
import Promo from "@/components/promo/promo";
import Location from "@/components/location/location";
import Trend from "@/components/trend-activities/trend";
import Rooms from "@/components/top-rooms/top-rooms";
import { pageOffers } from "@/components/offers/offerData";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div className="flex flex-col gap-16">
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
            src="/images/bg.jpg"
            width={1440}
            height={920}
            quality={100}
            className="h-full md:w-full brightness-[.8]"
          />
        </div>
      </div>
      <Discount />
      <Discover />
      <Rooms/>
      <Trending/>
      <Promo/>
      <HotelDining title="Exclusive Dining Experience" description="Experience the finest dining with a view of the city skyline." buttonNames={["Gourmet", "Buffet", "Cafe", "Room Service"]} images={[
            "/images/image 8.png",
            "/images/image1.png",
            "/images/image 8.png",
            "/images/image1.png",
          ]}/>
      <Trend/>
      <Offer offers={pageOffers}  title="Unforgettable experiences await"
      description="Join us for a journey of luxury and relaxation at our stunning locations."/>
      <Gallery/>
      <Location/>
    </div>
  );
}
