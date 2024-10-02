"use client";

import { LinkProps } from "next/link";
import { Link } from "@/i18n/routing";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "../ui/button";

export type Breadcrumb = {
  name: string;
  link: LinkProps["href"];
};

export interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

export function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <div className="py-4">
      <nav
        data-testid="breadcrumbs"
        className="inline-flex font-normal font-body text-textsm capitalize"
      >
        <ol className="flex items-center w-auto leading-none group md:flex-wrap">
          <li className="flex items-center sm:hidden text-neutral-500">
            <Popover>
              <PopoverTrigger>
                <MoreHorizontalIcon className="h-5 w-5" />
              </PopoverTrigger>
              <PopoverContent>
                <div className="space-y-1">
                  {breadcrumbs.map(({ name, link }) => (
                    <div className="last-of-type:hidden" key={name}>
                      <Button
                        asChild
                        variant={"link"}
                        className="px-0 h-6 text-black"
                      >
                        <Link href={link}>{name}</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </li>
          {breadcrumbs.map(({ name, link }) => (
            <li
              className="peer hidden sm:flex items-center peer-[:nth-of-type(even)]:before:text-sm peer-[:nth-of-type(even)]:before:content-['/'] peer-[:nth-of-type(even)]:before:px-2 peer-[:nth-of-type(even)]:before:leading-6 last-of-type:flex last-of-type:before:font-normal last-of-type:before:text-neutral-500 text-neutral-500 last-of-type:text-primary last-of-type:font-medium"
              key={name}
            >
              <Button
                asChild
                variant={"link"}
                className="px-0 h-6 text-inherit font-inherit"
              >
                <Link href={link}>{name}</Link>
              </Button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
