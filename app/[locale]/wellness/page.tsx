import Offer from "@/components/offers/offers";
import { pageWellness } from "@/components/offers/offerData";

export default function Wellness(){
    return <div>
        <Offer offers={pageWellness}  title="Wellness & Spa"
      description="World-class wellness in one of the best spas in Sydney nestled among decades of architectural history"/>
    </div>
}