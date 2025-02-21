import HotelDining from "@/components/dining/dining";

export default function Dining() {
  return (
    <div>
      <HotelDining
        title="Exclusive Dining Experience"
        description="Experience the finest dining with a view of the city skyline."
        buttonNames={["Gourmet", "Buffet", "Cafe", "Room Service"]}
        images={[
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/51623188.jpg?k=455465817cddc4ea50f199a8ef1ecea0b5275dcc2ab8894c3449e3f82b2ef15f&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/51622158.jpg?k=0101f2aa4999e44ce31221cdeba9264b9bc85c33c0a064d3b866e9feb2692ca4&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/177832267.jpg?k=fbc3fb574a8a7ccffdd95a37fbf4dff3ebf715d2490fb9f7c518e621737fa1d5&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/51623233.jpg?k=af028a50e0ca09d3293da6198eb0ce11628829f7d1cd046f5e209ab4856e2d13&o=&hp=1",
        ]}
      />
    </div>
  );
}
