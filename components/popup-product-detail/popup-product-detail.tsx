import {
  BedDouble,
  CarFront,
  CreditCard,
  House,
  Users,
  Wifi,
} from "lucide-react";
import Image from "../ui/image";
import IconWithTitle from "../icon-with-title/icon-with-title";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useCallback, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import {
  DotButton,
  useDotButton,
} from "../ui/EmblaCarouselDotButton/EmblaCarouselDotButton";
import { EmblaCarouselType } from "embla-carousel";

const PopupProductDetail = () => {
  const facilities = [
    { title: "1 King Bed", icon: <BedDouble className="w-6 h-6" /> },
    { title: "Free WiFi", icon: <Wifi className="w-6 h-6" /> },
    { title: "Free self parking", icon: <CarFront className="w-6 h-6" /> },
    { title: "Sleeps 3", icon: <Users className="w-6 h-6" /> },
    { title: "452 sq ft", icon: <House className="w-6 h-6" /> },
    {
      title: "Reserve now, pay later",
      icon: <CreditCard className="w-6 h-6" />,
    },
  ];
  const [api, setApi] = React.useState<CarouselApi>();
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }) as any
  );

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    api as any,
    onNavButtonClick
  );
  return (
    <div className="flex flex-col gap-4">
      <h1 className="px-4 text-displayxs">Duxton Room twin</h1>
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        setApi={setApi}
      >
        <CarouselContent>
          {Array(3)
            .fill(1)
            .map(() => {
              return (
                <CarouselItem>
                  <Image
                    src="/images/product.png"
                    width={1000}
                    height={800}
                    quality={100}
                    className="w-full"
                  />
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <div className="w-full absolute bottom-5 flex justify-center gap-[10px]">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`w-3 h-3 rounded-full
            ${index === selectedIndex ? " bg-white" : "bg-white/30"}`}
            />
          ))}
        </div>
      </Carousel>
      <div className="space-y-8">
        <div className="px-4 space-y-4">
          <h3 className="text-displayxs">Overview</h3>
          <p className="text-textsm">
            Luxury eco-certified hotel refurbished in 2019 and located near
            Sükhbaatar Square located close to National Academic Theatre of
            Opera and Ballet of Mongolia and The Fine Arts Zanabazar Museum,
            Kempinski Hotel Khan Palace provides a shopping mall on site, a hair
            salon, and dry cleaning/laundry services. Treat yourself to
            reflexology, a manicure/pedicure, or aromatherapy at Kempinski Aster
            Spa, the onsite spa. Enjoy Japanese cuisine and brunch at the two
            onsite restaurants. Stay connected with free in-room WiFi, and
            guests can find other amenities such as a bar and a 24-hour gym.
          </p>
        </div>
        <div className="px-4 space-y-4">
          <h3 className="text-displayxs">Room best facilities</h3>
          <div className="grid md:grid-cols-2 gap-3 md:gap-6">
            {facilities.map((facility, index) => {
              return (
                <IconWithTitle
                  title={facility.title}
                  icon={facility.icon}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Separator className="my-2" />
      <div className="px-4 flex justify-end">
        <DialogClose>
          <Button variant={"secondary"} className="w-fit">
            Close
          </Button>
        </DialogClose>
      </div>
    </div>
  );
};

export default PopupProductDetail;
