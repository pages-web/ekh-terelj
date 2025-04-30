import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import DefaultLayout from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";
import Apollo from "./ApolloClient";
import CurrentConfigProvider from "@/containers/config/currentConfig";

export const metadata: Metadata = {
  title: "Эх Тэрэлж",
  description: "Эх Тэрэлж",
  icons: {
    icon: [{ url: "/images/logo2.png", href: "/images/logo2.png", media: "" }],
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Apollo>
            <CurrentConfigProvider>
              <DefaultLayout locale={locale}>{children}</DefaultLayout>
            </CurrentConfigProvider>
          </Apollo>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
