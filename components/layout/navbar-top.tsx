import { Link } from "@/i18n/routing";
import { Separator } from "../ui/separator";
import Image from "../ui/image";
import { Suspense } from "react";

export async function NavbarTop({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    { href: "/accommodation", label: "Accommodation" },
    { href: "/dining", label: "Dining" },
    { href: "/events", label: "Events" },
    // { href: "/wellness", label: "Wellness" },
    // { href: "/offer", label: "Offer" },
    // { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={
        "z-50 sticky top-0 py-3 md:shadow-md bg-background text-white w-full border-b"
      }
      {...rest}
    >
      <div className="flex md:flex-row gap-4 md:gap-[clamp(1rem,3vw,3rem)] justify-between items-center w-full md:h-[60px] md:sticky top-0 container pt-1 md:pt-0">
        <Link
          href="/"
          aria-label="SF Homepage"
          className="w-fit h-28 text-2xl overflow-hidden mt-5"
        >
          <Image
            src={"/images/logo2.png"}
            height={300}
            width={300}
            quality={100}
            skipAnimation
            priority
            alt=""
            className="object-contain h-full w-full object-left"
          />
        </Link>
        <nav className="flex gap-2 md:gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className="text-black font-normal text-textsm px-3 py-2 hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </header>
  );
}
