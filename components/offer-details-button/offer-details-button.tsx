import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import PopupProductDetail from "../popup-product-detail/popup-product-detail";
import PopupOfferDetail from "../popup-offer-detail/popup-offer-detail";

const OfferDetailsButton = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} size={"sm"} className="text-textsm">
            Offer details
          </Button>
        </DialogTrigger>
        <DialogContent className="no-scrollbar overflow-y-scroll max-w-[800px] px-0 border-0">
          <PopupOfferDetail />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default OfferDetailsButton;
