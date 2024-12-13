"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Car } from "lucide-react";

export default function Promo() {
  const handleGetDirections = () => {
    const destination = encodeURIComponent(
      "Prime Minister Amar's street 15, Ulaanbaatar 14200, Mongolia"
    );
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(mapsUrl, "_blank");
  };
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1 md:col-span-2 relative overflow-hidden h-[544px]">
          <Image
            src="/images/Rectangle 11.png"
            alt="Luxury hotel room with ocean view"
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <h2 className="text-white text-displaylg md:text-4xl font-bold text-center px-4">
              Beyond accomodation, creeating memories of a lifetime
            </h2>
          </div>
        </Card>

        <div className="col-span-1 space-y-4">
          <Card className="bg-black text-white">
            <CardContent className="pt-6">
              <h3 className="text-displayxs font-bold mb-2">
                Explore more to get your comfort zone
              </h3>
              <p className="text-textsm mb-4">Book your perfect stay with us</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white">
                Book Now
                <span className="ml-2">→</span>
              </Button>
            </CardFooter>
          </Card>

          <div className="w-full max-w-md mx-auto">
            <Card className="overflow-hidden">
              <div className="relative h-40">
                <Image
                  src="/images/Rectangle 10.png"
                  alt="Hotel location"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start space-x-2 mb-3">
                  <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <p className="text-textsm text-gray-600">
                    {`Prime Minister Amar's street 15, Ulaanbaatar 14200, Mongolia`}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Car className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <p className="text-textsm text-gray-600">
                    A 40 minute drive from taxi station
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  onClick={handleGetDirections}
                  className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white"
                >
                  Get directions
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
