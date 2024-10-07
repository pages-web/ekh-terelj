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
    imageSrc: "/images/Rectangle 6.png",
    imageAlt: "Hotel reception",
    discountPercentage: 50,
    title: "Get Extra Discount at Azure Oasis Hotel",
    validity: "Valid only on 14 Jan - 20 Jan 2024",
    badgeColor: "bg-white",
  },
  {
    imageSrc: "/images/Rectangle 6.png",
    imageAlt: "Person using smartphone",
    discountPercentage: 35,
    title: "Exclusive Deals Just for you",
    validity: "Valid only on 14 Jan - 20 Jan 2024",
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
  <div className="flex-1 relative rounded-lg overflow-hidden">
    <Image
      src={imageSrc}
      alt={imageAlt}
      width={648}
      height={330}
      className="w-full h-auto"
    />
    <div className="absolute inset-0 bg-opacity-40 p-4 flex flex-col justify-between">
      <div>
        <span
          className={`bg-opacity-15 bg-white backdrop-blur-2xl text-white px-2 py-1 rounded-full text-textxs ${badgeColor}`}
        >
          {validity}
        </span>
        <h3 className="text-white text-displayxs font-semibold mt-2">{title}</h3>
      </div>
      <div>
        <span className="text-white text-displayxl font-bold">{discountPercentage}%</span>
        <p className="text-white text-textsm">*with Terms and Condition</p>
      </div>
    </div>
  </div>
);

export default function Discount() {
  return (
    <div className="p-4 w-11/12 mx-auto max-w-[1800px] ">
      <h2 className="text-displaysm font-normal mb-4">Exclusive deals just for you!</h2>
      <div className="lg:flex flex flex-col lg:flex-row gap-8">
        {discountData.map((discount, index) => (
          <DiscountCard key={index} {...discount} />
        ))}
      </div>
    </div>
  );
}