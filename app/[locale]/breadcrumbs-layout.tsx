import { PropsWithChildren } from "react";
import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumb/breadcrumb";

type BreadcrumbsLayoutProps = PropsWithChildren & {
  breadcrumbs?: Breadcrumb[];
};

export function BreadcrumbsLayout({
  breadcrumbs = [],
  children,
}: BreadcrumbsLayoutProps) {
  return (
    <>
      <div className="container">
        {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        {children}
      </div>
    </>
  );
}
