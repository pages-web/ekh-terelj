import HotelDining from "@/components/dining/dining";

export default function Event() {
  return (
    <div>
      <HotelDining
        title="Meetings & Events"
        description="Unparalleled spaces to celebrate or strategise"
        buttonNames={[
          "Business meeting",
          "Celebrations",
          "Weddings",
          "Private Room",
        ]}
        images={[
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/296036479.jpg?k=32e4b4f14e0e60a0b9fc7a28f6f0d9a67a51aa34bfd7d5d8b0b40bf93e38d509&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/177832206.jpg?k=78f7fd82e76b335d6c9b3e9ff8db736ddde7832811f3c0990e1374334c416980&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/177832232.jpg?k=c1144a1b4a54c37b3bc0a1655a75b18e743bb18844987183fb7ac394f46be21d&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/51623188.jpg?k=455465817cddc4ea50f199a8ef1ecea0b5275dcc2ab8894c3449e3f82b2ef15f&o=&hp=1",
        ]}
      />
    </div>
  );
}
