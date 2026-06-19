import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function OfferDetails() {
  const t = await getTranslations("Content");

  return (
    <div className="mt-[30px] mb-[250px] container max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-[45px] font-semibold">{t("earlyEscape")}</h1>
        <p className="text-gray-500">{t("earlyEscapeSubtitle")}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex gap-6 justify-center">
          <Image
            src="/images/room-2.png"
            alt={t("deluxeTwinRoom")}
            width={280}
            height={400}
            className="rounded-xl object-cover"
          />
          <Image
            src="/images/food.png"
            alt={t("dailyBreakfast")}
            width={280}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>

        <div className="flex flex-col justify-start mt-8 lg:mt-0 max-w-md">
          <p className="uppercase text-sm text-gray-500 mb-2">
            {t("offerPeriod")}
          </p>
          <h2 className="text-xl font-semibold mb-2">{t("stayAtNights")}</h2>
          <p className="text-gray-600 mb-6">
            {t("earlyEscapeDescription")}
          </p>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">{t("stayIncludes")}</h3>
            <ul className="text-gray-600 list-disc pl-5">
              <li>{t("discountBestRate")}</li>
            </ul>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-2">{t("additionalInclusions")}</h3>
            <ul className="text-gray-600 list-disc pl-5 space-y-1">
              <li>{t("flexibleCheckIn")}</li>
              <li>{t("dailyBreakfast")}</li>
              <li>{t("dailyCulture")}</li>
            </ul>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold text-sm text-gray-800">
              {t("termsConditions")}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
