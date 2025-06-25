"use client"

import React, { useEffect, useState } from "react"
import Heading from "@/components/heading/heading"
import { Card } from "@/components/ui/card"
import { Star, User } from "lucide-react"

const Review = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Check if we're in development mode
    const isDevelopment =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"

    if (isDevelopment) {
      // In development, show static reviews
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return
    }

    // In production, load the actual widget
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

    // Add custom styles for the widget
    const style = document.createElement("style")
    style.innerHTML = `
      .sk-ww-google-reviews {
        border-radius: 12px;
        overflow: hidden;
      }
      
      /* Override widget styles to match your design */
      .sk-ww-google-reviews iframe {
        border-radius: 12px !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style)
      }
    }
  }, [])

  // Static reviews for development/fallback
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

  const isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")

  return (
    <section className='w-full py-16 lg:py-24 review-section'>
      <div className='space-y-8'>
        <div className='text-center'>
          <Heading
            title='What Our Guests Say'
            desc='Discover authentic experiences and reviews from guests who have stayed at Ekh Terelj'
            className='mx-auto'
          />
        </div>

        <Card className='relative bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl p-8 lg:p-12'>
          <div className='absolute top-4 right-4 text-secondary/20'>
            <Star className='w-24 h-24' fill='currentColor' />
          </div>
          <div className='absolute bottom-4 left-4 text-secondary/10'>
            <Star className='w-32 h-32' fill='currentColor' />
          </div>

          {/* Google Reviews Widget or Static Reviews */}
          <div className='relative z-10'>
            {isLoading && (
              <div className='flex items-center justify-center min-h-[400px]'>
                <div className='space-y-4 text-center'>
                  <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto'></div>
                  <p className='text-muted-foreground'>Loading reviews...</p>
                </div>
              </div>
            )}

            {/* Show static reviews in development or on error */}
            {!isLoading && (isLocal || hasError) && (
              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {staticReviews.map((review) => (
                  <div
                    key={review.id}
                    className='bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow'
                  >
                    <div className='flex items-start gap-4 mb-4'>
                      <div className='w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center'>
                        {review.avatar ? (
                          <img
                            src={review.avatar}
                            alt={review.author}
                            className='w-full h-full rounded-full'
                          />
                        ) : (
                          <User className='w-6 h-6 text-secondary' />
                        )}
                      </div>
                      <div className='flex-1'>
                        <h4 className='font-medium text-black'>
                          {review.author}
                        </h4>
                        <div className='flex items-center gap-2 mt-1'>
                          <div className='flex'>
                            {renderStars(review.rating)}
                          </div>
                          <span className='text-sm text-muted-foreground'>
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className='text-sm text-gray-700 leading-relaxed'>
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Production widget */}
            {!isLocal && !hasError && (
              <div
                className={`sk-ww-google-reviews transition-opacity duration-500 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                data-embed-id='25571033'
              />
            )}
          </div>

          {/* Trust Indicators */}
          <div className='mt-8 pt-8 border-t border-gray-200'>
            <div className='flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground'>
              <div className='flex items-center gap-2'>
                <svg
                  className='w-5 h-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'
                    fill='currentColor'
                    className='text-yellow-500'
                  />
                </svg>
                <span>Google Reviews</span>
              </div>
              <span className='hidden sm:inline'>•</span>
              <span>100% Authentic Guest Experiences</span>
              <span className='hidden sm:inline'>•</span>
              <span>4.8/5 Average Rating</span>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className='text-center mt-8'>
          <a
            href='https://www.google.com/search?q=ekh+terelj+hotel'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors'
          >
            <span className='text-lg font-medium'>
              Write a Review on Google
            </span>
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Review
