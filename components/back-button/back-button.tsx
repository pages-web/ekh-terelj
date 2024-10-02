"use client";

import { useRouter } from "@/i18n/routing";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      className="rounded-full"
      size={"icon"}
      onClick={() => router.back()}
    >
      <ChevronLeft />
    </Button>
  );
};
export default BackButton;
