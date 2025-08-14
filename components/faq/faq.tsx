"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCmsPosts } from "@/sdk/queries/cms";

export default function FAQPage() {
  const { posts: allFaqPosts, loading: faqPostsLoading } = useCmsPosts({
    categoryId: "FxxII_vEiiY_1YTMmFg1b",
    perPage: 1000,
  });

  const faqPosts = allFaqPosts.filter((post) =>
    post.categoryIds.includes("FxxII_vEiiY_1YTMmFg1b")
  );

  if (faqPostsLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-64 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-100 rounded w-96 mx-auto mb-12"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-14 bg-gray-100 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Түгээмэл Асуулт Хариулт
            </h2>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 lg:p-8">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqPosts.map((faqItem, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-xl border-0 shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-5 text-left hover:bg-gray-50/70 transition-colors duration-200 border-0">
                    <div className="flex items-center gap-4 w-full no-underline hover:no-underline">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {index + 1}
                      </div>
                      <span className="text-base lg:text-lg font-medium text-gray-900 text-left pr-4">
                        {faqItem.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5">
                    <div className="ml-10 text-gray-700 leading-relaxed">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: faqItem.content,
                        }}
                        className="prose prose-sm max-w-none [&>p]:mb-3 [&>ul]:mb-3 [&>ol]:mb-3"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
