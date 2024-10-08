import Offer from "@/components/offers/offers";
import { pageOffers } from "@/components/offers/offerData";

export default function Off(){
    return (
        <div>
            <Offer offers={pageOffers}  title="Unforgettable experiences await"
      description="Join us for a journey of luxury and relaxation at our stunning locations."/>
        </div>
    )
}