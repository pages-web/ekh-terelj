"use client";

import { useQuery } from "@apollo/client";
import queries from "@/features/cms/lib/gql/queries";
import { useLocale } from "next-intl";

interface CategoryDetailData {
  cpCmsCategoryDetail?: {
    _id?: string;
  };
}

export const useCategories = (slug: string) => {
  const locale = useLocale();
  const { loading, error, data } = useQuery<CategoryDetailData>(
    queries.categories,
    {
      variables: {
        slug,
        language: locale,
      },
      skip: !slug,
    },
  );

  const categoryId = data?.cpCmsCategoryDetail?._id;

  return { loading, error, categoryId };
};
