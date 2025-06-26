// Review.tsx

"use client"

import React, { useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Star, User } from "lucide-react"

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
      {/* container классыг хасаж, w-full max-w-none нэмнэ */}
      <div className='w-full max-w-none px-0'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4'>
            Зочдын сэтгэгдэл
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Манай зочид буудалд амарч байсан зочдын үнэн бодит сэтгэгдлүүд
          </p>
        </div>

        {/* Swiper wrapper-д w-full max-w-none нэмнэ */}
        <div className='w-full max-w-none max-h-[600px] overflow-y-auto scroll-smooth'>
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
            className='reviews-swiper w-full max-w-none'
          >
            <SwiperSlide>
              <div className='h-[450px] overflow-y-auto scroll-smooth border rounded-xl bg-white p-4'>
                <div
                  className='sk-ww-google-reviews'
                  data-embed-id='25571033'
                />
              </div>
            </SwiperSlide>
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
