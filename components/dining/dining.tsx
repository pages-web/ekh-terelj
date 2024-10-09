"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"

interface HotelDiningProps {
  title: string;
  description: string;
  buttonNames: string[];
  images: string[];
}

export default function HotelDining({
  title,
  description,
  buttonNames,
  images
}: HotelDiningProps) {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [activeButton, setActiveButton] = React.useState(buttonNames[0]);

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
        <h1 className="text-displaysm font-normal mb-4">{title}</h1>
        <p className="text-gray-600 mb-8 text-muted-foreground">{description}</p>
        <div className="lg:flex lg:justify-start grid grid-cols-2 justify-center items-center gap-2 space-x-2 mb-8">
          {buttonNames.map((name) => (
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
        <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <Carousel className="w-full h-[600px]">
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="relative">
                    <img 
                      src={src}
                      alt={`Event space ${index + 1}`}
                      className="w-full h-[600px] object-cover rounded-lg"
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {images.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i === index ? "bg-white" : "bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </Carousel>
        </CardContent>
      </Card>
        <h2 className="text-textxl font-bold mb-4 mt-8">Where curated cocktails meet world-class cuisine</h2>
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