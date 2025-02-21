import AccommodationLayout from "./accommodation-layout";
import ProductCard from "@/components/product-card/product-card";

const Accommodation = () => {
  return (
    <AccommodationLayout>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(5)
          .fill(1)
          .map((_, index) => {
            return <ProductCard category={null} key={index} />;
          })}
      </div>
    </AccommodationLayout>
  );
};
export default Accommodation;
