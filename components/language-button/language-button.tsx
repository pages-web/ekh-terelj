"use client";
import { Button } from "../ui/button";
import { Link, usePathname } from "@/i18n/routing";

const LanguageButton = ({ locale }: { locale: string }) => {
  const pathname = usePathname();

  return (
    <div className="flex gap-6">
      <Link href={pathname} locale={locale === "en" ? "mn" : "en"}>
        <Button variant={"default"}>{locale === "en" ? "MN" : "EN"}</Button>
      </Link>
      <Link href="/sign-in">
        <Button className="bg-white text-black" variant={"default"}>Sign In</Button>
      </Link>
    </div>
  );
};
export default LanguageButton;
