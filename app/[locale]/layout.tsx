import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import DefaultLayout from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";
import Apollo from "./ApolloClient";
import CurrentConfigProvider from "@/containers/config/currentConfig";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "100", "200", "300", "800", "900"], // Add weights you need
  variable: "--font-roboto", // Optional: for CSS variable usage
  display: "swap",
});

export const metadata: Metadata = {
  title: "Template 1",
  description: "Template 1",
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
    <html lang={locale} className={roboto.className}>
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
