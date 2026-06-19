"use client"

import { useParams } from "next/navigation"
import { Loading } from "../ui/loading"
import Image from "../ui/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { PropsWithChildren, useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { useGetProducts } from "@/sdk/queries/extras"
import { IProduct } from "@/types/products"
import { Button } from "../ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ArrowRight, Bed, CalendarIcon, Users } from "lucide-react"
import { useAtom, useAtomValue } from "jotai"
import { reserveDateAtom, reserveGuestAndRoomAtom } from "@/store/reserve"
import DateForm from "@/containers/reserve/date-form"
import RoomForm from "@/containers/reserve/room-form"
import GuestForm from "@/containers/reserve/guest-form"
import { selectedRoomsAtom } from "@/store/rooms"
import { useSelectRoom } from "@/hooks/room/room-hooks"
import { toast } from "sonner"
import { useRouter } from "@/i18n/routing"
import { useLazyQuery } from "@apollo/client"
import { queries as roomQueries } from "@/sdk/graphql/rooms"
import { currentConfigAtom } from "@/store/config"

const ACCOMMODATION_CATEGORY_ID = "gx_eK_IA1ohXzYzpawBaA"

const getDescriptionHtml = (description?: string) => {
  if (!description) return ""

  try {
    const blocks = JSON.parse(description)
    if (!Array.isArray(blocks)) return description

    return blocks
      .map((block: { content?: { text?: string }[] }) => {
        const text = (block.content || [])
          .map((content: { text?: string }) => content.text)
          .filter(Boolean)
          .join("")

        return text ? `<p>${text}</p>` : ""
      })
      .join("")
  } catch {
    return description
  }
}

const BookingField = ({
  title,
  children,
}: PropsWithChildren & { title: string }) => {
  return (
    <div className='flex flex-col gap-2'>
      <span className='text-sm font-semibold text-gray-700'>{title}</span>
      {children}
    </div>
  )
}

const RoomDetailBookingPanel = ({ room }: { room: IProduct }) => {
  const router = useRouter()
  const [date] = useAtom(reserveDateAtom)
  const [reserveGuestAndRoom, setReserveGuestAndRoom] = useAtom(
    reserveGuestAndRoomAtom
  )
  const [selectedRooms] = useAtom(selectedRoomsAtom)
  const currentConfig = useAtomValue(currentConfigAtom)
  const { HandleSelectRoom } = useSelectRoom({ room })
  const [checkRoomAvailability, { loading: checkingAvailability }] =
    useLazyQuery(roomQueries.checkRooms, {
      fetchPolicy: "network-only",
    })
  const { adults, children, room: roomCount } = reserveGuestAndRoom || {
    adults: 1,
    children: 0,
    room: 1,
  }

  useEffect(() => {
    if (!reserveGuestAndRoom?.room || !reserveGuestAndRoom?.adults) {
      setReserveGuestAndRoom({
        pet: reserveGuestAndRoom?.pet || false,
        room: reserveGuestAndRoom?.room || 1,
        adults: reserveGuestAndRoom?.adults || 1,
        children: reserveGuestAndRoom?.children || 0,
      })
    }
  }, [reserveGuestAndRoom, setReserveGuestAndRoom])

  const handleReserveRoom = async () => {
    if (!date?.from || !date?.to) {
      toast.error("Pick a date")
      return
    }

    const pipelineId = currentConfig?.pipelineConfig?.pipelineId

    if (!pipelineId) {
      toast.error("Booking configuration is not ready")
      return
    }

    const { data } = await checkRoomAvailability({
      variables: {
        pipelineId,
        ids: [room._id],
        startDate: date.from,
        endDate: date.to,
      },
    })
    const isRoomAvailable = data?.cpPmsCheckRooms?.some(
      (availableRoom: IProduct) => availableRoom._id === room._id
    )

    if (!isRoomAvailable) {
      toast.error("This room is already reserved for the selected date")
      return
    }

    HandleSelectRoom()

    if (selectedRooms.length + 1 >= roomCount) {
      router.push("/booking/your-details")
      return
    }

    router.push("/booking")
  }

  return (
    <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
      <div className='mb-6'>
        <div className='mb-1'>
          <span className='text-4xl font-bold text-gray-900'>
            {room.unitPrice ? room.unitPrice.toLocaleString() : ""}
          </span>
          <span className='text-2xl font-bold text-gray-700'>
            {room.unitPrice ? "₮" : ""}
          </span>
        </div>
        <div className='text-gray-600 font-semibold text-lg'>
          Нэг хоногийн үнэ
        </div>
      </div>

      <div className='space-y-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
          <BookingField title='Check-in'>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date?.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date?.from ? format(date.from, "PPP") : <span>Pick date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='min-w-[300px] w-fit p-5' align='start'>
                <DateForm />
              </PopoverContent>
            </Popover>
          </BookingField>

          <BookingField title='Check-out'>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date?.to && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date?.to ? format(date.to, "PPP") : <span>Pick date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='min-w-[300px] w-fit p-5' align='start'>
                <DateForm />
              </PopoverContent>
            </Popover>
          </BookingField>
        </div>

        <BookingField title='Room'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='w-full justify-start text-left font-normal'
              >
                <Bed className='mr-2 h-4 w-4' />
                {roomCount} {roomCount > 1 ? "rooms" : "room"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='min-w-[300px] p-5' align='start'>
              <RoomForm />
            </PopoverContent>
          </Popover>
        </BookingField>

        <BookingField title='Guest'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='w-full justify-start text-left font-normal'
              >
                <Users className='mr-2 h-4 w-4' />
                {adults} {adults > 1 ? "Adults" : "Adult"}
                {!!children && `, ${children} ${children > 1 ? "Children" : "Child"}`}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='min-w-[300px] p-5' align='start'>
              <GuestForm />
            </PopoverContent>
          </Popover>
        </BookingField>

        <Button
          className='w-full font-bold'
          size='lg'
          onClick={handleReserveRoom}
          disabled={checkingAvailability}
        >
          {checkingAvailability ? "Checking..." : "Reserve this room"}
          <ArrowRight className='ml-2 h-5 w-5' />
        </Button>
      </div>
    </div>
  )
}

export default function GrandSuiteListing() {
  const params = useParams()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel()
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  const { products, loading }: { products: IProduct[]; loading: boolean } =
    useGetProducts({
      variables: {
        categoryIds: [ACCOMMODATION_CATEGORY_ID],
        perPage: 1000,
      },
    })
  const post = products.find((product) => product._id === params.slug)
  const images = [post?.attachment, ...(post?.attachmentMore || [])].filter(
    Boolean
  )

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on("select", onSelect).on("reInit", onSelect)
  }, [emblaMainApi, onSelect])

  if (loading || !post)
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Loading />
      </div>
    )

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50'>
      <div className='relative overflow-hidden bg-primary'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative container mx-auto px-4 py-20 text-center'>
          <div className='max-w-4xl mx-auto space-y-6'>
            <h1 className='text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight'>
              {post.name}
            </h1>
            <p className='text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed'>
              {getDescriptionHtml(post.description).replace(/<[^>]*>/g, "")}
            </p>
            <div className='flex items-center justify-center space-x-4'>
              <div className='w-16 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent'></div>
              <div className='w-2 h-2 bg-amber-500 rounded-full'></div>
              <div className='w-16 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent'></div>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-16 space-y-16'>
        {/* ✅ Desktop grid (5 col × 2 row, 10 зураг хүртэл) */}
        {images.length > 0 && (
          <div className='hidden lg:block'>
            <div className='grid grid-cols-5 gap-3 lg:gap-6'>
              {images
                .slice(0, 10) // зөвхөн эхний 10 зураг авах
                .map((attachment, idx) => {
                  return (
                    <Dialog key={idx}>
                      <DialogTrigger className='w-full'>
                        <div className='relative w-full aspect-video overflow-hidden rounded-xl shadow-md'>
                          <Image
                            src={attachment?.url}
                            alt={`Suite image ${idx + 1}`}
                            width={300}
                            height={200}
                            className='w-full h-full object-cover'
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <Image
                          src={attachment?.url}
                          alt={`Suite image ${idx + 1}`}
                          width={800}
                          height={500}
                          className='rounded-2xl shadow-md w-full aspect-video object-contain'
                        />
                      </DialogContent>
                    </Dialog>
                  )
                })}
            </div>
          </div>
        )}

        {/* ✅ Mobile carousel */}
        {images.length > 0 && (
          <Carousel
            className='lg:hidden'
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              {images
                .slice(0, 10) // mobile дээр ч зөвхөн 10 зураг
                .map((attachment, idx) => (
                  <CarouselItem key={idx}>
                    <Dialog>
                      <DialogTrigger>
                        <Image
                          src={attachment?.url}
                          alt={`Suite thumbnail ${idx + 1}`}
                          width={300}
                          height={200}
                          className='rounded-xl shadow-md w-full aspect-video object-cover'
                        />
                      </DialogTrigger>
                      <DialogContent>
                        <Image
                          src={attachment?.url}
                          alt={`Suite thumbnail ${idx + 1}`}
                          width={800}
                          height={500}
                          className='rounded-2xl shadow-md w-full aspect-video object-contain'
                        />
                      </DialogContent>
                    </Dialog>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        )}

        <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
          <div className='p-8'>
            <div className='grid lg:grid-cols-3 gap-8'>
              <div className='lg:col-span-1'>
                <div className='lg:sticky lg:top-28'>
                  <RoomDetailBookingPanel room={post} />
                </div>
              </div>

              <div className='lg:col-span-2'>
                <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200 h-full'>
                  <div className='flex items-center gap-2 mb-4'>
                    <div className='w-8 h-8 rounded-full flex items-center justify-center'>
                      <span className='text-white text-sm'>🏨</span>
                    </div>
                    <h3 className='text-xl font-bold text-gray-900'>
                      {post._id === "S2M8Q14Ihj_vXyJne5a5H"
                        ? "Рестораны мэдээлэл"
                        : "Өрөөний мэдээлэл"}
                    </h3>
                  </div>
                  <div
                    className='text-gray-700 leading-relaxed'
                    dangerouslySetInnerHTML={{
                      __html: getDescriptionHtml(post?.description),
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type FeatureProps = {
  title: string
}

function Feature({ title }: FeatureProps) {
  return (
    <div className='group bg-white rounded-xl p-4 shadow-md border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer'>
      <div className='flex items-center gap-3'>
        <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300'>
          <span className='text-white text-xs'>✓</span>
        </div>
        <span className='font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-300'>
          {title}
        </span>
      </div>
    </div>
  )
}
