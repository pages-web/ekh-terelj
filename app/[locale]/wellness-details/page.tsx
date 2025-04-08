"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronUp, ChevronDown } from "lucide-react";

export default function SpaDetails() {
  const [openSections, setOpenSections] = useState<boolean[]>([true, true]);

  const toggleSection = (index: number) => {
    const newState = [...openSections];
    newState[index] = !newState[index];
    setOpenSections(newState);
  };




  
  return (
    <div className="bg-white text-gray-800 max-w-7xl mx-auto mb-[80px] mt-[20px] p-6 space-y-10">
      <div className="flex items-center justify-between">
        <button className="rounded-full p-2 hover:bg-gray-100">
          <ChevronLeft size={24} />
        </button>
        <div className="text-center flex-1">
          <h1 className="text-[30px] font-semibold">Hannam Spa house</h1>
          <p className="text-sm text-gray-500">
            World-class wellness in one of the best spas in Sydney nestled among
            decades of architectural history
          </p>
        </div>
        <div className="w-8" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/images/spa-hero.png"
              alt="Main spa room"
              width={800}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/images/spa-waterfall.png"
                alt="Spa feature 1"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/images/spa-lounge.png"
                alt="Spa feature 2"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-lg mb-2">A spa of one’s own</h2>
            <p className="text-sm text-gray-600">
              A world away from the streets of New York below, Aman New York’s
              Spa Houses offer the ultimate peaceful escape...
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">
              Exclusive experiences
            </h2>
            <p className="text-sm text-gray-600">
              Available for half or full day private hire, Spa House experiences
              include a selection of customised treatments...
            </p>
          </div>

          {[0, 1].map((i) => (
            <div key={i} className="border-t pt-4">
              <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => toggleSection(i)}
              >
                <h3 className="font-medium text-base">
                  Sample Half Day Banya Experience
                </h3>
                {openSections[i] ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              {openSections[i] && (
                <ul className="mt-2 space-y-2 text-sm text-gray-600 list-disc pl-5">
                  <li>One Banya sauna treatment per guest</li>
                  <li>Body scrub and sensory shower experience</li>
                  <li>60-minute custom full-body massage</li>
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
