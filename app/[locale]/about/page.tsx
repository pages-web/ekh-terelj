export default function AmanGroupCarousel() {
  return (
    <div className="flex flex-col items-center justify-center my-9 p-6">
      <h1 className="text-[25px] font-semibold text-center">Aman Group</h1>
      <p className="text-gray-600 text-center">
        Unparalleled spaces to celebrate or strategise
      </p>

      <div className="relative w-full max-w-4xl mt-6">
        <div className="relative">
          <img
            src="/images/Rectangle 2.png"
            alt="Aman Group"
            className="w-full rounded-lg"
          />
          <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full">
            &lt;
          </button>
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full">
            &gt;
          </button>
        </div>

        <div className="flex justify-center mt-2 space-x-2">
          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
          <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
        </div>
      </div>

      <div className="mt-6 max-w-4xl flex flex-col md:flex-row text-gray-700 text-justify space-y-4 md:space-y-0 md:space-x-6">
        <p className="w-full md:w-1/2">
          Since its establishment in 1988, Aman Group has strategically evolved,
          transitioning from a collection of intimate retreats into a pioneering
          force across the realms of hospitality, residential development, and
          lifestyle experiences. Over the course of more than three decades, the
          group’s remarkable growth – underpinned by the inimitable reputation
          of Aman – has resulted in an ever-expanding portfolio of 35 hotels and
          resorts in 20 inspiring destinations across the globe.
        </p>
        <p className="w-full md:w-1/2">
          In addition, the group has successfully launched the Aman Essentials
          retail collection, and spirited sibling hotel brand, Janu, further
          enhancing its brand presence. Today, Aman Group’s prominence is
          anchored in its ability to create architecturally inspired
          environments that profoundly enhance the well-being of the body, mind,
          and soul. This is guided by an unwavering dedication to its guests
          whilst reshaping the traditional notions of luxury for a life lived
          better.
        </p>
      </div>
    </div>
  );
}
