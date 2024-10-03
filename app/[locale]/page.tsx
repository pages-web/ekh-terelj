import { useTranslations } from "next-intl";
import Image from "@/components/ui/image";
import ReserveSelectDate from "@/components/reserve-select-date/reserve-select-date";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div className="relative overflow-hidden">
      <div className="min-h-screen flex flex-col justify-end container pt-10 pb-12">
        <div className="space-y-6 mb-[84px]">
          <h1 className="text-[64px] text-white">Find your best staycation</h1>
          <ReserveSelectDate />
        </div>
      </div>
      <div className="w-full absolute -top-[84px] left-0 -z-10">
        <Image
          src="/images/bg.jpg"
          width={1440}
          height={920}
          quality={100}
          className="w-full brightness-[.8]"
        />
      </div>
    </div>
  );
}
