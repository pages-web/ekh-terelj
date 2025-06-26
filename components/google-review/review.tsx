// components/Review.tsx
"use client"

import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Star, User } from "lucide-react"

// Static reviews data
const staticReviews = [
  {
    id: 1,
    author: "Батбаяр Цэндсүрэн",
    rating: 5,
    date: "2024-01-15",
    text: "Терэлжийн байгалийн дундах энэхүү зочид буудал маш сайхан байсан. Өрөөнүүд нь тухтай, үйлчилгээ нь маш сайн. Амралтын өдрүүдийг өнгөрүүлэхэд тохиромжтой газар.",
    avatar: null,
  },
  {
    id: 2,
    author: "Sarah Johnson",
    rating: 5,
    date: "2024-01-10",
    text: "Amazing hotel in the heart of Terelj National Park! The views are breathtaking and the staff is incredibly friendly. The rooms are clean and comfortable. Highly recommend for anyone visiting Mongolia!",
    avatar: null,
  },
  {
    id: 3,
    author: "Энхбаяр Гантулга",
    rating: 4,
    date: "2024-01-08",
    text: "Терэлжийн байгальд оршдог энэхүү зочид буудал үнэхээр гайхалтай. Уулын үзэгдэл, цэвэр агаар, тайван орчин. Гэр бүлийн амралтад тохиромжтой.",
    avatar: null,
  },
  {
    id: 4,
    author: "Michael Chen",
    rating: 5,
    date: "2024-01-05",
    text: "Exceptional service and stunning location! The hotel offers a perfect blend of comfort and nature. The restaurant serves delicious local cuisine. Will definitely come back!",
    avatar: null,
  },
]

const renderStars = (rating: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${
        i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
      }`}
    />
  ))

const Review = () => {
  useEffect(() => {
    // Google Reviews widget script-ийг ачааллуулна
    const script = document.createElement("script")
    script.src = "https://widgets.sociablekit.com/google-reviews/widget.js"
    script.async = true
    script.defer = true
    document.body.appendChild(script)
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [])

  return (
    <section className='w-full py-16 lg:py-24 review-section'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4'>
            Зочдын сэтгэгдэл
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Манай зочид буудалд амарч байсан зочдын үнэн бодит сэтгэгдлүүд
          </p>
        </div>

        {/* Scrollable container with fixed height */}
        <div className='max-h-[600px] overflow-y-auto scroll-smooth'>
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
            {/* 1-р слайд: Google Reviews widget */}
            <SwiperSlide>
              <div className='h-[450px] overflow-y-auto scroll-smooth border rounded-xl bg-white p-4'>
                <div
                  className='sk-ww-google-reviews'
                  data-embed-id='25571033'
                />
              </div>
            </SwiperSlide>

            {/* Дараагийн слайдууд: Static review-ууд */}
            {staticReviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className='bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 h-[450px] border border-gray-100 hover:border-secondary/20 group overflow-y-auto scroll-smooth'>
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
                        <div className='flex'>{renderStars(review.rating)}</div>
                        <span className='text-xs text-gray-500 font-medium'>
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className='text-sm text-gray-700 leading-relaxed'>
                    {review.text}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx>{`
        .reviews-swiper {
          padding-bottom: 40px;
        }

        .reviews-swiper .swiper-pagination {
          bottom: 0;
        }

        .reviews-swiper .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
        }

        .reviews-swiper .swiper-pagination-bullet-active {
          background: #f59e0b;
        }

        .reviews-swiper .swiper-button-next,
        .reviews-swiper .swiper-button-prev {
          color: #f59e0b;
          background: white;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .reviews-swiper .swiper-button-next:after,
        .reviews-swiper .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }

        /* Custom scrollbar styles */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </section>
  )
}

export default Review
