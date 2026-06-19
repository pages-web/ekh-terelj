"use client";

import { useQuery } from "@apollo/client";
import { useLocale } from "next-intl";
import queries from "@/features/cms/lib/gql/queries";
import { CmsPost } from "@/features/cms/types";

interface ICpPostDetail {
  cpPost?: CmsPost;
}

export const useCmsPostBySlug = (slug: string) => {
  const locale = useLocale();

  const { loading, error, data } = useQuery<ICpPostDetail>(
    queries.postDetail,
    {
      variables: {
        id: slug,
        language: locale,
      },
      skip: !slug,
    },
  );

  const post = data?.cpPost || null;

  return { loading, error, post };
};
