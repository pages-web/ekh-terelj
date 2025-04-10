import Image from "next/image";

export default function OfferDetails() {
  return (
    <div className="mt-[30px] mb-[250px] container max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-[45px] font-semibold">Early Escape</h1>
        <p className="text-gray-500">Book early and enjoy exclusive rates</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex gap-6 justify-center">
          <Image
            src="/images/room-2.png"
            alt="Elegant hotel room"
            width={280}
            height={400}
            className="rounded-xl object-cover"
          />
          <Image
            src="/images/food.png"
            alt="Delicious breakfast plate"
            width={280}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>

        <div className="flex flex-col justify-start mt-8 lg:mt-0 max-w-md">
          <p className="uppercase text-sm text-gray-500 mb-2">
            Until 01 December 2024
          </p>
          <h2 className="text-xl font-semibold mb-2">Stay at a nights</h2>
          <p className="text-gray-600 mb-6">
            Enjoy an exclusive rate inclusive of breakfast when booking a stay
            at Aman New York more than 30 days in advance.
          </p>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Your stay includes</h3>
            <ul className="text-gray-600 list-disc pl-5">
              <li>Up to 15% off best available rate</li>
            </ul>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-2">Additional inclusions</h3>
            <ul className="text-gray-600 list-disc pl-5 space-y-1">
              <li>Flexible check-in (upon availability)</li>
              <li>Daily a la carte breakfast</li>
              <li>Daily cultural programming</li>
            </ul>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold text-sm text-gray-800">
              Terms & Conditions
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
