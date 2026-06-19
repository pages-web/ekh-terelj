"use client";

import { Link } from "@/i18n/routing";
import Image from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Facebook, Instagram } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { menuItems } from "@/constants/navigation";
import { cn } from "@/lib/utils/cn";
import { useGetProducts } from "@/features/booking/hooks/extras";
import { IProduct } from "@/features/rooms/types";
import { useTranslations } from "next-intl";

const ACCOMMODATION_CATEGORY_ID = "gx_eK_IA1ohXzYzpawBaA";

export function NavbarTop({ children }: { children?: React.ReactNode }) {
  const tCommon = useTranslations("Common");
  const tNav = useTranslations("Nav");
  const { products: sortedRoomCategories }: { products: IProduct[] } =
    useGetProducts({
      variables: {
        categoryIds: [ACCOMMODATION_CATEGORY_ID],
        perPage: 1000,
      },
    });

  return (
    <header className="z-50 sticky top-0 w-full bg-primary shadow-xl backdrop-blur-md">
      <div className="flex justify-between items-center container mx-auto py-4 px-6">
        <Link
          href="/"
          aria-label={tCommon("homepage")}
          className="-mt-4 w-[140px] h-[65px] transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/images/logo_white.png"
            height={1080}
            width={1920}
            quality={100}
            alt={tCommon("logoAlt")}
            className="drop-shadow-lg"
          />
        </Link>

        <div className="flex justify-between gap-3 items-center">
          <div className="max-lg:hidden lg:flex justify-between items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {menuItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    {item.extra === "Accomodation" ? (
                      <NavigationMenuTrigger className="!text-white hover:bg-slate-800 hover:!text-white focus:!text-white active:!text-white data-[state=open]:bg-slate-800 data-[state=open]:!text-white transition-all duration-300 rounded-lg px-5 py-3 font-medium !bg-transparent">
                        {tNav(item.labelKey)}
                      </NavigationMenuTrigger>
                    ) : (
                      <NavigationMenuLink
                        href={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent text-white hover:bg-slate-800 hover:text-white transition-all duration-300 rounded-lg px-5 py-3 font-medium"
                        )}
                      >
                          {tNav(item.labelKey)}
                      </NavigationMenuLink>
                    )}

                    {item.extra === "Accomodation" && (
                      <NavigationMenuContent className="p-4 flex flex-col gap-2 bg-primary border border-gray-600 rounded-lg shadow-lg min-w-[280px]">
                        {sortedRoomCategories &&
                          sortedRoomCategories.map((category, index) => (
                            <NavigationMenuLink
                              className={cn(
                                navigationMenuTriggerStyle(),
                                "text-white hover:text-white hover:bg-slate-700/80 transition-all duration-300 rounded-lg px-4 py-3 font-medium bg-transparent hover:backdrop-blur-sm"
                              )}
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

          <div className="max-lg:hidden lg:flex gap-3 ml-6">
            <a
              href="https://www.facebook.com/ekhterel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white/90 hover:text-white transition-all duration-300 p-3 rounded-lg bg-primary hover:bg-slate-700"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/ekhtereljresort/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/90 hover:text-white transition-all duration-300 p-3 rounded-lg bg-primary hover:bg-slate-700"
            >
              <Instagram size={18} />
            </a>
          </div>

          {children}
          <div className="lg:!hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={tCommon("openMenu")}
                  className="text-white hover:bg-slate-800 transition-all duration-300 rounded-lg"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72 p-6 overflow-y-auto bg-slate-900 border-l border-gray-600"
              >
                <nav className="flex flex-col gap-3 mt-6">
                  {menuItems.map((item) => (
                    <Link
                      href={item.href}
                      aria-label={tNav(item.labelKey)}
                      className="text-white text-base font-medium hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-slate-800"
                      key={item.href}
                    >
                      {tNav(item.labelKey)}
                    </Link>
                  ))}
                  <div className="flex gap-4 mt-8 pt-6 border-t border-gray-600">
                    <a
                      href="https://www.facebook.com/ekhterel"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="text-white/90 hover:text-white transition-all duration-300 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700"
                    >
                      <Facebook size={20} />
                    </a>
                    <a
                      href="https://www.instagram.com/ekhtereljresort/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="text-white/90 hover:text-white transition-all duration-300 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700"
                    >
                      <Instagram size={20} />
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
