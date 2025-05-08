import Image from "next/image";
import { Link } from "@/i18n/routing";
import { menuItems } from "@/lib/menuItems";
import {
  Facebook,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 pt-10 text-gray-700 mt-28">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className=" p-2 rounded">
          <Image
            src="/images/tereljLogo.png"
            alt="Logo"
            height={250}
            width={100}
          />
        </div>
        {/* <p className="text-sm text-gray-600">ekh.terelj@gmail.com</p>
        <p className="text-sm text-gray-600">+976 9900 4359</p> */}
        <div className="space-y-2 text-gray-500 flex flex-col items-center">
          {menuItems.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-2">
          <InstagramIcon />
          <FacebookIcon />
          <YoutubeIcon />
        </div>
        <p className="text-black/60 text-sm">© 2025 Ikh Terelj Resort</p>
      </div>
    </footer>
  );
}
