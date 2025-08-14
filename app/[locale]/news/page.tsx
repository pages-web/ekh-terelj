"use client"

import React from "react"
import { useCmsPosts } from "@/sdk/queries/cms"
import { Loading } from "@/components/ui/loading"
import Image from "@/components/ui/image"
import { Link } from "@/i18n/routing"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Heading from "@/components/heading/heading"
import { CalendarIcon, UserIcon } from "lucide-react"

const News = () => {
  const { posts, loading } = useCmsPosts({
    tagIds: ["JzuOHkUDjmbF09GXfd6LD"],
    perPage: 1000,
  })

  const { posts: postTitle } = useCmsPosts({
    tagIds: ["al_xtO3Adddd1b_XMt1Vo"],
    perPage: 1000,
  })

  const Info = postTitle[0]

  const displayPosts = posts

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <Loading />
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='text-center mb-12'>
        <div className='inline-block bg-gray-100 text-gray-800 text-xs px-4 py-1 rounded-full mb-4'>
          Мэдээ мэдээлэл
        </div>
        <Heading
          title={Info?.title}
          desc={Info?.excerpt}
          className='max-w-4xl mx-auto'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
        {displayPosts.map((post) => (
          <Link key={post._id} href={`/news/${post._id}`}>
            <Card className='group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-md bg-white rounded-2xl'>
              <div className='relative h-72 overflow-hidden'>
                <Image
                  src={post.thumbnail?.url || "/images/gallery/terelj1.jpg"}
                  alt={post.title}
                  width={500}
                  height={300}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out'
                />
                <div className='absolute inset-0 bg-primary via-transparent to-transparent' />
                <div className='absolute top-4 left-4'>
                  <Badge className='bg-white/90 text-gray-800 backdrop-blur-sm border-0 text-xs font-medium px-3 py-1'>
                    Мэдээ
                  </Badge>
                </div>
                <div className='absolute bottom-4 left-4 right-4'>
                  <div className='flex items-center text-white text-xs mb-2'>
                    <CalendarIcon className='w-3 h-3 mr-1' />
                    {formatDate(
                      (post as any).createdAt || new Date().toISOString()
                    )}
                  </div>
                </div>
              </div>

              <CardContent className='p-6 space-y-4'>
                <h3 className='text-xl font-bold mb-3 group-hover:text-[#134053] transition-colors duration-300 line-clamp-2 leading-tight'>
                  {post.title}
                </h3>

                <p className='text-gray-600 text-sm line-clamp-3 leading-relaxed'>
                  {post.excerpt.slice(0, 100)}...
                </p>

                <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                  <div className='flex items-center text-gray-500 text-xs'>
                    {(post.author?.details?.avatar && (
                      <Image
                        src={post.author?.details?.avatar}
                        alt={post.author?.details?.fullName}
                        width={20}
                        height={20}
                        className='rounded-full mr-1'
                      />
                    )) || <UserIcon className='w-3 h-3 mr-1' />}
                    {post.author?.details?.fullName}
                  </div>
                  <div className='inline-flex items-center text-[#134053] text-sm font-semibold group-hover:text-[#134053] transition-colors'>
                    Унших
                    <svg
                      className='w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default News
