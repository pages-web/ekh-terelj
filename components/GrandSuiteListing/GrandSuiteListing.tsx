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

  const { rooms } = useRooms()

  const { post } = useCmsPostDetail(params.slug as string)

  const room = rooms.find(
    (room) => room._id === post?.customFieldsMap?.room_post?.main1_product
  )

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on("select", onSelect).on("reInit", onSelect)
  }, [emblaMainApi, onSelect])

  if (!post)
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Loading />
      </div>
    )

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50'>
      <div className='relative overflow-hidden bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative container mx-auto px-4 py-20 text-center'>
          <div className='max-w-4xl mx-auto space-y-6'>
            <h1 className='text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight'>
              {post.title}
            </h1>
            <p className='text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed'>
              {post.excerpt || ""}
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
        <div className='grid-cols-2 gap-3 lg:gap-6 lg:grid hidden'>
          {post?.thumbnail && (
            <Dialog>
              <DialogTrigger>
                <Image
                  src={post?.thumbnail?.url}
                  alt={post?.thumbnail.name}
                  width={800}
                  height={500}
                  className='rounded-2xl shadow-md w-full aspect-video'
                />
              </DialogTrigger>
              <DialogContent>
                <Image
                  src={post?.thumbnail?.url}
                  alt={post?.thumbnail.name}
                  width={800}
                  height={500}
                  className='rounded-2xl shadow-md w-full aspect-video'
                />
              </DialogContent>
            </Dialog>
          )}

          <div className='grid grid-cols-2 gap-3 lg:gap-6'>
            {post?.images &&
              post.images.slice(0, 4).map((attachment, idx) => (
                <Dialog key={idx}>
                  <DialogTrigger>
                    <Image
                      key={idx}
                      src={attachment.url}
                      alt={post.title}
                      width={300}
                      height={200}
                      className='rounded-xl shadow w-full h-full aspect-video'
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <Image
                      key={idx}
                      src={attachment.url}
                      alt={post.title}
                      width={300}
                      height={200}
                      className='rounded-xl shadow w-full h-full aspect-video'
                    />
                  </DialogContent>
                </Dialog>
              ))}
          </div>
        </div>

        {post?.images && (
          <Carousel
            className='lg:hidden'
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              {[post?.thumbnail, ...(post?.images ?? [])].map(
                (attachment, idx) => (
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
                )
              )}
            </CarouselContent>
          </Carousel>
        )}

        <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
          <div className='p-8'>
            <div className='grid lg:grid-cols-3 gap-8'>
              <div className='lg:col-span-1'>
                <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-200'>
                  <div className='text-center'>
                    <div className='mb-2'>
                      <span className='text-4xl font-bold text-gray-900'>
                        {post.customFieldsMap?.room_post?.price}
                      </span>
                      <span className='text-2xl font-bold text-gray-700'>
                        {post.customFieldsMap?.room_post?.price && "₮"}
                      </span>
                    </div>
                    <div className='text-gray-600 font-semibold mb-4 text-lg'>
                      {post.customFieldsMap?.room_post?.hour_rate}
                    </div>
                    <div className='text-xs text-gray-600 space-y-1'>
                      {post.customFieldsMap?.room_post?.facilities1
                        ?.split(",")
                        ?.filter(
                          (facility: string) => facility.trim().length > 0
                        )
                        ?.map((facility: string, idx: number) => (
                          <div
                            key={idx}
                            className='flex items-center justify-center gap-2'
                          >
                            <span>✓</span>
                            <span>{facility.trim()}</span>
                          </div>
                        ))}
                    </div>
                  </div>
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
                      __html: post?.content || "",
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
