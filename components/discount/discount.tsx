import Image from "next/image";

type DiscountCardProps = {
  imageSrc: string;
  imageAlt: string;
  discountPercentage: number;
  title: string;
  validity: string;
  badgeColor: string;
};

const discountData: DiscountCardProps[] = [
  {
    imageSrc: "/images/offer1.png",
    imageAlt: "МАРТ 8",
    discountPercentage: 50,
    title: "МАРТ 8",
    validity:
      "Эрхэм харилцагч эмэгтэйчүүд та бүхэндээ Мартын 8-ны мэндийг хүргэе манай Зочид буудал Мартын 8-ны хүлээн авалт зохион байгуулахад бэлэн боллоо.",
    badgeColor: "bg-white",
  },
  {
    imageSrc: "/images/offer2.png",
    imageAlt: "Discount Card",
    discountPercentage: 35,
    title: "Discount Card",
    validity:
      "Эрхэм хэрэглэгч та манай Зочид буудлын ресторануудаар нийт 201000₮ - өөс дээш үнийн дүнтэй үйлчилгээ авсан тохиолдолд таны тооцооны хуудсын үндэслэн тухайн үедээ хөнгөлөлтийн картыг шууд нээлгэх боломжтой.Карт нээлгэхэд юу шаардлагатай вэ?Карт нээлгэхэд шаардлагтай мэдээллийг бүрэн зөв бөглөхКарт эзэмшихэд үүссэн ...",
    badgeColor: "bg-green-500",
  },
];

const DiscountCard: React.FC<DiscountCardProps> = ({
  imageSrc,
  imageAlt,
  discountPercentage,
  title,
  validity,
  badgeColor,
}) => (
  <div className="flex-1 relative rounded-lg overflow-hidden max-h-[330px]">
    <Image
      src={imageSrc}
      alt={imageAlt}
      width={648}
      height={330}
      className="w-full h-auto"
    />
    <div className="absolute inset-0 bg-opacity-40 p-4 flex flex-col justify-between">
      <div>
        {/* <span
          className={`bg-opacity-15 bg-white backdrop-blur-2xl text-white px-2 py-1 rounded-full text-textxs ${badgeColor}`}
        >
          {validity}
        </span> */}
        <h3 className="text-white text-textmd lg:text-displayxs font-semibold">
          {title}
        </h3>
      </div>
      <div>
        {/* <span className="text-white text-textxl lg:text-displayxl font-bold">
          {discountPercentage}%
        </span> */}
        <p className="text-white text-textsm bg-black/40 py-2 px-4 rounded-lg">
          {validity}
        </p>
      </div>
    </div>
  </div>
);

export default function Discount() {
  return (
    <div className="container">
      <h2 className="text-displaysm  font-normal mb-4">Our special offers</h2>
      <div className="lg:flex flex flex-col lg:flex-row gap-8">
        {discountData.map((discount, index) => (
          <DiscountCard key={index} {...discount} />
        ))}
      </div>
    </div>
  );
}
