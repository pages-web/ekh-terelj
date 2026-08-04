"use client";

import { useQuery } from "@apollo/client";
import queries from "@/features/cms/lib/gql/queries";
import { IPostList } from "@/features/cms/types";
import { useCategories } from "./useCategory";
import { useLocale } from "next-intl";

export const useCmsPostsBySlug = (slug: string) => {
  const locale = useLocale();
  const { categoryId, loading: categoryLoading } = useCategories(slug);
  const shouldWaitForCategory = Boolean(slug && !categoryId);

  const {
    loading,
    error,
    data: cmsPosts,
    refetch,
  } = useQuery<IPostList>(queries.CpCmsPosts, {
    variables: {
      categoryIds: categoryId ? [categoryId] : undefined,
      language: locale,
    },
    skip: shouldWaitForCategory,
  });

  const posts = cmsPosts?.cpPostList?.posts || [];

  return { loading: loading || categoryLoading, error, posts, refetch };
};
