import Image from "next/image";
import { Link } from "@/i18n/routing";
import { menuItems } from "@/lib/menuItems";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 pt-12 text-gray-700 mt-28">
      <div className="grid gap-[40px] md:grid-cols-3 text-center md:text-left container">
        <div>
          <h3 className="font-semibold text-lg mb-4">STAY</h3>
          <div className="space-y-2 text-gray-500 flex flex-col">
            {menuItems.map((item) => (
              <Link href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center md:items-center text-center">
          <div className="mb-4">
            <div className="border border-gray-400 p-2 rounded">
              <Image
                src="/images/tereljLogo.png"
                alt="Logo"
                height={250}
                width={100}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 max-w-xs mb-2">
            Visit one of our 150 hotels worldwide for customizations, fittings &
            styling advice.
          </p>
          <p className="text-sm text-gray-600">ekh.terelj@gmail.com</p>
          <p className="text-sm text-gray-600 mb-4">+976 9900 4359</p>
          <button className="border border-gray-400 text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition">
            Contact Us
          </button>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-12 py-3">
        <div className="container flex flex-col md:flex-row justify-between items-center text-sm text-center gap-4">
          <p className="text-gray-500">&copy; 2025 Erxes</p>
          <div className="flex space-x-6 text-gray-500">
            <a href="#" className="hover:text-gray-800 transition">
              Instagram
            </a>
            <a href="#" className="hover:text-gray-800 transition">
              Facebook
            </a>
            <a href="#" className="hover:text-gray-800 transition">
              Youtube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
