import ReserveSelectDate from "../reserve-select-date/reserve-select-date";
import Image from "../ui/image";
import { useCmsPosts } from "@/sdk/queries/cms";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Loading } from "../ui/loading";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const HomeBooking = () => {
  const { posts, loading } = useCmsPosts({
    tagIds: ["EiBafCNFaCWnLCvKUajEb"],
    perPage: 1000,
  });

  if (loading) return <Loading />;

  const post = posts[0];
  const images = post?.images || [];

  const title = post?.title || "FOR THOSE WHO WANTED ALL.";

  const splitTitle = (text: string) => {
    const words = text.split(" ");
    const half = Math.ceil(words.length / 2);
    return [words.slice(0, half).join(" "), words.slice(half).join(" ")];
  };

  const [line1, line2] = splitTitle(title);

  return (
    <div>
      <div className="lg:h-[85vh] relative overflow-hidden p-5 lg:p-10 my-10 rounded-3xl">
        <div className="h-full w-full absolute inset-0 z-0">
          {images.length > 0 ? (
            <Swiper
              key={`swiper-${images.length}`}
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={images.length > 1}
              initialSlide={0}
              watchSlidesProgress={true}
              observer={true}
              observeParents={true}
              allowTouchMove={true}
              grabCursor={true}
              className="h-full w-full"
            >
              {images.map((image, index) => (
                <SwiperSlide key={`slide-${index}`} className="swiper-slide">
                  <div className="w-full h-full relative">
                    <Image
                      src={image.url}
                      width={1440}
                      height={920}
                      quality={100}
                      className="h-full w-full object-cover brightness-[.8]"
                      alt={image.name || `Banner slide ${index + 1}`}
                      priority={index === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Image
              src="/images/home.jpg"
              width={1440}
              height={920}
              quality={100}
              className="h-full md:w-full brightness-[.8]"
              alt="Default banner"
            />
          )}
        </div>

        <div className="lg:w-[50%] z-20 space-y-9 relative flex items-end text-center lg:text-start lg:items-center lg:justify-end justify-center h-full">
          <div className="text-white">
            {/* <button className='border border-white rounded-full px-4 py-1 text-sm backdrop-blur-3xl bg-[#EAECF0]/10'>
            Book
          </button> */}
            <h1 className="font-bold text-[35px] md:text-[55px] leading-tight">
              <span>{line1}</span>
              <br />
              <span>{line2}</span>
            </h1>
            <p className="text-md lg:text-lg max-w-xl text-white/80">
              {post?.excerpt ||
                "Find your perfect stay with ease explore a wide range of rooms, grab great deals, and book your ideal getaway today."}
            </p>
          </div>
        </div>
      </div>

      <ReserveSelectDate />
    </div>
  );
};
export default HomeBooking;
