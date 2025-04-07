import { Link } from "@/i18n/routing";
import Image from "../ui/image";

export async function NavbarTop({ children }: { children?: React.ReactNode }) {
  const menuItems = [
    { href: "/accommodation", label: "Accomodation" },
    { href: "/events", label: "Events" },
    { href: "/dining", label: "Dining" },
    { href: "/wellness", label: "Wellness" },
    { href: "/offers", label: "Offers" },
    { href: "/about", label: "About" },
    { href: "/gallery", label: "Gallery" },
    { href: "/account", label: "Account" },
  ];

  return (
    <header className="z-50 sticky top-0 w-full bg-white border-b ">
      <div className="flex flex-col md:flex-row justify-between items-center container mx-auto py-3">
        <nav className="flex gap-6">
          {menuItems.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className="text-black font-normal text-sm hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/" aria-label="Homepage">
          <Image
            src="/images/logo.png"
            height={60}
            width={60}
            alt="Logo"
            className="object-contain"
          />
        </Link>

        <nav className="flex gap-6">
          {menuItems.slice(4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className="text-black font-normal text-sm hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
