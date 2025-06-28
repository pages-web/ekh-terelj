"use client"

import Location from "@/components/location/location"
import Review from "@/components/google-review/review"
import Accommodation from "@/components/home-Accommodation/accommodation"
import HomeBooking from "@/components/home-booking/home-booking"
import FAQ from "@/components/faq/faq"
import CustomerFeedback from "@/components/customer-feedback/customer-feedback"

export default function HomePage() {
  return (
    <div className='flex flex-col gap-8 lg:gap-28 container'>
      <HomeBooking />
      <Accommodation />
      <Review />
      <CustomerFeedback />
      <FAQ />
      <Location />
    </div>
  )
}
