"use client"

import Heading from "../heading/heading"
import Image from "../ui/image"
import { useCmsPosts } from "@/sdk/queries/cms"

export default function Location() {
  const { posts } = useCmsPosts({
    tagIds: ["T8h18F9ksswcZBxU-LGeI"],
  })

  const post = posts[0]

  return (
    <div className='space-y-12 py-16'>
      <div className='flex flex-col items-center text-center space-y-6'>
        <Heading title={post?.title} desc={post?.excerpt} />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10'>
        <div className='h-[400px] w-full lg:col-span-2 rounded-xl overflow-hidden shadow-lg border'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3339.9675003409516!2d107.40107967701512!3d47.848267271213004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d94255801871fe5%3A0xb6d2b3a83c270feb!2sEkh%20terelj%20resort!5e1!3m2!1smn!2smn!4v1750836727789!5m2!1smn!2smn'
            width='100%'
            height='100%'
            loading='lazy'
            className='border-0'
          ></iframe>
        </div>

        <div className='space-y-6'>
          <div className='h-[400px] w-full rounded-xl overflow-hidden shadow-lg border'>
            <Image
              src='/images/location.png'
              alt='location'
              width={500}
              height={500}
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
