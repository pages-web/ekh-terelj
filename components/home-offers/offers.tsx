"use client";

import Image from "next/image";
import HeadingButton from "../heading-button/heading-button";
import Heading from "../heading/heading";

const features = [
  {
    title: "DINING",
    image: "/images/dinning.png",
    heading: "NAMA Restaurant",
    description:
      "Both guests and non-residents are invited to dine at Aman Le Mélézin. Please contact the team to make a reservation at Nama, the hotel's exceptional Japanese restaurant.",
    span: "col-span-2",
  },
  {
    title: "CELEBRATION",
    image: "/images/celebration.png",
    heading: "Host the perfect event",
    description:
      "Plan your perfect event in an elegant setting, complemented by personalized services to make every moment unforgettable.",
  },
  {
    title: "WELLNESS",
    image: "/images/wellness.png",
    heading: "Holistic Healing",
    description:
      "Rejuvenate with our world-class wellness programs, combining ancient traditions and modern therapies for a unique experience.",
  },
  {
    title: "EXPERIENCE",
    image: "/images/experience.png",
    heading: "Discover at Aman",
    description:
      "Explore hidden gems and indulge in exclusive experiences, from cultural adventures to outdoor excursions.",
  },
  {
    title: "OFFERS",
    image: "/images/offers.png",
    heading: "Exclusive Offers at Aman",
    description:
      "Unlock special deals and unique experiences curated just for you. Enjoy luxury at its finest with our exclusive offers.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="space-y-10">
      <div className="flex flex-col items-center text-center space-y-6">
        <HeadingButton title="Features" link=""/>
        <Heading
          title="Experience Comfort & Culture in a Modern Way"
          desc=" Discover luxury from towering heights with a private theater production
        in our suites, a swim in the highest hotel pool in Western Europe, or
        indulge in afternoon tea with a unique Asian twist."
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-lg overflow-hidden shadow ${
              feature.span || ""
            }`}
          >
            <Image
              src={feature.image}
              alt={feature.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="text-sm uppercase font-bold text-gray-500">
                {feature.title}
              </h3>
              <h4 className="text-lg font-semibold mt-1">{feature.heading}</h4>
              <p className="text-gray-600 text-sm mt-2">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
