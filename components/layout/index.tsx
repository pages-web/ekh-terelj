import Link from "next/link";
import { Button } from "../ui/button";
import { NavbarTop } from "./navbar-top";
import { ChevronDownIcon, Search } from "lucide-react";
import { Suspense } from "react";
import LanguageButton from "../language-button/language-button";

const DefaultLayout = ({
  children,
  locale,
}: React.PropsWithChildren & { locale: string }) => {
  return (
    <>
      <NavbarTop>
        <LanguageButton locale={locale} />
      </NavbarTop>
      {children}
    </>
  );
};
export default DefaultLayout;
