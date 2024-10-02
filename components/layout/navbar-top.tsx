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
  //   const { config } = await getConfig();
  //   const { logo } = config?.uiOptions || {};
  return (
    <header
      className={
        "z-50 sticky top-0 py-3 md:shadow-md bg-background text-white w-full border-b"
      }
      {...rest}
    >
      <div className="flex gap-[clamp(1rem,3vw,3rem)] justify-between items-center w-full md:h-[60px] md:sticky top-0 container pt-1 md:pt-0">
        <Link
          href="/"
          aria-label="SF Homepage"
          className="h-12 w-40 text-2xl overflow-hidden"
        >
          <Image
            src={"/images/logo.png"}
            height={100}
            width={152}
            quality={100}
            skipAnimation
            priority
            alt=""
            className="object-contain h-12 w-auto object-left"
          />
        </Link>
        {children}
      </div>
    </header>
  );
}
