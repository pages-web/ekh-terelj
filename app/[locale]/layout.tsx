import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import DefaultLayout from "@/components/layout";
import Apollo from "./ApolloClient";
import CurrentConfigProvider from "@/containers/config/currentConfig";
import { Toaster } from "@/components/ui/sonner";

export async function generateMetadata(): Promise<Metadata> {
  const pdomain = process.env.NEXT_PUBLIC_SAAS_DOMAIN || "https://ekhterelj.mn";

  const name = "Ekh terelj";
  const description =
    "Бид тав тухтай, аюулгүй орчинд, эрүүл, амт чанартай хоол, найрсаг үйлчилгээгээрээ үнэнч үйлчлүүлэгчидтэй болохыг зорин ажилладаг.";

  return {
    metadataBase: new URL(pdomain),
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      url: `https://ekhterelj.mn/`,
      siteName: name,
      images: [
        {
          url: "https://ekhterelj.mn/images/logo-terelj.png",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
      images: [`${pdomain}/images/logo-terelj.png`],
    },
  };
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <Apollo>
        <CurrentConfigProvider>
          <DefaultLayout locale={locale}>{children}</DefaultLayout>
        </CurrentConfigProvider>
      </Apollo>
      <Toaster richColors closeButton />
    </NextIntlClientProvider>
  );
}
