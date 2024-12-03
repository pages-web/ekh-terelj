import { Button } from "../ui/button";
import { NavbarTop } from "./navbar-top";
import { ChevronDownIcon, Search } from "lucide-react";
import { Suspense } from "react";
import LanguageButton from "../language-button/language-button";
import BookingNavbarTop from "./booking-navbar-top";
import BookingNavbarTopContent from "../booking-navbar-top-content/booking-navbar-top-content";
import Menu from "../menu/menu";
import Footer from "../footer/footer";
import CurrentUser from "@/containers/auth/current-user";
import CheckDealDuration from "./checkDealDuration";

const DefaultLayout = ({
  children,
  locale,
}: React.PropsWithChildren & { locale: string }) => {
  return (
    <>
      <NavbarTop>
        {/* <LanguageButton locale={locale} /> */}
        <CurrentUser />
      </NavbarTop>
      <BookingNavbarTop>
        <BookingNavbarTopContent />
      </BookingNavbarTop>
      <CheckDealDuration />
      {children}
      <Footer />
    </>
  );
};
export default DefaultLayout;
