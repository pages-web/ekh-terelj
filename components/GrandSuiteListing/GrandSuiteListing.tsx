"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Wifi } from "lucide-react"
import { useParams } from "next/navigation"
import { Loading } from "../ui/loading"
import Image from "../ui/image"
import { useCmsPostDetail } from "@/sdk/queries/cms"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import useRooms, { useRoomsAndCategories } from "@/sdk/queries/rooms"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"

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

  // const { rooms } = useRooms();
  // const { post } = useCmsPostDetail(params.slug as string);
  // const room = rooms.find(
  //   (room) => room._id === post?.customFieldsMap?.roomGroup?.main_product
  // );
  const { roomsAndCategories } = useRoomsAndCategories()
  const category =
    roomsAndCategories?.find((category) => category._id === params.slug) || null

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on("select", onSelect).on("reInit", onSelect)
  }, [emblaMainApi, onSelect])

  if (!category)
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Loading />
      </div>
    )

  return (
    <div className='min-h-screen container p-6 space-y-6'>
      <h2 className='text-[30px] font-semibold'>{category.name}</h2>

      <div className='grid-cols-2 gap-3 lg:gap-6 lg:grid hidden'>
        {category.rooms?.[0]?.attachment && (
          <Dialog>
            <DialogTrigger>
              <Image
                src={category.rooms?.[0].attachment?.url}
                alt={category.rooms?.[0].attachment.name}
                width={800}
                height={500}
                className='rounded-2xl shadow-md w-full aspect-video'
              />
            </DialogTrigger>
            <DialogContent>
              <Image
                src={category.rooms?.[0].attachment?.url}
                alt={category.rooms?.[0].attachment.name}
                width={800}
                height={500}
                className='rounded-2xl shadow-md w-full aspect-video'
              />
            </DialogContent>
          </Dialog>
        )}

        <div className='grid grid-cols-2 gap-3 lg:gap-6'>
          {category.rooms?.[0]?.attachmentMore &&
            category.rooms?.[0].attachmentMore
              .slice(0, 4)
              .map((attachment, idx) => (
                <Dialog key={idx}>
                  <DialogTrigger>
                    <Image
                      key={idx}
                      src={attachment.url}
                      alt={category.name}
                      width={300}
                      height={200}
                      className='rounded-xl shadow w-full h-full aspect-video'
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <Image
                      key={idx}
                      src={attachment.url}
                      alt={category.name}
                      width={300}
                      height={200}
                      className='rounded-xl shadow w-full h-full aspect-video'
                    />
                  </DialogContent>
                </Dialog>
              ))}
        </div>
      </div>

      {(category.rooms?.[0]?.attachment ||
        category.rooms?.[0]?.attachmentMore) && (
        <Carousel
          className='lg:hidden'
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {[
              category.rooms?.[0].attachment,
              ...(category.rooms?.[0].attachmentMore ?? []),
            ].map((attachment, idx) => (
              <CarouselItem key={idx}>
                <Dialog>
                  <DialogTrigger>
                    <Image
                      src={attachment?.url}
                      alt={`Suite thumbnail ${idx + 1}`}
                      width={300}
                      height={200}
                      className='rounded-xl shadow w-full h-full aspect-video'
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <Image
                      src={attachment?.url}
                      alt={`Suite thumbnail ${idx + 1}`}
                      width={300}
                      height={200}
                      className='rounded-xl shadow w-full h-full aspect-video'
                    />
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}

      <div className='space-y-6'>
        <p className='font-bold text-xl'>
          {category.rooms?.[0]?.unitPrice.toLocaleString()}₮
        </p>

        <div
          className='text-sm text-gray-500'
          dangerouslySetInnerHTML={{
            __html: category.rooms?.[0]?.description || "",
          }}
        ></div>

        {/* <div className="space-y-3">
          <h2 className="text-displaysm">Facilities & Services</h2>
          <div className="w-fit pl-5">
            {post.customFieldsMap.roomGroup.main_facilities
              .split(",")
              ?.map((facility: string, idx: number) => (
                <Feature key={idx} title={facility} />
              ))}
          </div>
        </div> */}
      </div>
    </div>
  )
}

type FeatureProps = {
  title: string
}

function Feature({ title }: FeatureProps) {
  return (
    <div className='flex items-start gap-3 text-textmd'>
      {/* <span className="text-xl">{icon}</span> */}
      <div>
        <p className='font-medium'>{title}</p>
      </div>
    </div>
  )
}
