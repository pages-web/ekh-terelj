import { Button } from "@/components/ui/button";
import { Users, Clock, ParkingCircle } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Events() {
  const t = useTranslations("Content");
  const eventSpaces = [
    {
      title: t("eventCelebrationsTitle"),
      description: t("eventCelebrationsDescription"),
      image: "/images/number1.png",
    },
    {
      title: t("eventGardenTitle"),
      description: t("eventGardenDescription"),
      image: "/images/number2.png",
    },
    {
      title: t("eventPrivateDiningTitle"),
      description: t("eventPrivateDiningDescription"),
      image: "/images/number3.png",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 mb-[60px]">
      <div className="text-center mb-10">
        <h1 className="text-[30px] font-semibold mb-2">{t("meetingsEvents")}</h1>
        <p className="text-sm">{t("eventSpacesSubtitle")}</p>
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

              <Link href="/events-details" passHref>
                <Button className="mt-4">{t("viewMoreArrow")}</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
