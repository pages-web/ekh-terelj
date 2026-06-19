import { Button } from "@/components/ui/button";
import { Users, Clock, ParkingCircle } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Dining() {
  const t = useTranslations("Content");
  const eventSpaces = [
    {
      title: t("theArva"),
      description: t("arvaDescription"),
      image: "/images/arva.png",
    },
    {
      title: t("theNama"),
      description: t("namaDescription"),
      image: "/images/nama.png",
    },
    {
      title: t("gardenTerrace"),
      description: t("gardenTerraceDescription"),
      image: "/images/garden.png",
    },
    {
      title: t("loungeBar"),
      description: t("loungeBarDescription"),
      image: "/images/lounge-bar.png",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 mb-[60px]">
      <div className="text-center mb-10">
        <h1 className="text-[30px] font-semibold mb-2">{t("cuisine")}</h1>
        <p className="text-sm">{t("diningIntro")}</p>
      </div>

      <div className="space-y-12">
        {eventSpaces.map((space, index) => (
          <div
            key={space.title}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
          >
            <Image
              src={space.image}
              alt={space.title}
              width={800}
              height={500}
              className="w-full h-80 object-cover rounded-xl shadow-md"
            />
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{space.title}</h2>
              <p className="text-gray-600 text-sm">{space.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  {t("peopleCapacity", { count: 120 })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  {t("firstHourFree")}
                </div>
                <div className="flex items-center gap-1">
                  <ParkingCircle size={16} />
                  {t("freeParking")}
                </div>
              </div>

              <Link href="/dinning-details" passHref>
                <Button className="mt-4">{t("viewMoreArrow")}</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
