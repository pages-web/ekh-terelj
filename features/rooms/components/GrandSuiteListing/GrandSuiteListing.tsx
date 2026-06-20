"use client";

import {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLazyQuery } from "@apollo/client";
import Autoplay from "embla-carousel-autoplay";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import {
  ArrowRight,
  Bed,
  CalendarIcon,
  ChevronDown,
  Minus,
  Plus,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "@/components/ui/image";
import { Loading } from "@/components/ui/loading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { currentConfigAtom } from "@/constants/config";
import DateForm from "@/features/booking/components/date-form";
import { useGetProducts } from "@/features/booking/hooks/extras";
import {
  reserveDateAtom,
  reserveGuestAndRoomAtom,
} from "@/features/booking/store/reserve";
import { selectedRoomsAtom } from "@/features/booking/store/rooms";
import roomQueries from "@/features/rooms/lib/gql/queries";
import { IAttachment, IProduct } from "@/features/rooms/types";
import { useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";

const ACCOMMODATION_CATEGORY_ID = "gx_eK_IA1ohXzYzpawBaA";

const getDescriptionHtml = (description?: string) => {
  if (!description) return "";

  try {
    const blocks = JSON.parse(description);
    if (!Array.isArray(blocks)) return description;

    return blocks
      .map((block: { content?: { text?: string }[] }) => {
        const text = (block.content || [])
          .map((content: { text?: string }) => content.text)
          .filter(Boolean)
          .join("");

        return text ? `<p>${text}</p>` : "";
      })
      .join("");
  } catch {
    return description;
  }
};

const formatMoney = (value?: number) =>
  value ? `${value.toLocaleString()}₮` : "";

const slideFromLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const BookingField = ({
  title,
  children,
}: PropsWithChildren & { title: string }) => (
  <div className="space-y-2">
    <p className="text-xs font-semibold text-[#65778f]">{title}</p>
    {children}
  </div>
);

const FieldButton = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button> & { muted?: boolean }
>(({ muted, children, className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    className={cn(
      "h-12 w-full cursor-pointer justify-between rounded-md border-[#dce5ef] bg-white px-4 text-left font-semibold text-[#1b2f3d] shadow-sm hover:bg-[#f7fafc] focus-visible:ring-primary",
      muted && "text-muted-foreground",
      className,
    )}
    {...props}
  >
    <span className="flex min-w-0 items-center">{children}</span>
    <ChevronDown className="ml-3 h-4 w-4 shrink-0 text-[#65778f]" />
  </Button>
));
FieldButton.displayName = "FieldButton";

type BookingPanelProps = {
  room: IProduct;
};

type CountSelectorProps = {
  title: string;
  value: number;
  min?: number;
  onChange: (value: number) => void;
};

const CountSelector = ({
  title,
  value,
  min = 0,
  onChange,
}: CountSelectorProps) => (
  <div className="flex items-center justify-between gap-4 rounded-md bg-[#f7fafc] p-3">
    <span className="text-sm font-semibold text-[#1b2f3d]">{title}</span>
    <div className="flex items-center gap-3">
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="h-8 w-8 rounded-full"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-6 text-center text-sm font-semibold text-[#1b2f3d]">
        {value}
      </span>
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="h-8 w-8 rounded-full"
        onClick={() => onChange(value + 1)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

const RoomDetailBookingPanel = ({ room }: BookingPanelProps) => {
  const tBooking = useTranslations("Booking");
  const router = useRouter();
  const descriptionHtml = getDescriptionHtml(room.description);
  const [date] = useAtom(reserveDateAtom);
  const [reserveGuestAndRoom, setReserveGuestAndRoom] = useAtom(
    reserveGuestAndRoomAtom,
  );
  const [selectedRooms, setSelectedRooms] = useAtom(selectedRoomsAtom);
  const currentConfig = useAtomValue(currentConfigAtom);
  const [checkRoomAvailability, { loading: checkingAvailability }] =
    useLazyQuery(roomQueries.checkRooms, {
      fetchPolicy: "network-only",
    });
  const {
    adults,
    children,
    room: roomCount,
  } = reserveGuestAndRoom || {
    adults: 1,
    children: 0,
    room: 1,
  };

  useEffect(() => {
    if (!reserveGuestAndRoom?.room || !reserveGuestAndRoom?.adults) {
      setReserveGuestAndRoom({
        room: reserveGuestAndRoom?.room || 1,
        adults: reserveGuestAndRoom?.adults || 1,
        children: reserveGuestAndRoom?.children || 0,
      });
    }
  }, [reserveGuestAndRoom, setReserveGuestAndRoom]);

  const updateGuestAndRoom = (
    values: Partial<NonNullable<typeof reserveGuestAndRoom>>,
  ) => {
    setReserveGuestAndRoom({
      room: reserveGuestAndRoom?.room || 1,
      adults: reserveGuestAndRoom?.adults || 1,
      children: reserveGuestAndRoom?.children || 0,
      ...values,
    });
  };

  const handleReserveRoom = async () => {
    if (!date?.from || !date?.to) {
      toast.error(tBooking("pickDate"));
      return;
    }

    const pipelineId = currentConfig?.pipelineConfig?.pipelineId;

    if (!pipelineId) {
      toast.error(tBooking("bookingConfigNotReady"));
      return;
    }

    const { data } = await checkRoomAvailability({
      variables: {
        pipelineId,
        ids: [room._id],
        startDate: date.from,
        endDate: date.to,
      },
    });
    const isRoomAvailable = data?.cpPmsCheckRooms?.some(
      (availableRoom: IProduct) => availableRoom._id === room._id,
    );

    if (!isRoomAvailable) {
      toast.error(tBooking("roomAlreadyReserved"));
      return;
    }

    const isAlreadySelected = selectedRooms.some(
      (selectedRoom) => selectedRoom.room?._id === room._id,
    );
    const isRoomSelectionFull = selectedRooms.length >= roomCount;

    if (roomCount !== 1 && !isAlreadySelected && isRoomSelectionFull) {
      toast.error(tBooking("roomSelectionFull"), {
        description: tBooking("roomSelectionFullDescription"),
      });
      return;
    }

    const nextSelectedRooms =
      roomCount === 1
        ? [{ room, extras: [] }]
        : isAlreadySelected
          ? selectedRooms.map((selectedRoom) =>
              selectedRoom.room?._id === room._id
                ? { ...selectedRoom, room }
                : selectedRoom,
            )
          : [...selectedRooms, { room, extras: [] }];

    setSelectedRooms(nextSelectedRooms);

    if (nextSelectedRooms.length >= roomCount) {
      router.push("/booking/your-details");
      return;
    }

    router.push("/booking");
  };

  return (
    <div className="flex flex-col gap-4 lg:h-[662px]">
      <motion.div
        variants={slideFromRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-[#dce5ef] bg-[#fbfcfd] p-4 shadow-sm sm:p-5"
      >
        <h1 className="mb-3 text-xl font-semibold text-primary sm:text-2xl">
          {room.name}
        </h1>
        <div
          className="room-detail-content mb-5 text-sm leading-7 text-[#65778f] sm:text-base"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
        <div className="grid gap-4 border-t border-[#e6edf3] pt-5 sm:gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <BookingField title={tBooking("checkIn")}>
              <Popover>
                <PopoverTrigger asChild>
                  <FieldButton muted={!date?.from}>
                    <CalendarIcon className="mr-3 h-5 w-5 shrink-0" />
                    {date?.from
                      ? format(date.from, "MMM d")
                      : tBooking("pickDate")}
                  </FieldButton>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[calc(100vw-2rem)] max-w-[340px] p-5"
                  align="start"
                >
                  <DateForm mode="check-in" />
                </PopoverContent>
              </Popover>
            </BookingField>

            <BookingField title={tBooking("checkOut")}>
              <Popover>
                <PopoverTrigger asChild>
                  <FieldButton muted={!date?.to}>
                    <CalendarIcon className="mr-3 h-5 w-5 shrink-0" />
                    {date?.to ? format(date.to, "MMM d") : tBooking("pickDate")}
                  </FieldButton>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[calc(100vw-2rem)] max-w-[340px] p-5"
                  align="start"
                >
                  <DateForm mode="check-out" />
                </PopoverContent>
              </Popover>
            </BookingField>
          </div>

          <BookingField title={tBooking("room")}>
            <Popover>
              <PopoverTrigger asChild>
                <FieldButton>
                  <Bed className="mr-3 h-5 w-5 shrink-0" />
                  {tBooking("rooms", { count: roomCount })}
                </FieldButton>
              </PopoverTrigger>
              <PopoverContent
                className="w-[calc(100vw-2rem)] max-w-[340px] p-5"
                align="start"
              >
                <CountSelector
                  title={tBooking("room")}
                  value={roomCount}
                  min={1}
                  onChange={(value) => updateGuestAndRoom({ room: value })}
                />
              </PopoverContent>
            </Popover>
          </BookingField>

          <BookingField title={tBooking("guest")}>
            <Popover>
              <PopoverTrigger asChild>
                <FieldButton>
                  <Users className="mr-3 h-5 w-5 shrink-0" />
                  <span className="truncate">
                    {tBooking("adult", { count: adults })}
                    {!!children &&
                      `, ${tBooking("child", { count: children })}`}
                  </span>
                </FieldButton>
              </PopoverTrigger>
              <PopoverContent
                className="w-[calc(100vw-2rem)] max-w-[340px] p-5"
                align="start"
              >
                <div className="space-y-3">
                  <CountSelector
                    title={tBooking("adults")}
                    value={adults}
                    min={1}
                    onChange={(value) => updateGuestAndRoom({ adults: value })}
                  />
                  <CountSelector
                    title={tBooking("children")}
                    value={children}
                    onChange={(value) =>
                      updateGuestAndRoom({ children: value })
                    }
                  />
                </div>
              </PopoverContent>
            </Popover>
          </BookingField>
        </div>
      </motion.div>

      <motion.div
        variants={slideFromRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="shrink-0 rounded-lg border border-[#dce5ef] bg-white p-4 shadow-sm sm:p-5"
      >
        <p className="text-sm text-muted-foreground">
          {tBooking("pricePerNight")}
        </p>
        <p className="mt-1 text-2xl font-semibold text-primary">
          {formatMoney(room.unitPrice)}
        </p>
        <Button
          className="mt-4 h-10 w-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
          onClick={handleReserveRoom}
          disabled={checkingAvailability}
        >
          {checkingAvailability
            ? tBooking("checking")
            : tBooking("reserveThisRoom")}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
};

export default function GrandSuiteListing() {
  const tBooking = useTranslations("Booking");
  const params = useParams();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { products, loading }: { products: IProduct[]; loading: boolean } =
    useGetProducts({
      variables: {
        categoryIds: [ACCOMMODATION_CATEGORY_ID],
        perPage: 1000,
      },
    });

  const room = products.find((product) => product._id === params.slug);
  const images = useMemo(
    () =>
      [room?.attachment, ...(room?.attachmentMore || [])].filter(
        Boolean,
      ) as IAttachment[],
    [room?.attachment, room?.attachmentMore],
  );
  useEffect(() => {
    if (!api) return;

    const onSelect = () => setActiveSlide(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  if (loading || !room) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loading />
      </div>
    );
  }

  return (
    <main className="bg-background px-4 py-24 text-foreground">
      <div className="container mx-auto grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
        <motion.section
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6"
        >
          {images.length > 0 && (
            <div className="flex h-[420px] flex-col overflow-hidden rounded-lg border border-[#dce5ef] bg-card shadow-sm sm:h-[520px] lg:h-[662px]">
              <Carousel
                setApi={setApi}
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 4500, stopOnInteraction: false })]}
                className="min-h-0 flex-1 [&>div]:h-full"
              >
                <CarouselContent className="h-full">
                  {images.slice(0, 10).map((image, index) => (
                    <CarouselItem key={image.url} className="h-full">
                      <Image
                        src={image.url}
                        alt={tBooking("suiteImageAlt", { index: index + 1 })}
                        width={1200}
                        height={820}
                        priority={index === 0}
                        className="h-full w-full object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-3" />
                <CarouselNext className="right-3" />
              </Carousel>

              {images.length > 1 && (
                <div className="flex h-10 shrink-0 items-center justify-center gap-2">
                  {images.slice(0, 10).map((image, index) => (
                    <button
                      key={image.url}
                      type="button"
                      onClick={() => api?.scrollTo(index)}
                      aria-label={tBooking("suiteThumbnailAlt", {
                        index: index + 1,
                      })}
                      className={cn(
                        "h-1.5 rounded-full bg-muted-foreground/30 transition-all",
                        activeSlide === index ? "w-7 bg-primary" : "w-2",
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.section>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <RoomDetailBookingPanel room={room} />
        </aside>
      </div>
    </main>
  );
}
