import Image from "next/image";
import { Link } from "@/i18n/routing";
import { menuItems } from "@/lib/menuItems";
import {
  Facebook,
  FacebookIcon,
  InstagramIcon,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const tCommon = useTranslations("Common");
  const tFooter = useTranslations("Footer");
  const tNav = useTranslations("Nav");

  return (
    <footer className="bg-primary pt-16 pb-8 text-gray-700 mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/images/logo_white.png"
                alt={tCommon("logoAlt")}
                height={80}
                width={150}
                quality={100}
              />
            </div>
            <p className="text-sm text-white/80 leading-relaxed mb-6">
              {tFooter("description")}
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/ekhterel"
                target="_blank"
                className="text-white hover:text-blue-600 transition-colors duration-200"
              >
                <FacebookIcon size={20} />
              </a>
              <a
                href="https://www.instagram.com/ekhtereljresort/"
                target="_blank"
                className="text-white hover:text-pink-600 transition-colors duration-200"
              >
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">
              {tFooter("links")}
            </h3>
            <ul className="space-y-3">
              {menuItems.slice(0, 6).map((item) => (
                <li key={item.labelKey}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {tNav(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">
              {tFooter("contact")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-white/80 mt-1 flex-shrink-0"
                />
                <p className="text-sm text-white/80 hover:text-white transition-colors">
                  {tFooter("address")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-white/80 flex-shrink-0" />
                <a
                  href="tel:+97688010003"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  +976 8801 0003, 86010003
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-white/80 flex-shrink-0" />
                <a
                  href="mailto:ekh.terelj@gmail.com"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  ekh.terelj@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-sm text-white/60">{tFooter("copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
