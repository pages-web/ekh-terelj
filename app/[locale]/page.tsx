import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Typography from "@/components/typography/typography";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <h1>{<Typography variant={"display-2xl"} children={t("title")} />}</h1>
      <Link href="/about">
        {<Typography variant={"text-md"} children={t("about")} />}
      </Link>
    </div>
  );
}
