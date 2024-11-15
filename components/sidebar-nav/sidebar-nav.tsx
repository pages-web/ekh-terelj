"use client";

import { Link, usePathname } from "@/i18n/routing";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import Logout from "@/containers/auth/logout";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 p-0.5",
        className
      )}
      {...props}
    >
      {items.map((item) => {
        if (item.href === "/logout") return <Logout key={"logout"} />;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href ||
                (pathname.includes("/profile/orders/") &&
                  item.href === "/profile/orders")
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start hover:text-primary"
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
