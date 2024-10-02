"use client";

import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { Link, usePathname } from "@/i18n/routing";

type Tab = {
  name: string;
  path: string;
};

const CategoryTab = ({ ...tab }: Tab) => {
  const locale = useParams().locale;
  const pathname = usePathname();
  return (
    <Link href={tab.path} locale={locale === "en" ? "en" : "mn"}>
      <Button variant={tab.path === pathname ? "default" : "outline"}>
        {tab.name}
      </Button>
    </Link>
  );
};
export default CategoryTab;
