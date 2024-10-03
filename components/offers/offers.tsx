import Image from "next/image";

export default function Offer() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1600px]">
      <h1 className="text-3xl font-bold mb-4 ">
        Browse offers at our premier hotel
      </h1>
      <p className="text-lg text-muted-foreground mb-12 ">
        Our beautiful hotels and resorts offer luxurious accommodation, exclusive Sydney accommodation deals, signature experiences, and memorable destinations.
      </p>

      <div className="space-y-16">
        {offers.map((offer, index) => (
          <section
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-8`}
          >
            <div className="md:w-1/2">
              <Image
                src={offer.imageSrc}
                alt={offer.imageAlt}
                width={600}
                height={400}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/3 flex flex-col justify-center">
              <h2 className="text-2xl font-semibold mb-4">{offer.title}</h2>
              <p>{offer.description}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

const offers = [
  {
    imageSrc: "/images/Rectangle 13.png",
    imageAlt: "Luxurious indoor pool",
    title: "Stay 3 nights and save",
    description:
      "Immerse yourself in the luxuries of our guestrooms and suites with a minimum stay of three nights, including breakfast.",
  },
  {
    imageSrc: "/images/Rectangle 2.png",
    imageAlt: "Spa-like setting",
    title: "Auriga wellness transformation",
    description:
      "Immerse yourself in the bespoke, holistic therapies of Auriga Spa, designed to provide a haven for rejuvenation and restoration, amidst the changing pace of our modern lifestyles. Enjoy a AUD 200 Auriga Spa credit to elevate your Capella Sydney experience.",
  },
  {
    imageSrc: "/images/Rectangle1.png",
    imageAlt: "Elegant hotel room",
    title: "First Birthday - AUD 365 Hotel Credit",
    description:
      "To celebrate a momentous milestone, escape to a sanctuary in the heart of Sydney, unwind in timeless luxury where every moment is meticulously crafted and be treated to AUD 365 Hotel Credit.",
  },
];