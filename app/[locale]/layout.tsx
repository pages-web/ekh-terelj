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

export const metadata: Metadata = {
  title: "Эх тэрэлж",
  description: "Эх тэрэлж",
  icons: {
    icon: "/images/1x1.png",
  },
};
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
