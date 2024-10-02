import { MapPin, Star } from "lucide-react";

const ProductDetailHeader = () => {
  return (
    <div className="w-fit space-y-2">
      <h1 className="text-displaymd">Deluxe Twin Room</h1>
      <div className="w-full flex justify-between gap-4">
        <span className="flex text-black/70 items-center">
          <Star className="w-4 h-4 mr-2" />
          4.7 (2,578 Reviews)
        </span>
        <span className="flex text-black/70 items-center">
          <MapPin className="w-4 h-4 mr-2" />
          Ulaanbaatar city
        </span>
      </div>
    </div>
  );
};
export default ProductDetailHeader;
