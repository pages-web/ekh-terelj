import HotelDining from "@/components/dining/dining";

export default function Event(){
    return <div>
        <HotelDining title="Meetings & Events" description="Unparalleled spaces to celebrate or strategise" buttonNames={["Business meeting", "Celebrations", "Weddings", "Private Room"]      } images={[
            "/images/image 8.png",
            "/images/image1.png",
            "/images/image 8.png",
            "/images/image1.png",
          ]}/>
    </div>
}