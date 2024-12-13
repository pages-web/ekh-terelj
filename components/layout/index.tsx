import { NavbarTop } from "./navbar-top";
import BookingNavbarTop from "./booking-navbar-top";
import BookingNavbarTopContent from "../booking-navbar-top-content/booking-navbar-top-content";
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
