"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import DOMPurify from "dompurify";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, BedDouble } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";
import Image from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Loading } from "@/components/ui/loading";
import { useCmsPostBySlug } from "@/features/cms/hooks/useCmsPostDetail";
import { useGetProducts } from "@/features/booking/hooks/extras";
import { CmsAttachment, CmsPost } from "@/features/cms/types";
import { IProduct } from "@/features/rooms/types";
import { ACCOMMODATION_PRODUCT_FIELD_ID } from "@/constants/accommodation";
import { cn } from "@/lib/utils/cn";

type CmsProductField = {
  field?: string;
  value?: string[];
};

const getGallery = (post?: CmsPost | null) => {
  return [
    post?.thumbnail?.url ? post.thumbnail : undefined,
    ...(post?.images || []),
  ].filter((item): item is CmsAttachment => Boolean(item?.url));
};

const getProductId = (post?: CmsPost | null) => {
  const customFieldsData = post?.customFieldsData as
    | CmsProductField[]
    | undefined;

  return customFieldsData?.find(
    (item) => item.field === ACCOMMODATION_PRODUCT_FIELD_ID,
  )?.value?.[0];
};

export default function AccommodationDetail() {
  const params = useParams();
  const t = useTranslations("Accommodation");
  const { post, loading: postLoading } = useCmsPostBySlug(
    params.slug as string,
  );
  const { products: rooms, loading: roomsLoading }: {
    products: IProduct[];
    loading: boolean;
  } = useGetProducts({
    variables: {
      perPage: 1000,
    },
  });
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const productId = getProductId(post);
  const room = rooms.find((room) => room._id === productId);
  const gallery = useMemo(() => getGallery(post), [post]);
  const content = post?.content ? DOMPurify.sanitize(post.content) : "";

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setActiveSlide(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  if (postLoading || roomsLoading || !post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loading />
      </div>
    );
  }

  if (!room) {
    return (
      <main className="bg-background px-4 py-24">
        <div className="container mx-auto flex min-h-[55vh] items-center justify-center">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <BedDouble className="h-8 w-8 text-gray-400" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              {t("roomNotFound")}
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {t("roomNotFoundDescription")}
            </p>
            <Button asChild variant="outline" className="mt-5">
              <Link href="/accommodation">{t("backToAccommodation")}</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background px-4 py-24 text-foreground">
      <div className="container mx-auto space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-4xl space-y-3">
            <h1 className="text-3xl font-semibold text-gray-950">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-sm leading-6 text-gray-600 sm:text-base">
                {post.excerpt}
              </p>
            )}
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="space-y-8">
            {gallery.length > 0 && (
              <div className="overflow-hidden rounded-lg border border-[#dce5ef] bg-card shadow-sm">
                <Carousel
                  setApi={setApi}
                  opts={{ loop: gallery.length > 1 }}
                  plugins={[
                    Autoplay({ delay: 4500, stopOnInteraction: false }),
                  ]}
                  className="[&>div]:h-full"
                >
                  <CarouselContent className="h-[300px] sm:h-[440px] lg:h-[560px]">
                    {gallery.slice(0, 12).map((image, index) => (
                      <CarouselItem key={`${image.url}-${index}`}>
                        <Image
                          src={image.url}
                          alt={image.name || post.title || t("roomImage")}
                          width={1400}
                          height={900}
                          priority={index === 0}
                          className="h-full w-full object-cover"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {gallery.length > 1 && (
                    <>
                      <CarouselPrevious className="left-3" />
                      <CarouselNext className="right-3" />
                    </>
                  )}
                </Carousel>

                {gallery.length > 1 && (
                  <div className="flex h-10 items-center justify-center gap-2">
                    {gallery.slice(0, 12).map((image, index) => (
                      <button
                        key={`${image.url}-dot-${index}`}
                        type="button"
                        onClick={() => api?.scrollTo(index)}
                        aria-label={t("gallerySlide", { index: index + 1 })}
                        className={cn(
                          "h-1.5 rounded-full bg-muted-foreground/30 transition-all",
                          activeSlide === index ? "w-7 bg-primary" : "w-2",
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {content && (
              <div
                className="room-detail-content text-sm leading-7 text-[#65778f] sm:text-base"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </section>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="rounded-lg border-[#dce5ef] shadow-sm">
              <CardContent className="space-y-6 p-5">
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-gray-950">
                    {room.name}
                  </h2>
                </div>

                <div className="border-y border-gray-200 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-gray-600">
                      {t("perNight")}
                    </p>
                    <p className="text-xl font-semibold text-primary">
                      {room.unitPrice.toLocaleString()}₮
                    </p>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href="/booking">
                    {t("bookRoom")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
