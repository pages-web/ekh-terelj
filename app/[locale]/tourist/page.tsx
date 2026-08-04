"use client";

import React from "react";
import { useTranslations } from "next-intl";

const Tourist = () => {
  const t = useTranslations("Common");

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <p className="text-gray-500">{t("noContent")}</p>
    </div>
  );
};

export default Tourist;
