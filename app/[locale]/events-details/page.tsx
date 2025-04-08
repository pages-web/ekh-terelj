export default function EvantsDetail() {
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

      <p className="text-[29px]">Host the perfect event</p>

      <div className="mt-6 max-w-4xl flex flex-col md:flex-row text-gray-700 text-justify space-y-4 md:space-y-0 md:space-x-6">
        <p className="w-full md:w-1/2">
          Set within the historic Crown Building at the corner of Fifth Avenue
          and 57th Street, Aman New York offers the most refined of backdrops
          for any occasion. From intimate private dinners to bustling cocktail
          soirees, every event is imbued with a sense of occasion thanks to the
          allure of the hotel’s captivating design, exclusivity and collection
          of private dining spaces, Spa Houses and gathering places that each
          offer their own unique atmosphere – in the very heart of, yet away
          from the bustle of Midtown Manhattan. ​
        </p>
        <p className="w-full md:w-1/2">
          Where East meets West, the hotel’s restaurants, year-round alfresco
          Garden Terrace, and private dining rooms showcase traditional,
          seasonal Italian dishes and artfully crafted Japanese cuisine – while
          The Jazz Club offers an exclusive gathering space to experience the
          energy of New York paired with the finest performances, cocktails,
          wine, and spirits.  The expansive Aman Spa – including two private Spa
          Houses – offers three floors of dedicated holistic wellbeing and spa
          treatments, perfect for those seeking to incorporate wellness into
          their occasion. 
        </p>
      </div>
    </div>
  );
}
