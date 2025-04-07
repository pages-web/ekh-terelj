import { Button } from "@/components/ui/button";
import { Users, Clock, ParkingCircle } from "lucide-react";

const eventSpaces = [
  {
    title: "Celebrations",
    description:
      "Whether a special birthday, anniversary, or cocktail-raising occasion, Aman New York serves as the perfect backdrop for life’s milestones.",
    image: "/images/number1.png",
  },
  {
    title: "Garden Terrace",
    description:
      "With immersive views of the city below, The Garden Terrace, with its fire pits, water features, and surrounding greenery, offers a show stopping New York backdrop for any occasion.",
    image: "/images/number2.png",
  },
  {
    title: "Private Dining",
    description:
      "The ideal setting for an upcoming gathering, Aman New York’s Private Dining rooms combine the brand’s warm hospitality with menus created by renowned chefs.",
    image: "/images/number3.png",
  },
];
import Link from "next/link";

export default function MeetingsAndEvents() {
  return (
    <div className="max-w-6xl mx-auto p-6 mb-[60px]">
      <div className="text-center mb-10">
        <h1 className="text-[30px] font-semibold mb-2">Meetings & Events</h1>
        <p className="text-sm">
          Unparalleled spaces to celebrate or strategise
        </p>
      </div>

      <div className="space-y-12">
        {eventSpaces.map((space, index) => (
          <div
            key={space.title}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
          >
            <img
              src={space.image}
              alt={space.title}
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

              <Link href="/arva" passHref>
                <Button className="mt-4">View more →</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
