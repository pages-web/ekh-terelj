import Image from "next/image";

const rooms = [
  {
    id: 1,
    name: "Riverside Terrace Suite",
    price: 200,
    rating: 4.7,
    reviews: 2578,
    image: "/images/product.png",
    amenities: [
      "Free parking",
      "Pool",
      "Key card",
      "Free WiFi",
      "Housekeeping",
    ],
  },
  {
    id: 2,
    name: "Riverside Terrace Suite",
    price: 200,
    rating: 4.7,
    reviews: 2578,
    image: "/images/product.png",
    amenities: [
      "Free parking",
      "Pool",
      "Key card",
      "Free WiFi",
      "Housekeeping",
    ],
  },
  {
    id: 3,
    name: "Riverside Terrace Suite",
    price: 200,
    rating: 4.7,
    reviews: 2578,
    image: "/images/product.png",
    amenities: [
      "Free parking",
      "Pool",
      "Key card",
      "Free WiFi",
      "Housekeeping",
    ],
  },
  {
    id: 4,
    name: "Riverside Terrace Suite",
    price: 200,
    rating: 4.7,
    reviews: 2578,
    image: "/images/product.png",
    amenities: [
      "Free parking",
      "Pool",
      "Key card",
      "Free WiFi",
      "Housekeeping",
    ],
  },
  {
    id: 5,
    name: "Riverside Terrace Suite",
    price: 200,
    rating: 4.7,
    reviews: 2578,
    image: "/images/product.png",
    amenities: [
      "Free parking",
      "Pool",
      "Key card",
      "Free WiFi",
      "Housekeeping",
    ],
  },
  {
    id: 6,
    name: "Riverside Terrace Suite",
    price: 200,
    rating: 4.7,
    reviews: 2578,
    image: "/images/product.png",
    amenities: [
      "Free parking",
      "Pool",
      "Key card",
      "Free WiFi",
      "Housekeeping",
    ],
  },
];

export default function Accommodation() {
  return (
    <div className="p-10 bg-gray-100 container min-h-screen">
      <h1 className="text-[30px] font-bold text-center mb-4">
        Recommended Rooms and Suites
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mx-auto">
        Floor-to-ceiling windows unlock sublime views from all 202 rooms and
        suites, each highlighted by sophisticated décor with Chinoiserie
        touches.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[500px]"
          >
            <div className="relative h-[280px]">
              <Image
                src={room.image}
                fill
                className="object-cover"
                alt={room.name}
              />
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow">
              <h2 className="text-xl font-semibold">{room.name}</h2>
              <p className="text-gray-600">
                {room.rating} ⭐ ({room.reviews} Reviews)
              </p>
              <p className="text-lg font-bold mt-2">
                ${room.price}{" "}
                <span className="text-sm text-gray-500">per night</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {room.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-200 px-2 py-1 rounded"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
