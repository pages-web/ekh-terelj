"use client";

import { MapPin, Star } from "lucide-react";
import Image from "../ui/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ProductDetailHeader from "./product-detail-header";
import ProductDetailImages from "./product-detail-images";
import ProductCardRating from "./product-detail-rating";
import ProductDetailDescription from "./product-detail-description";

const ProductDetail = () => {
  return (
    <div>
      <div className="w-full flex flex-col gap-10">
        <ProductDetailHeader />
        <ProductDetailImages />
        <div className="flex justify-between gap-6">
          <ProductDetailDescription />
          <ProductCardRating />
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
