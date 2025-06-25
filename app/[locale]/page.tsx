"use client"

import Location from "@/components/location/location"
import Review from "@/components/google-review/review"
import Accommodation from "@/components/home-Accommodation/accommodation"
import HomeBooking from "@/components/home-booking/home-booking"

export default function HomePage() {
  return (
    <div className='flex flex-col gap-8 lg:gap-28 container'>
      <HomeBooking />
      {/* <AboutSection /> */}
      <Accommodation />
      {/* <HomeRestaurant /> */}
      {/* <Gallery /> */}
      <Review />
      <Location />
      {/* <Trend />
      <FeatureGrid /> */}
    </div>
  )
}
