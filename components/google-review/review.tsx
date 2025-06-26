// components/Review.tsx
"use client"

import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Star, User } from "lucide-react"

const staticReviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    date: "2 weeks ago",
    text: "Absolutely stunning hotel! The location is perfect, surrounded by beautiful nature. The staff was incredibly helpful and friendly. The rooms are spacious and clean. Highly recommend!",
    avatar: null,
  },
  // ... бусад review-ууд
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
          <div
            className='sk-ww-google-reviews'
            data-embed-id='25571033'
            style={{ maxHeight: "500px", overflow: "hidden" }}
          />
        </SwiperSlide>

        {/* Дараагийн слайдууд: Static review-ууд */}
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
                    <div className='flex'>{renderStars(review.rating)}</div>
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
      {/* ...styles хэвээр */}
    </section>
  )
}

export default Review
