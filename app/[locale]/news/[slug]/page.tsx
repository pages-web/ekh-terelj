"use client"

import React from "react"
import { notFound, useParams } from "next/navigation"
import { useCmsPostDetail } from "@/sdk/queries/cms"
import { Loading } from "@/components/ui/loading"
import Image from "@/components/ui/image"
import { Link } from "@/i18n/routing"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CalendarIcon,
  ArrowLeftIcon,
  ShareIcon,
  UserIcon,
  ClockIcon,
} from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumb/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const NewsDetail = () => {
  const params = useParams()
  const slug = params.slug as string

  const { post, loading } = useCmsPostDetail(slug)

  const displayPost = post

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      full: date.toLocaleDateString("mn-MN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      day: date.getDate().toString().padStart(2, "0"),
      month: date.toLocaleDateString("mn-MN", { month: "short" }),
      year: date.getFullYear(),
      time: date.toLocaleTimeString("mn-MN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.replace(/<[^>]*>/g, "").split(" ").length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return readingTime
  }

  const breadcrumbs = [
    { name: "Нүүр", link: "/" },
    { name: "Мэдээ мэдээлэл", link: "/news" },
    { name: displayPost?.title || "Мэдээ", link: `/news/${slug}` },
  ]

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <Loading />
      </div>
    )
  }

  if (!displayPost) {
    notFound()
  }

  const dateInfo = formatDate(displayPost.createdAt || new Date().toISOString())
  const readingTime = getReadingTime(displayPost.content || "")

  return (
    <>
      <div className='max-w-5xl mx-auto px-4 py-8'>
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <div className='relative mb-12'>
          {displayPost.thumbnail?.url && (
            <div className='relative mb-8 rounded-2xl overflow-hidden shadow-2xl'>
              <Image
                src={displayPost.thumbnail.url}
                alt={displayPost.title}
                width={1200}
                height={600}
                className='w-full h-[500px] object-cover'
              />
              <div className='absolute inset-0 bg-primary via-transparent to-transparent' />

              <div className='absolute top-6 left-6'>
                <Card className='bg-white/95 backdrop-blur-sm border-0 shadow-lg'>
                  <CardContent className='p-4'>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-gray-900'>
                        {dateInfo.day}
                      </div>
                      <div className='text-sm text-gray-600 uppercase tracking-wide'>
                        {dateInfo.month}
                      </div>
                      <div className='text-sm text-gray-500'>
                        {dateInfo.year}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          <header className='mb-8'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
              {displayPost.title}
            </h1>

            {displayPost.excerpt && (
              <p className='text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl'>
                {displayPost.excerpt}
              </p>
            )}
          </header>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          <div className='lg:col-span-3'>
            <Card className='mb-8'>
              <CardContent className='p-8'>
                <article className='prose prose-xl max-w-none'>
                  <div
                    className='text-gray-800 leading-relaxed space-y-8 [&>p]:mb-6 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h3]:text-xl [&>h3]:font-medium [&>h3]:mb-2'
                    dangerouslySetInnerHTML={{
                      __html: displayPost.content || "",
                    }}
                  />
                </article>
              </CardContent>
            </Card>

            {displayPost.images && displayPost.images.length > 1 && (
              <Card className='mb-8'>
                <CardContent className='p-8'>
                  <h3 className='text-2xl font-bold mb-6 text-gray-900'>
                    Нэмэлт зургууд
                  </h3>
                  <div className='relative'>
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      spaceBetween={20}
                      slidesPerView={1}
                      pagination={{ clickable: true }}
                      autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                      }}
                      breakpoints={{
                        640: {
                          slidesPerView: 2,
                          spaceBetween: 20,
                        },
                        768: {
                          slidesPerView: 2,
                          spaceBetween: 24,
                        },
                        1024: {
                          slidesPerView: 2,
                          spaceBetween: 30,
                        },
                      }}
                      className='news-images-swiper'
                    >
                      {displayPost.images
                        .slice(1)
                        .map((image: any, index: number) => (
                          <SwiperSlide key={index}>
                            <div className='rounded-xl overflow-hidden shadow-lg group cursor-pointer'>
                              <Image
                                src={image.url}
                                alt={`${displayPost.title} - зураг ${
                                  index + 2
                                }`}
                                width={400}
                                height={250}
                                className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500'
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className='lg:col-span-1'>
            <div className='sticky top-8 space-y-6'>
              <Card>
                <CardContent className='p-6'>
                  <h4 className='font-semibold mb-4'>Мэдээллийн дэлгэрэнгүй</h4>
                  <div className='space-y-3'>
                    <div className='flex items-center gap-3 text-sm text-gray-600'>
                      <CalendarIcon className='w-4 h-4' />
                      <span>{dateInfo.full}</span>
                    </div>
                    <div className='flex items-center gap-3 text-sm text-gray-600'>
                      <ClockIcon className='w-4 h-4' />
                      <span>{dateInfo.time}</span>
                    </div>
                    <div className='flex items-center gap-3 text-sm text-gray-600'>
                      <UserIcon className='w-4 h-4' />
                      <span>Унших хугацаа: {readingTime} минут</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className='p-6'>
                  <h4 className='font-semibold mb-4'>Хуваалцах</h4>
                  <Button
                    variant='outline'
                    size='sm'
                    className='w-full flex items-center gap-2 justify-center'
                  >
                    <ShareIcon className='w-4 h-4' />
                    Хуваалцах
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Separator className='my-12' />
        <div className='flex items-center justify-between flex-wrap gap-4'>
          <Button variant='outline' asChild>
            <Link href='/news' className='flex items-center gap-2'>
              <ArrowLeftIcon className='w-4 h-4' />
              Буцах
            </Link>
          </Button>

          <Button asChild>
            <Link href='/news'>Бусад мэдээ үзэх</Link>
          </Button>
        </div>
      </div>
    </>
  )
}

export default NewsDetail
