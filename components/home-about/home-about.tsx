export default function AboutSection() {
  return (
    <section className="flex flex-col items-center text-center py-12 px-6">
      <a href="/about">
        <button className="border border-gray-400 rounded-full px-4 py-1 text-sm mb-4">
          About
        </button>
      </a>
      <h2 className="text-[20px] font-semibold">Aman New York</h2>
      <p className="text-gray-600 max-w-2xl mt-2">
        East meets West and old meets new. Manhattan’s iconic Crown Building is
        reimagined as Aman New York, where the city’s original architectural
        splendor and Aman’s harmonious design language collide, reimagining the
        inimitable tranquility of Aman in the heart of Manhattan’s midtown. With
        a year-round Garden Terrace, flagship Aman Spa and spacious suites all
        among the largest in the city.
      </p>
      <div className="mt-6 w-full max-w-4xl">
        <div className="relative w-full h-[500px] bg-black rounded-lg overflow-hidden">
          <video className="w-full h-full object-cover" autoPlay loop muted>
            <source src="/your-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
