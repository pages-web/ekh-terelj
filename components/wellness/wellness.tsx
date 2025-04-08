import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Welness() {
  return (
    <div className="bg-white text-gray-800 py-10 px-4 max-w-6xl mt-[20px] mb-[100px] mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-[32px] font-semibold mb-2">Spa House</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          World-class wellness in one of the best spas in Sydney nestled among
          decades of architectural history
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((_, i) => (
          <div
            key={i}
            className="rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col"
          >
            <Image
              src={i === 0 ? "/images/spa-1.png" : "/images/spa-2.png"}
              alt="Spa House"
              width={600}
              height={400}
              className="object-cover w-full"
            />
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">Hannam Spa House</h3>
              <p className="text-sm text-gray-600 mb-4">
                Revered in Middle Eastern and North African cultures from Turkey
                to Morocco, the Hammam is an exquisite steam room with marble
                walls and a heated marble treatment table. The treatment
                includes a steam bath experience, body scrub, and invigorating
                massage to exfoliate and cleanse the skin.
              </p>
              <a href="/wellness-details">
                <Button variant="outline" className="flex items-center gap-2">
                  View more <ArrowRight size={16} />
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
