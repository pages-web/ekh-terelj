"use client"

import React from "react"
import { useCmsPosts } from "@/sdk/queries/cms"
import { Loading } from "@/components/ui/loading"

const Tourist = () => {
  const { posts, loading } = useCmsPosts({
    tagIds: ["xRGMNDkODeYklziGG1N1l"],
    perPage: 1000,
  })

  const post = posts[0]

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <Loading />
      </div>
    )
  }

  if (!post) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <p className='text-gray-500'>No content available</p>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <article className='prose prose-lg max-w-none'>
        <div
          className='text-gray-800 leading-relaxed space-y-6'
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </article>
    </div>
  )
}

export default Tourist
