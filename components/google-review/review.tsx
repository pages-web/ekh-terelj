"use client"

import React, { useEffect, useState } from "react"
import Heading from "@/components/heading/heading"
import { Card } from "@/components/ui/card"
import { Star, User } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const Review = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")

  useEffect(() => {
    if (isLocal) {
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return
    }

    const script = document.createElement("script")
    script.src = "https://widgets.sociablekit.com/google-reviews/widget.js"
    script.async = true
    script.defer = true

    script.onload = () => {
      setIsLoading(false)
    }

    script.onerror = () => {
      setHasError(true)
      setIsLoading(false)
    }

    document.body.appendChild(script)

    const style = document.createElement("style")
    style.innerHTML = `
      .sk-ww-google-reviews {
        border-radius: 12px;
        overflow: hidden;
        max-height: 500px;
      }
      
      /* Override widget styles to match your design */
      .sk-ww-google-reviews iframe {
        border-radius: 12px !important;
        max-height: 500px !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style)
      }
    }
  }, [isLocal])

  const staticReviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      rating: 5,
      date: "2 weeks ago",
      text: "Absolutely stunning hotel! The location is perfect, surrounded by beautiful nature. The staff was incredibly helpful and friendly. The rooms are spacious and clean. Highly recommend!",
      avatar: null,
    },
    {
      id: 2,
      author: "David Chen",
      rating: 5,
      date: "1 month ago",
      text: "Best hotel experience in Mongolia! The traditional Mongolian architecture combined with modern amenities is perfect. The restaurant serves amazing local and international cuisine.",
      avatar: null,
    },
    {
      id: 3,
      author: "Emma Wilson",
      rating: 5,
      date: "2 months ago",
      text: "The views from the hotel are breathtaking! We enjoyed every moment of our stay. The spa services were excellent and the outdoor activities organized by the hotel were unforgettable.",
      avatar: null,
    },
    {
      id: 4,
      author: "Батбаяр",
      rating: 5,
      date: "3 долоо хоногийн өмнө",
      text: "Гайхалтай сайхан зочид буудал! Монголын уламжлалт соёлыг төлөөлсөн архитектур маш сонирхолтой байлаа. Ажилтнууд маш найрсаг, үйлчилгээ сайн.",
      avatar: null,
    },
    {
      id: 5,
      author: "Хишигбат",
      rating: 5,
      date: "1 сарын өмнө",
      text: "Гэр бүлийнхэнтэйгээ амралт хийхэд маш тохиромжтой газар. Хүүхдүүдэд зориулсан үйл ажиллагаа олон байгаа нь таалагдлаа.",
      avatar: null,
    },
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <section className='w-full py-16 lg:py-24 review-section'>
      <div className='space-y-8'>
        <div className='text-center'>
          <Heading
            title='Зочдын сэтгэгдэл'
            desc='Эх Тэрэлжид амралт хийсэн зочдын жинхэнэ туршлага, сэтгэгдлүүдийг танилцаарай'
            className='mx-auto'
          />
        </div>

        <Card className='relative bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl p-6 lg:p-8'>
          <div className='absolute top-4 right-4 text-secondary/10'>
            <Star className='w-16 h-16 lg:w-20 lg:h-20' fill='currentColor' />
          </div>
          <div className='absolute bottom-4 left-4 text-secondary/5'>
            <Star className='w-20 h-20 lg:w-24 lg:h-24' fill='currentColor' />
          </div>

          <div className='relative z-10'>
            {isLoading && (
              <div className='flex items-center justify-center min-h-[400px]'>
                <div className='space-y-4 text-center'>
                  <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto'></div>
                  <p className='text-muted-foreground'>
                    Сэтгэгдлүүд ачаалж байна...
                  </p>
                </div>
              </div>
            )}

            {!isLoading && (isLocal || hasError) && (
              <div className='w-full pb-12'>
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                    },
                  }}
                  className='reviews-swiper'
                >
                  {staticReviews.map((review) => (
                    <SwiperSlide key={review.id}>
                      <div className='bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 h-full border border-gray-100 hover:border-secondary/20 group'>
                        <div className='flex items-start gap-4 mb-4'>
                          <div className='w-12 h-12 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300'>
                            {review.avatar ? (
                              <img
                                src={review.avatar}
                                alt={review.author}
                                className='w-full h-full rounded-full object-cover'
                              />
                            ) : (
                              <User className='w-6 h-6 text-secondary' />
                            )}
                          </div>
                          <div className='flex-1 min-w-0'>
                            <h4 className='font-semibold text-gray-900 truncate text-base'>
                              {review.author}
                            </h4>
                            <div className='flex items-center gap-2 mt-1'>
                              <div className='flex'>
                                {renderStars(review.rating)}
                              </div>
                              <span className='text-xs text-gray-500 font-medium'>
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className='text-sm text-gray-700 leading-relaxed line-clamp-4'>
                          {review.text}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {!isLocal && !hasError && (
              <div
                className={`sk-ww-google-reviews transition-opacity duration-500 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                data-embed-id='25571033'
                style={{ maxHeight: "500px", overflow: "hidden" }}
              />
            )}
          </div>
        </Card>
      </div>

      <style jsx global>{`
        .reviews-swiper {
          padding-bottom: 50px !important;
        }

        .reviews-swiper .swiper-pagination {
          bottom: 0 !important;
          left: 50% !important;
          transform: translateX(-50%);
          width: auto !important;
          display: flex !important;
          justify-content: center !important;
          gap: 8px !important;
        }

        .reviews-swiper .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          background-color: #cbd5e1 !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
          border-radius: 50% !important;
        }

        .reviews-swiper .swiper-pagination-bullet-active {
          background-color: #113f52 !important;
          width: 24px !important;
          border-radius: 12px !important;
        }

        .reviews-swiper .swiper-button-prev,
        .reviews-swiper .swiper-button-next {
          width: 44px !important;
          height: 44px !important;
          background: rgba(255, 255, 255, 0.95) !important;
          border: 2px solid #e2e8f0 !important;
          border-radius: 50% !important;
          color: #113f52 !important;
          box-shadow: 0 8px 25px rgba(17, 63, 82, 0.15) !important;
          transition: all 0.3s ease !important;
          top: 50% !important;
          margin-top: -22px !important;
          z-index: 10 !important;
          backdrop-filter: blur(10px) !important;
        }

        .reviews-swiper .swiper-button-prev:hover,
        .reviews-swiper .swiper-button-next:hover {
          background: #113f52 !important;
          color: white !important;
          border-color: #113f52 !important;
          transform: scale(1.15) !important;
          box-shadow: 0 12px 35px rgba(17, 63, 82, 0.3) !important;
        }

        .reviews-swiper .swiper-button-prev {
          left: 10px !important;
        }

        .reviews-swiper .swiper-button-next {
          right: 10px !important;
        }

        .reviews-swiper .swiper-button-prev:after,
        .reviews-swiper .swiper-button-next:after {
          font-size: 18px !important;
          font-weight: 900 !important;
          line-height: 1 !important;
        }

        .reviews-swiper .swiper-button-disabled {
          opacity: 0.3 !important;
          cursor: not-allowed !important;
        }

        .reviews-swiper .swiper-slide {
          height: auto !important;
          display: flex !important;
        }

        .reviews-swiper .swiper-slide > div {
          width: 100% !important;
        }

        @media (max-width: 640px) {
          .reviews-swiper .swiper-button-prev,
          .reviews-swiper .swiper-button-next {
            display: none !important;
          }

          .reviews-swiper {
            padding-bottom: 40px !important;
          }
        }

        /* Line clamp utility */
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

export default Review
