import React from "react";
import Image from "next/image";

interface Offer {
  title: string;
  expiry: string;
  description: string;
  primaryCta: string;
  secondaryCta?: string;
  hasArrow?: boolean;
  imageSrc: string;
  imageAlt: string;
}

const ExclusiveOffers = () => {
  const offers: Offer[] = [
    {
      title: "Early Escape",
      expiry: "UNTIL 01 DECEMBER 2024",
      description:
        "Book in advance and receive an exclusive nightly rate at Aman New York, inclusive of daily breakfast.",
      primaryCta: "View more",
      secondaryCta: "Check Availability",
      imageSrc: "/images/early-escape.png",
      imageAlt: "Early Escape offer",
    },
    {
      title: "Peace in the City",
      expiry: "UNTIL 27 MAY 2024",
      description:
        "Two-nights accommodation, dinner at Arva Terrace, daily breakfast and a private 60-minute meditation for two.",
      primaryCta: "View more",
      hasArrow: true,
      imageSrc: "/images/peace-city.png",
      imageAlt: "Peace in the City offer",
    },
    {
      title: "Signature Suite Stay",
      expiry: "UNTIL 31 DECEMBER 2024",
      description:
        "Three-nights accommodation in the Aman, Corner or Grand Suite, daily breakfast, roundtrip airport transportation and a $500 hotel credit.",
      primaryCta: "View more",
      hasArrow: true,
      imageSrc: "/images/spa-2.png",
      imageAlt: "Signature Suite Stay offer",
    },
    {
      title: "Family Retreat",
      expiry: "UNTIL 29 MAY 2024",
      description:
        "Two-nights accommodation, daily breakfast, family yoga for up to four participants and a $500 experience credit.",
      primaryCta: "View more",
      hasArrow: true,
      imageSrc: "/images/spa-1.png",
      imageAlt: "Family Retreat offer",
    },
    {
      title: "The Ultimate Aman New York Experience",
      expiry: "UNTIL 31 DECEMBER 2025",
      description:
        "Three-nights or more in a Grand, Premier, Junior, or Deluxe Suite, daily breakfast and culinary experiences at Arva and Nama, two mindfulness me...",
      primaryCta: "View more",
      hasArrow: true,
      imageSrc: "/images/spa-1.png",
      imageAlt: "Ultimate Aman Experience offer",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-[30px] font-semibold font-light mb-8">
        Exclusive Offers
      </h2>

      <p className="text-lg mb-12 max-w-3xl">
        Our beautiful hotels and resorts offer luxurious accommodation,
        exclusive Sydney accommodation deals, signature experiences and
        memorable destinations.
      </p>

      <div className="grid gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="relative h-80 w-full">
            <Image
              src={offers[0].imageSrc}
              alt={offers[0].imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6 flex flex-col justify-center">
            <p className="text-sm text-gray-500 mb-2">{offers[0].expiry}</p>
            <h3 className="text-2xl font-medium mb-3">{offers[0].title}</h3>
            <p className="text-gray-700 mb-4">{offers[0].description}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                {offers[0].primaryCta}
              </a>
              {offers[0].secondaryCta && (
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  {offers[0].secondaryCta}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.slice(1).map((offer, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={offer.imageSrc}
                  alt={offer.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{offer.expiry}</p>
                <h3 className="text-xl font-medium mb-3">{offer.title}</h3>
                <p className="text-gray-700 mb-4">{offer.description}</p>

                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
                >
                  {offer.primaryCta}
                  {offer.hasArrow && (
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExclusiveOffers;
