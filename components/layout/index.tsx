import { NavbarTop } from "./navbar-top";
import BookingNavbarTop from "./booking-navbar-top";
import BookingNavbarTopContent from "@/features/booking/components/booking-navbar-top-content/booking-navbar-top-content";
import Footer from "../footer/footer";
import CurrentUser from "@/features/auth/components/current-user";
import LanguageButton from "../language-button/language-button";

const DefaultLayout = ({
  children,
  locale,
}: React.PropsWithChildren & { locale: string }) => {
  return (
    <>
      <NavbarTop>
        <LanguageButton locale={locale} />
        <CurrentUser />
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
