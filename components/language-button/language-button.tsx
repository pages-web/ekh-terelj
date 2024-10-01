"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const LanguageButton = ({ locale }: { locale: string }) => {
  const router = useRouter();
  return (
    <Button
      variant={"default"}
      onClick={() => router.push(locale === "en" ? "mn" : "en")}
    >
      {locale === "en" ? "MN" : "EN"}
    </Button>
  );
};
export default LanguageButton;
