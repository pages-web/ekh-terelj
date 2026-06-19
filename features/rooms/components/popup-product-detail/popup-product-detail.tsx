import {
  BedDouble,
  CarFront,
  CreditCard,
  House,
  Users,
  Wifi,
} from "lucide-react";
import Image from "@/components/ui/image";
import IconWithTitle from "@/components/icon-with-title/icon-with-title";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useCallback, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  DotButton,
  useDotButton,
} from "@/components/ui/EmblaCarouselDotButton/EmblaCarouselDotButton";
import { EmblaCarouselType } from "embla-carousel";
import { IProduct } from "@/features/rooms/types";
import { CmsContent } from "@/features/cms/components/content-render";
import { getProductDescriptionHtml } from "@/lib/product-description";
import { useTranslations } from "next-intl";

const PopupProductDetail = ({ ...room }: IProduct) => {
  const tContent = useTranslations("Content");
  const tCommon = useTranslations("Common");
  const category = room.category;
  const { name, description, attachment, attachmentMore } = room;
  const overview = getProductDescriptionHtml(
    description || category?.description,
  );
  const images = [attachment, attachmentMore].flat();
  const facilities = [
    { title: tContent("kingBed", { count: 1 }), icon: <BedDouble className="w-6 h-6" /> },
    { title: tContent("freeWifi"), icon: <Wifi className="w-6 h-6" /> },
    { title: tContent("freeSelfParking"), icon: <CarFront className="w-6 h-6" /> },
    { title: tContent("sleepsGuests", { count: 3 }), icon: <Users className="w-6 h-6" /> },
    { title: tContent("roomSizeSqFt", { count: 452 }), icon: <House className="w-6 h-6" /> },
    {
      title: tContent("reserveNowPayLater"),
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
      <h1 className="px-4 text-displayxs">{name || category?.name}</h1>
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        setApi={setApi}
      >
        <CarouselContent>
          {images.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <Image
                  // src={image?.url}
                  src="/images/product.png"
                  alt={name || category?.name || tContent("room")}
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
          <h3 className="text-displayxs">{tContent("overview")}</h3>
          <CmsContent html={overview} className="text-textsm" />
        </div>
        <div className="px-4 space-y-4">
          <h3 className="text-displayxs">{tContent("roomFacilities")}</h3>
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
            {tCommon("close")}
          </Button>
        </DialogClose>
      </div>
    </div>
  );
};

export default PopupProductDetail;
