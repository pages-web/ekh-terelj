import HotelDining from "@/components/dining/dining";

export default function Dining(){
    return(
        <div>
            <HotelDining title="Exclusive Dining Experience" description="Experience the finest dining with a view of the city skyline." buttonNames={["Gourmet", "Buffet", "Cafe", "Room Service"]} images={[
            "/images/image 8.png",
            "/images/image1.png",
            "/images/image 8.png",
            "/images/image1.png",
          ]}/>
        </div>
    )
}