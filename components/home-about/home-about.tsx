import { Link } from "@/i18n/routing"
import Heading from "../heading/heading"
import HeadingButton from "../heading-button/heading-button"
import { useCmsPosts } from "@/sdk/queries/cms"

export default function AboutSection() {
  const { posts, loading } = useCmsPosts({
    tagIds: ["wVx0BObZxZJ94IaJrhGPe"],
    perPage: 1000,
  })

  const post = posts[0]

  return (
    <section className='flex flex-col items-center text-center'>
      <div className='space-y-6'>
        <Heading title={post?.title} desc={post?.content} />
      </div>
    </section>
  )
}
