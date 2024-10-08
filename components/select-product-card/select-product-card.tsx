"use client";

import { Star } from "lucide-react";
import Image from "../ui/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PopupProductDetail from "../popup-product-detail/popup-product-detail";
import { Button } from "../ui/button";
import { useState } from "react";
import SelectRateCard from "../select-rate-card/select-rate-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/custom-ui/custom-accordion";

const SelectProductCard = () => {
  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger>
          <div className="text-start space-y-3 cursor-pointer group">
            <div className="h-[300px] overflow-hidden w-fit rounded-xl relative flex justify-center items-center">
              <Image
                src="/images/product.png"
                width={600}
                height={600}
                className="h-full group-hover:blur-sm duration-300"
              />
              <span className="absolute text-textxs bg-white/60 py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 duration-300">
                Room details
              </span>
            </div>
            <div className="flex justify-between items-start ">
              <div>
                <h3 className="text-textmd">Duxton Room Twin</h3>
                <p className="flex text-black/50 text-textsm items-center">
                  <Star className="w-4 h-4 mr-2" />
                  4.7 (2,578 Reviews)
                </p>
              </div>
              <p className="text-textlg font-bold">1,200,000₮ MNT</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="rounded-xl no-scrollbar overflow-y-scroll w-[95%] h-[95%] md:h-[90%] md:max-w-[1000px] px-0 border-0">
          <PopupProductDetail />
        </DialogContent>
      </Dialog>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger asChild className="my-4">
            <Button className="w-full">Select rate</Button>
          </AccordionTrigger>
          <AccordionContent asChild>
            <SelectRateCard />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export default SelectProductCard;
