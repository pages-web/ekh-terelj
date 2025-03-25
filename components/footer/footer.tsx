import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 px-6 py-8 text-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left space-y-10 md:space-y-0 md:space-x-20">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="font-bold text-lg">STAY</h3>
          <ul className="mt-2 space-y-1 text-gray-500">
            <li>Accommodation</li>
            <li>Gallery</li>
            <li>Offers</li>
            <li>Book</li>
          </ul>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center text-center">
          <div className="flex justify-center mb-3">
            <div className="border border-gray-400 p-2">
              <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
            </div>
          </div>
          <p className="px-4">
            Visit one of our 150 hotels worldwide for customizations, fittings &
            styling advice.
          </p>
          <p className="mt-2">info@bestwesternmongolia.mn</p>
          <p className="mb-4">+976 (11) 323162</p>
          <button className="border border-gray-400 px-4 py-2 rounded-full hover:bg-gray-200">
            Contact Us
          </button>
        </div>

        <div className="w-full md:w-1/3 mt-6 md:mt-0">
          <h3 className="font-bold text-lg">EXPERIENCE</h3>
          <ul className="mt-2 space-y-1 text-gray-500">
            <li>Events & Meeting</li>
            <li>Gallery</li>
            <li>Dining</li>
            <li>Spa</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-center">
        <p>&copy; 2024 Best Western Premier Tuushin Hotel</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <span>Instagram</span>
          <span>Facebook</span>
          <span>Youtube</span>
        </div>
      </div>
    </footer>
  );
}
