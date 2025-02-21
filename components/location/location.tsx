"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plane, Car } from "lucide-react";

export default function Location() {
  const handleGetDirections = () => {
    const destination = encodeURIComponent(
      "Zaluuchuud Ave, БЗД - 1 хороо, Улаанбаатар 13380"
    );
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-displaysm font-normal-bold mb-2">
        Browse offers at our premier hotel
      </h2>
      <p className="text-gray-600 mb-6 text-muted-foreground">
        Our beautiful hotels and resorts offer luxurious accommodation,
        exclusive Sydney accommodation deals, signature experiences and
        memorable destinations.
      </p>
      <Card className="overflow-hidden">
        <div className="h-[400px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3362.9127757590254!2d106.9352121770386!3d47.92438637122066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9692166117ef3d%3A0x16047093895df1e4!2sFlower%20Hotel!5e1!3m2!1smn!2smn!4v1740094066102!5m2!1smn!2smn"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="lg:flex justify-center items-center">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <p className="text-textsm">{`Prime Minister Amar's street 15, Ulaanbaatar 14200, Mongolia`}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Plane className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <p className="text-textsm">
                  Nearest airport 2 hour Genghis khan airport
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Car className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <p className="text-textsm">A 40 minute drive taxi station</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end p-6 pt-0">
            <Button
              variant="outline"
              className="text-primary"
              onClick={handleGetDirections}
            >
              Get directions
              <span className="ml-2">→</span>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
