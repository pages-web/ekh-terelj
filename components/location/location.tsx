"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plane, Car } from "lucide-react";
import HeadingButton from "../heading-button/heading-button";
import Heading from "../heading/heading";
import DynamicIcon from "../dynamicIcon/dynamicIcon";
import * as Icons from "lucide-react";
import { Link } from "@/i18n/routing";

export default function Location() {
  const infos = [
    {
      icon: "MapPin",
      title: `Prime Minister Amar's street 15, Ulaanbaatar 14200, Mongolia`,
    },
    {
      icon: "Plane",
      title: `Nearest airport 2 hour Genghis khan airport`,
    },
    {
      icon: "Car",
      title: `A 40 minute drive taxi station`,
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center text-center space-y-6">
        <HeadingButton title="Location" />
        <Heading
          title="Getting here"
          desc=" The Otemachi Tower is connected to the five-line Otemachi subway
        station, close to Tokyo Station, offering access to the nationwide
        bullet train network."
        />
      </div>

      <div className="h-[400px] w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3362.9127757590254!2d106.9352121770386!3d47.92438637122066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9692166117ef3d%3A0x16047093895df1e4!2sFlower%20Hotel!5e1!3m2!1smn!2smn!4v1740094066102!5m2!1smn!2smn"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="grid grid-cols-4 gap-10">
        {infos.map((info, index) => (
          <div key={index} className="flex items-center space-x-2">
            <DynamicIcon name={info.icon as keyof typeof Icons} />
            <p className="text-textsm">{info.title}</p>
          </div>
        ))}

        <Link
          href={
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3362.9127757590254!2d106.9352121770386!3d47.92438637122066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9692166117ef3d%3A0x16047093895df1e4!2sFlower%20Hotel!5e1!3m2!1smn!2smn!4v1740094066102!5m2!1smn!2smn"
          }
          target="_blank"
          className="underline underline-offset-4 justify-self-end"
        >
          Get directions
        </Link>
      </div>
    </div>
  );
}
