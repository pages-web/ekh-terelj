"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Plane, Car } from "lucide-react"

export default function Location() {
  const handleGetDirections = () => {
    const destination = encodeURIComponent("Prime Minister Amar's street 15, Ulaanbaatar 14200, Mongolia");
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-displaysm font-normal-bold mb-2">Browse offers at our premier hotel</h2>
      <p className="text-gray-600 mb-6 text-muted-foreground">
        Our beautiful hotels and resorts offer luxurious accommodation, exclusive Sydney accommodation deals, signature experiences and memorable destinations.
      </p>
      <Card className="overflow-hidden">
        <div className="h-[400px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d85624.2621394!2d106.84851532472902!3d47.921903771789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9692420c542c2b%3A0x7cc1aacb58a9a1!2sUlaanbaatar%2C%20Mongolia!5e0!3m2!1sen!2sus!4v1633356266483!5m2!1sen!2sus"
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
                <p className="text-textsm">Prime Minister Amar's street 15, Ulaanbaatar 14200, Mongolia</p>
              </div>
              <div className="flex items-center space-x-2">
                <Plane className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <p className="text-textsm">Nearest airport 2 hour Genghis khan airport</p>
              </div>
              <div className="flex items-center space-x-2">
                <Car className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <p className="text-textsm">A 40 minute drive taxi station</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end p-6 pt-0">
            <Button variant="outline" className="text-primary" onClick={handleGetDirections}>
              Get directions
              <span className="ml-2">→</span>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}