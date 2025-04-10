import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 px-6 py-12 text-gray-700">
      <div className="max-w-7xl mx-auto grid gap-[40px] md:grid-cols-3 text-center md:text-left">
        <div>
          <h3 className="font-semibold text-lg mb-4">STAY</h3>
          <ul className="space-y-2 text-gray-500">
            <li>Accommodation</li>
            <li>Gallery</li>
            <li>Offers</li>
            <li>Book</li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-center text-center">
          <div className="mb-4">
            <div className="border border-gray-400 p-2 rounded">
              <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
            </div>
          </div>
          <p className="text-sm text-gray-500 max-w-xs mb-2">
            Visit one of our 150 hotels worldwide for customizations, fittings &
            styling advice.
          </p>
          <p className="text-sm text-gray-600">info@bestwesternmongolia.mn</p>
          <p className="text-sm text-gray-600 mb-4">+976 (11) 323162</p>
          <button className="border border-gray-400 text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition">
            Contact Us
          </button>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">EXPERIENCE</h3>
          <ul className="space-y-2 text-gray-500">
            <li>Events & Meeting</li>
            <li>Gallery</li>
            <li>Dining</li>
            <li>Spa</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-center gap-4">
        <p className="text-gray-500">
          &copy; 2024 Best Western Premier Tuushin Hotel
        </p>
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
    </footer>
  );
}
