import Image from "next/image";

interface OfferProps {
  offers: Array<{ imageSrc: string; imageAlt: string; title: string; description: string }>;
  title: string;
  description: string;
}

export default function Offer({ offers, title, description }: OfferProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1600px]">
      <h1 className="text-displaysm font-normal mb-4">
        {title}
      </h1>
      <p className="text-muted-foreground mb-12">
        {description}
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
              <h2 className="text-displayxs font-semibold mb-4">{offer.title}</h2>
              <p>{offer.description}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}