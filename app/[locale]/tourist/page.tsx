"use client";

import React from "react";
import { useCmsPosts } from "@/features/cms/hooks/cms";
import { Loading } from "@/components/ui/loading";
import { useTranslations } from "next-intl";
import { CmsContent } from "@/features/cms/components/content-render";

const Tourist = () => {
  const t = useTranslations("Common");
  const { posts, loading } = useCmsPosts({
    tagIds: ["xRGMNDkODeYklziGG1N1l"],
    perPage: 1000,
  });

  const post = posts[0];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">{t("noContent")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <article className="prose prose-lg max-w-none">
        <CmsContent
          html={post.content}
          className="text-gray-800 leading-relaxed space-y-6"
        />
      </article>
    </div>
  );
};

export default Tourist;
