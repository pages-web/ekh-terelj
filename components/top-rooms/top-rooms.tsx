import ProductCard from "@/components/product-card/product-card";

export default function Rooms() {
  return (
    <div>
      <div className="p-4 w-11/12 mx-auto max-w-[1800px]">
        <h2 className="text-displaysm font-normal mb-4">Top Trending Hotel Rooms Views</h2>
        <p className="text-gray-600 mb-8 text-muted-foreground">A masterclass of sophistication, a stay at Atlantis The Royal delivers extraordinary luxury, unlike anywhere else.</p>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex gap-4 justify-between">
            {Array(4)
              .fill(1)
              .map((_, index) => {
                return <ProductCard key={index} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}