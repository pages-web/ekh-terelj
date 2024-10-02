import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "@/components/ui/image";
import ReserveFromHome from "@/components/reserve-from-home/reserve-from-home";
import Footer from "@/components/footer/footer";
import HotelDining from "@/components/dining/dining";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div className="relative overflow-hidden">
      <div className="min-h-screen flex flex-col justify-end container pt-10 pb-12">
        <div className="space-y-6">
          <h1 className="text-[64px] text-white">Find your best staycation</h1>
          <ReserveFromHome />
        </div>
      </div>
      <div className="w-full absolute top-0 left-0 -z-10">
        <Image
          src="/images/bg.jpg"
          width={1440}
          height={920}
          quality={100}
          className="w-full brightness-[.8]"
        />
      </div>
      {/* <Footer/> */}
    </div>
  );
}
