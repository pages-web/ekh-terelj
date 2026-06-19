import { MapPin, Star } from "lucide-react";
import { useTranslations } from "next-intl";

const ProductDetailHeader = () => {
  const t = useTranslations("Content");
  return (
    <div className="w-fit space-y-2">
      <h1 className="text-displaymd">{t("deluxeTwinRoom")}</h1>
      <div className="w-full flex justify-between gap-4">
        <span className="flex text-black/70 items-center">
          <Star className="w-4 h-4 mr-2" />
          4.7 (2,578 {t("reviewsRatings")})
        </span>
        <span className="flex text-black/70 items-center">
          <MapPin className="w-4 h-4 mr-2" />
          {t("roomLocation")}
        </span>
      </div>
    </div>
  );
};
export default ProductDetailHeader;
