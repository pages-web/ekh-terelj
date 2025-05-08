"use client";

import { Link } from "@/i18n/routing";
import Image from "../ui/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useCmsPosts, useCmsTags } from "@/sdk/queries/cms";
import { menuItems } from "@/lib/menuItems";
import { cn } from "@/lib/utils";
import { useRoomCategories } from "@/sdk/queries/rooms";

export function NavbarTop({ children }: { children?: React.ReactNode }) {
  const { roomCategories } = useRoomCategories();

  return (
    <header className="z-50 sticky top-0 w-full bg-white border-b">
      <div className="flex justify-between items-center container mx-auto py-3 px-4">
        <Link href="/" aria-label="Homepage" className="w-32">
          <Image
            src="/images/tereljLogo.png"
            height={300}
            width={150}
            quality={100}
            alt="Logo"
            className="w-full h-full"
          />
        </Link>

        <div className="flex justify-between gap-2">
          <div className="hidden md:flex justify-between items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    {item.label === "Accomodation" ? (
                      <NavigationMenuTrigger>
                        {item.label}
                      </NavigationMenuTrigger>
                    ) : (
                      <NavigationMenuLink
                        href={item.href}
                        className={cn(navigationMenuTriggerStyle(), "w-full")}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    )}

                    {item.label === "Accomodation" && (
                      <NavigationMenuContent className=" p-2 flex flex-col gap-2 ">
                        {roomCategories &&
                          roomCategories.map((category, index) => (
                            <NavigationMenuLink
                              className={navigationMenuTriggerStyle()}
                              href={`/room-detail/${category._id}`}
                              key={index}
                            >
                              {category.name}
                            </NavigationMenuLink>
                          ))}
                      </NavigationMenuContent>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          {children}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-6 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="text-xl font-semibold text-black">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-6">
                  {menuItems.map((item) => (
                    <Link
                      href={item.href}
                      aria-label={item.label}
                      className="text-black text-base font-medium hover:underline"
                      key={item.href}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
