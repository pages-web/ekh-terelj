"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const footerSections = [
  {
    title: "About",
    links: [
      { href: "/", label: "About Us" },
      { href: "/", label: "Career" },
      { href: "/", label: "Blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/", label: "Contact Us" },
      { href: "/", label: "Return" },
      { href: "/", label: "FAQ" },
    ],
  },
];

const socialIcons = [
  {
    href: "https://www.instagram.com/flower_hotel_ulaanbaatar",
    label: "Instagram",
    icon: "/images/instagram.svg",
  },
  {
    href: "https://www.facebook.com/flowerhotelulaanbaatar",
    label: "Facebook",
    icon: "/images/facebook.svg",
  },
  // { href: "https://twitter.com", label: "Twitter", icon: "/images/x.svg" },
  // { href: "https://google.com", label: "Google", icon: "/images/google.svg" },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white px-4 py-8 border-t mt-40"
    >
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/images/logo2.png"
            alt="logo"
            width={300}
            height={300}
            className="mb-10"
            quality={100}
          />
          <p className="text-center text-sm text-gray-600 mb-6">
            Our mission is to equip modern explorers, with cutting-edge,
            functional and stylish bags that elevate every adventure.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full mb-8">
          {footerSections.map((section, index) => (
            <AccordionItem value={`section-${index}`} key={index}>
              <AccordionTrigger className="text-lg font-semibold">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Get Updates</h3>
          <form className="flex flex-col space-y-2">
            <Input type="email" placeholder="Enter your email" required />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          {socialIcons.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src={social.icon} alt={social.label} className="h-6 w-6" />
            </motion.a>
          ))}
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>&copy; 2025 All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="/privacy" className="hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-gray-900">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
