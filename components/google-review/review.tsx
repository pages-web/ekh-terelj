"use client"

import React, { useEffect, useState } from "react"
import { ChevronDown, ChevronUp, ExternalLink, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const stars = Array.from({ length: 5 }, (_, i) => (
  <Star key={i} className='h-4 w-4 fill-amber-400 text-amber-400' />
))

const googleReviewsUrl =
  "https://www.google.com/maps/search/?api=1&query=Ekh%20Terelj%20Resort%2047.848267%2C107.401080"

const Review = () => {
  const [showAllReviews, setShowAllReviews] = useState(false)

  useEffect(() => {
    const existingScript = document.getElementById("sociablekit-google-reviews")
    if (existingScript) return

    const script = document.createElement("script")
    script.id = "sociablekit-google-reviews"
    script.src = "https://widgets.sociablekit.com/google-reviews/widget.js"
    script.async = true
    script.defer = true
    document.body.appendChild(script)
  }, [])

  return (
    <section id='reviews' className='w-full bg-white py-16 lg:py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-8 max-w-3xl text-center lg:mb-10'>
          <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800'>
            <span className='flex items-center gap-0.5'>{stars}</span>
            <span>Google reviews</span>
          </div>

          <h2 className='text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl'>
            Эх Тэрэлжид амарсан зочдын сэтгэлд хоногшсон дурсамж
            <span className='block'>
              үнэн бодит туршлагуудтай танилцана уу.
            </span>
          </h2>
        </div>

        <div className='mx-auto max-w-6xl rounded-2xl border border-gray-100 bg-gray-50/70 p-3 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6'>
          <div
            className={`relative rounded-xl bg-white p-2 transition-all duration-500 sm:p-4 ${
              showAllReviews
                ? "max-h-none overflow-visible"
                : "max-h-[520px] overflow-hidden"
            }`}
          >
            <div className='sk-ww-google-reviews' data-embed-id='25571033' />

            {!showAllReviews && (
              <div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 rounded-b-xl bg-gradient-to-t from-white via-white/95 to-transparent' />
            )}
          </div>

          <div className='flex flex-col items-center justify-center gap-3 border-t border-gray-100 px-2 pb-1 pt-5 sm:flex-row'>
            <Button
              type='button'
              onClick={() => setShowAllReviews((current) => !current)}
              className='h-11 rounded-full bg-gray-900 px-6 text-white hover:bg-gray-800'
            >
              {showAllReviews ? (
                <>
                  <ChevronUp className='mr-2 h-4 w-4' />
                  Цөөнөөр харах
                </>
              ) : (
                <>
                  <ChevronDown className='mr-2 h-4 w-4' />
                  Бүх сэтгэгдэл харах
                </>
              )}
            </Button>

            <Button
              asChild
              variant='outline'
              className='h-11 rounded-full border-gray-200 px-6 text-gray-800 hover:bg-white'
            >
              <a
                href={googleReviewsUrl}
                target='_blank'
                rel='noreferrer'
                aria-label='Google дээрх бүх сэтгэгдлийг нээх'
              >
                Google дээр харах
                <ExternalLink className='ml-2 h-4 w-4' />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.sk-ww-google-reviews) {
          width: 100%;
        }
      `}</style>
    </section>
  )
}

export default Review
