import Image from "next/image";

export default function OfferDetails() {
  return (
    <div className="mt-[30px] mb-[250px] gap-[10px] container">
      <div className="text-center">
        <h1 className="text-[45px] font-semibold">Early Escape</h1>
        <p className="  text-gray-500">Book early and enjoy exclusive rates</p>
      </div>
      <div className="mt-[30px] flex gap-[30px]">
        <Image
          src={"/images/room-2.png"}
          alt="fhdi"
          width={380}
          height={600}
          className=""
        />
        <Image
          src={"/images/food.png"}
          alt="fhdi"
          width={380}
          height={600}
          className=""
        />
        <h2 className="uppercase text-gray-500">Until 01 December 2024</h2>
      </div>
    </div>
  );
}
