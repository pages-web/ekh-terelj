import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function ArvaPage() {
  const t = await getTranslations("Content");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button className="mb-4 text-blue-500 hover:underline">←</button>

      <h1 className="text-[28px] font-semibold text-center">{t("theArva")}</h1>
      <p className="text-center text-sm text-gray-600 mt-2">
        <a href="#" className="underline hover:text-gray-800">
          {t("cuisine")}
        </a>
      </p>

      <div className="flex justify-center my-4">
        <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm">
          {t("makeEnquiry")}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          "/images/yi.png",
          "/images/are.png",
          "/images/san.png",
          "/images/si.png",
          "/images/wu.png",
          "/images/liu.png",
        ].map((src, i) => (
          <div key={i} className="overflow-hidden rounded-xl">
            <Image
              src={src}
              alt={`${t("theArva")} ${i + 1}`}
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 text-sm text-gray-700 space-y-4">
        <p>
          Aman debuts its global dining concept, Arva, for the first time in
          North America, offering authentically Italian breakfast, lunch, and
          dinner, imbued with a distinct sense of place, in the heart of
          Manhattan. Paying homage to Italy’s rustic, cucina del
          raccolto tradition (literally ‘harvest cuisine’), ingredients are
          transformed into elegant dishes that showcase the exquisite flavours
          of the finest seasonal ingredients. Arva changes with the seasons,
          sourcing the majority of its ingredients locally from a network of
          farmers and purveyors, while also partnering with initiatives such as
          City Harvest. Fulton Fish Market provides the freshest seafood, while
          the option to opt for filtered Vero water when dining supports The
          Billion Oyster Project, a conservation initiative that aims to clean
          local waterways.
        </p>
      </div>
    </div>
  );
}
