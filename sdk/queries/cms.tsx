import { OperationVariables, useQuery } from "@apollo/client"
import { queries } from "../graphql/cms"
import { ICmsPost, ICmsPostTag } from "@/types/cms"

export const useCmsPosts = (variables?: OperationVariables) => {
  const { data, loading } = useQuery(queries.CmsPosts, {
    variables: {
      clientPortalId: process.env.NEXT_PUBLIC_CP_ID,
      ...variables,
    },
  })

  const posts: ICmsPost[] = data?.cmsPostList.posts || []

  return { posts, loading }
}

export const useCmsPostDetail = (id: string) => {
  const { data, loading } = useQuery(queries.CmsPostDetail, {
    variables: { id },
  })

  const post: ICmsPost = data?.cmsPost || {}

  return { post, loading }
}

export const useCmsTags = () => {
  const { data, loading } = useQuery(queries.CmsTags, {
    variables: {
      clientPortalId: process.env.NEXT_PUBLIC_CP_ID,
    },
  })

  const tags: ICmsPostTag[] = data?.cmsTags || []

  return { tags, loading }
}
