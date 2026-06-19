"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const locales = [
  { value: "en", label: "EN" },
  { value: "mn", label: "MN" },
] as const;

const LanguageButton = ({ locale }: { locale: string }) => {
  const pathname = usePathname();

  return (
    <div className="flex overflow-hidden rounded-lg border border-white/30 bg-white/10 text-sm font-semibold">
      {locales.map((item) => {
        const isActive = locale === item.value;

        return (
          <Link
            key={item.value}
            href={pathname}
            locale={item.value}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "px-3 py-2 text-white transition-colors hover:bg-white/20",
              isActive && "bg-white text-primary hover:bg-white"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default LanguageButton;
