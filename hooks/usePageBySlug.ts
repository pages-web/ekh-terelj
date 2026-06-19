"use client";

import { useQuery } from "@apollo/client";
import { useLocale } from "next-intl";
import { queries } from "@/sdk/graphql/cms";
import { CmsPage, CmsPost, ICpPageDetail } from "@/types/cms";

const normalizePage = (page: CmsPage): CmsPost => {
  const translation = page.translations?.[0];
  const content = translation?.content || page.content || page.description || "";

  return {
    _id: page._id,
    title: translation?.title || page.name,
    content,
    excerpt: translation?.excerpt || page.description || undefined,
    status: page.status,
    customFieldsMap: page.customFieldsMap,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt,
    thumbnail: page.thumbnail,
    images: page.pageImages,
    videoUrl: page.videoUrl || page.video?.url || undefined,
  };
};

export const usePageBySlug = (slug: string) => {
  const locale = useLocale();
  const { loading, error, data } = useQuery<ICpPageDetail>(
    queries.pageDetail,
    {
      variables: {
        slug,
        language: locale,
      },
      skip: !slug,
    },
  );

  const page = data?.cpCmsPageDetail || null;
  const post = page ? normalizePage(page) : null;

  return { loading, error, post,page };
};
