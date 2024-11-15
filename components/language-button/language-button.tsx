"use client";
import { Button } from "../ui/button";
import { Link, usePathname } from "@/i18n/routing";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const LanguageButton = ({ locale }: { locale: string }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "About Hotel" },
    { href: "/accommodation", label: "Accommodation" },
    { href: "/dining", label: "Dining" },
    { href: "/events", label: "Events" },
    { href: "/wellness", label: "Wellness" },
    { href: "/offer", label: "Offer" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="flex justify-center items-center">
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button
            className="bg-black flex xl:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetClose onClick={() => setIsMenuOpen(false)} />
          </SheetHeader>
          <motion.nav
            className="container flex flex-col p-4 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex h-5 w-full text-textmd font-medium text-gray-600 hover:text-gray-900 items-center rounded-md px-3 text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                {item.label}
              </Link>
            ))}
          </motion.nav>
          <div className="flex flex-col lg:flex-row p-4 gap-4 mt-4">
            <Link href={pathname} locale={locale === "en" ? "mn" : "en"}>
              <Button className="w-full" variant="default">
                {locale === "en" ? "MN" : "EN"}
              </Button>
            </Link>
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <Button className="">Log In</Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/50 z-50 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      />
      {!isMenuOpen && (
        <div className="hidden xl:flex gap-6">
          <Link href={pathname} locale={locale === "en" ? "mn" : "en"}>
            <Button variant="default">{locale === "en" ? "MN" : "EN"}</Button>
          </Link>
          <Link href="/login">
            <Button variant={"outline"} className="text-black">
              Log in
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LanguageButton;
