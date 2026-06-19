import Image from "next/image";
import Heading from "@/components/heading/heading";
import HeadingButton from "../heading-button/heading-button";
import { usePathname } from "@/i18n/routing";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

export default function Gallery() {
  const tContent = useTranslations("Content");
  const pathname = usePathname();

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center text-center space-y-6">
        <HeadingButton title={tContent("gallery")} link="/gallery" />
        <Heading
          title={tContent("gallery")}
          desc={tContent("galleryDescription")}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: pathname === "/" ? 6 : 27 }).map((_, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild className="cursor-pointer">
              <div className="overflow-hidden rounded-3xl" key={index}>
                <Image
                  src={`/images/gallery/terelj${index + 1}.jpg`}
                  width={400}
                  height={300}
                  className="w-full h-full"
                  alt={tContent("galleryImageAlt", { index: index + 1 })}
                  key={index}
                />
              </div>
            </DialogTrigger>
            <DialogContent>
              <div className="overflow-hidden rounded-3xl" key={index}>
                <Image
                  src={`/images/gallery/terelj${index + 1}.jpg`}
                  width={400}
                  height={300}
                  className="w-full h-full"
                  alt={tContent("galleryImageAlt", { index: index + 1 })}
                  key={index}
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
