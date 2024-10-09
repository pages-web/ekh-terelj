import { ArrowRight } from "lucide-react"
import Image from "next/image"

const propertyTypes = [
  {
    type: "Villas",
    available: "12,985",
    image: "/images/Rectangle 7.png",
  },
  {
    type: "Apartments",
    available: "985",
    image: "/images/Rectangle 7.png",
  },
  {
    type: "Resort",
    available: "367",
    image: "/images/Rectangle 7.png",
  },
  {
    type: "Hotel Rooms",
    available: "5",
    image: "/images/Rectangle 7.png",
  },
]

export default function Discover() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col  lg:justify-between items-center mb-6">
        <h2 className="text-displaysm font-normal ">Discover our services</h2>
        <a href="#" className="text-primary hidden lg:flex items-center">
          See All
          <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>
      <p className="text-muted-foreground mb-8">
        Explore our range of property types for every traveler's preference.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {propertyTypes.map((property, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{property.type}</h3>
                <p className="text-textsm text-muted-foreground">
                  {property.available} available
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
            <Image
              src={property.image}
              alt={property.type}
              width={400}
              height={200}
              className="rounded-lg object-cover w-full h-48"
            />
          </div>
        ))}
      </div>
    </div>
  )
}