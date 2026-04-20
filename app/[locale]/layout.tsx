import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import DefaultLayout from "@/components/layout";
import Apollo from "./ApolloClient";
import CurrentConfigProvider from "@/containers/config/currentConfig";
import { Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "100", "200", "300", "800", "900"],
  variable: "--font-roboto",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const pdomain =
    process.env.NEXT_PUBLIC_SAAS_DOMAIN || "https://ekhtterelj.mn";

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
      url: `${pdomain}/en`,
      siteName: name,
      images: [
        {
          url: `${pdomain}/images/logo-terelj.png`,
          width: 1200,
          height: 630,
          alt: name,
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
    <html lang={locale} className={roboto.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Apollo>
            <CurrentConfigProvider>
              <DefaultLayout locale={locale}>{children}</DefaultLayout>
            </CurrentConfigProvider>
          </Apollo>
          <Toaster richColors closeButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
