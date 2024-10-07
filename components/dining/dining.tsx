"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  "/images/image 8.png",
  "/images/image1.png",
  "/images/image 8.png",
  "/images/image1.png",
]

export default function HotelDining() {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [activeButton, setActiveButton] = React.useState("Restaurant");

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <ScrollArea className="h-100% w-full">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-displaysm font-normal mb-4">Dining at Best Western</h1>
        <p className="text-gray-600 mb-8 text-muted-foreground">
          Aman Tokyo is home to one of the widest selections of dining venues found in any of the city's hotels.
        </p>
        <div className="lg:flex lg:justify-start grid grid-cols-2 justify-center items-center gap-2 space-x-2 mb-8">
          {["Restaurant", "Bar", "Lounge", "Private dining"].map((name) => (
            <Button
              key={name}
              variant="outline"
              className={`${
                activeButton === name ? "bg-black text-white" : "bg-white text-black"
              } hover:bg-gray-800`}
              onClick={() => handleButtonClick(name)}
            >
              {name}
            </Button>
          ))}
        </div>
        <Card className="mb-8">
          <CardContent className="p-0 relative">
            <div className="relative h-[600px] w-full">
              <Image
                className="rounded-3xl bg-auto"
                src={images[currentImage]}
                alt={`Dining area ${currentImage + 1}`}
                layout="fill"
                objectFit="cover"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next image</span>
              </Button>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={`w-2 h-2 p-0 rounded-full ${
                    index === currentImage ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentImage(index)}
                >
                  <span className="sr-only">Go to image {index + 1}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        <h2 className="text-textxl font-bold mb-4">Where curated cocktails meet world-class cuisine</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <p className="text-gray-600">
            Balancing storied architectural features with a contemporary design aesthetic, Capella Sydney celebrates the
            Australian panorama through its interiors, location and experiences. The ground-level showcases three food and
            beverage outlets – all top restaurants in sydney and within footsteps of the glistening harbour foreshore, the
            famed Sydney Opera House and Harbour Bridge.
          </p>
          <p className="text-gray-600">
            With influences from across the globe, the hotel's restaurants showcase inspired cuisine – from Mediterranean
            feasts to refined Japanese omakase - while the expansive Spa invites guests to pamper pre or post celebration,
            experiencing the tradition of onsen bathing or a relaxing yoga class overlooking the city below.
          </p>
        </div>
      </div>
    </ScrollArea>
  );
}