import { Button } from "@/components/ui/button";
import { Users, Clock, ParkingCircle } from "lucide-react";
import Image from "next/image";

const eventSpaces = [
  {
    title: "The Arva",
    description:
      "Drawing its name from the Latin word for ‘cultivated land’, Arva pays homage to Italy’s rustic, cucina del raccolto tradition, creating heart-warming dishes using the finest, sustainably sourced ingredients from local farms and fresh from the ocean.",
    image: "/images/arva.png",
  },
  {
    title: "The Nama",
    description:
      "With immersive views of the city below, The Garden Terrace, with its fire pits, water features, and surrounding greenery, offers a show stopping New York backdrop for any occasion.",
    image: "/images/nama.png",
  },
  {
    title: "Garden Terrace",
    description:
      "Welcoming year-round alfresco dining, the Garden Terrace - with its retractable glass roof, firepits and water features - offers sophisticated light meals and original cocktails served in a convivial atmosphere. A corner bar adds to the allure, with spectacular views overlooking the iconic crossroads of Fifth Avenue and 57th Street.",
    image: "/images/garden.png",
  },
  {
    title: "Lounge bar",
    description:
      "Open day to night, working fireplaces frame the Lounge Bar – Aman New York’s central hub - offering a sophisticated menu of light dishes, sharing plates and cicchetti served alongside premium drinks, original cocktails, craft beers, spirits, and fine wines.",
    image: "/images/lounge-bar.png",
  },
];
import Link from "next/link";

export default function Dining() {
  return (
    <div className="max-w-6xl mx-auto p-6 mb-[60px]">
      <div className="text-center mb-10">
        <h1 className="text-[30px] font-semibold mb-2">Cuisine</h1>
        <p className="text-sm">
          Aman Tokyo is home to one of the widest selections of dining venues
          found in any of the city’s hotels.
        </p>
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
                  120 people
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  First hour free
                </div>
                <div className="flex items-center gap-1">
                  <ParkingCircle size={16} />
                  Free parking
                </div>
              </div>

              <Link href="/dinning-details" passHref>
                <Button className="mt-4">View more →</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
