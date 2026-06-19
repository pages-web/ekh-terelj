"use client";

import { useQuery } from "@apollo/client";
import queries from "@/features/cms/lib/gql/queries";
import { IPostList } from "@/features/cms/types";
import { useCategories } from "./useCategory";

export const useCmsPostsBySlug = (slug: string) => {
  const { categoryId } = useCategories(slug);
  const shouldWaitForCategory = Boolean(slug && !categoryId);

  const {
    loading,
    error,
    data: cmsPosts,
  } = useQuery<IPostList>(queries.CpCmsPosts, {
    variables: {
      categoryIds: categoryId ? [categoryId] : undefined,
    },
    skip: shouldWaitForCategory,
  });

  const posts = cmsPosts?.cpPostList?.posts || [];

  return { loading, error, posts };
};
