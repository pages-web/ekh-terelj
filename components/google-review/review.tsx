"use client"

import React, { useEffect, useState, useRef } from "react"
import Heading from "@/components/heading/heading"
import { Card } from "@/components/ui/card"
import { Star, User } from "lucide-react"

const Review = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  const isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")

  // Auto-scroll functionality
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let animationId: number
    let scrollDirection = 1 // 1 for right, -1 for left
    const scrollSpeed = 0.5 // pixels per frame

    const autoScroll = () => {
      if (container && !isPaused) {
        const maxScroll = container.scrollWidth - container.clientWidth

        if (container.scrollLeft >= maxScroll && scrollDirection === 1) {
          scrollDirection = -1
        } else if (container.scrollLeft <= 0 && scrollDirection === -1) {
          scrollDirection = 1
        }

        container.scrollLeft += scrollDirection * scrollSpeed
      }
      animationId = requestAnimationFrame(autoScroll)
    }

    // Start auto-scroll after loading
    if (!isLoading && (isLocal || hasError)) {
      const startDelay = setTimeout(() => {
        animationId = requestAnimationFrame(autoScroll)
      }, 2000) // Wait 2 seconds before starting auto-scroll

      return () => {
        clearTimeout(startDelay)
        if (animationId) {
          cancelAnimationFrame(animationId)
        }
      }
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isLoading, isLocal, hasError, isPaused])

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
              <div className='w-full pb-8'>
                <div
                  ref={scrollContainerRef}
                  className='flex gap-6 overflow-x-auto h-80 scrollbar-hide scroll-smooth review-container'
                  style={{
                    scrollBehavior: "smooth",
                  }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {staticReviews.map((review) => (
                    <div
                      key={review.id}
                      className='bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-secondary/20 group flex-shrink-0 w-80'
                    >
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
                  ))}
                </div>
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
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        /* Line clamp utility */
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Pause auto-scroll on hover */
        .review-container:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default Review
