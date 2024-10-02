"use client";
import { Button } from "../ui/button";
import { Link, usePathname } from "@/i18n/routing";

const LanguageButton = ({ locale }: { locale: string }) => {
  const pathname = usePathname();
  return (
    <Link href={pathname} locale={locale === "en" ? "mn" : "en"}>
      <Button variant={"default"}>{locale === "en" ? "MN" : "EN"}</Button>;
    </Link>
  );
};
export default LanguageButton;
