import Link from "next/link";
import { Button } from "../ui/button";
import { NavbarTop } from "./navbar-top";
import { ChevronDownIcon, Search } from "lucide-react";
import { Suspense } from "react";
import LanguageButton from "../language-button/language-button";
import BookingNavbarTop from "./booking-navbar-top";
import BookingNavbarTopContent from "../booking-navbar-top-content/booking-navbar-top-content";
import Menu from "../menu/menu";
import Footer from "../footer/footer";

const DefaultLayout = ({
  children,
  locale,
}: React.PropsWithChildren & { locale: string }) => {
  return (
    <>
      <NavbarTop>
        <LanguageButton locale={locale} />
      </NavbarTop>
      <BookingNavbarTop>
        <BookingNavbarTopContent />
      </BookingNavbarTop>
      {children}
      <Footer />
    </>
  );
};
export default DefaultLayout;
