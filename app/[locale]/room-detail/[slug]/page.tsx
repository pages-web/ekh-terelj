import ProductDetail from "@/components/product-detail/product-detail";
import { BreadcrumbsLayout } from "../../breadcrumbs-layout";
import { type Breadcrumb } from "@/components/breadcrumb/breadcrumb";
import { IPageProps } from "@/types";

const RoomDetail = ({ params }: IPageProps) => {
  const breadcrumbs: Breadcrumb[] = [
    { name: "Hotel", link: "/accommodation" },
    { name: "Room", link: "/accommodation" },
  ];
  return (
    <div className="container min-h-screen py-10">
      <BreadcrumbsLayout
        breadcrumbs={breadcrumbs.concat([
          { name: params.slug, link: `/room-detail/${params.slug}` },
        ])}
      >
        <ProductDetail />
      </BreadcrumbsLayout>
    </div>
  );
};
export default RoomDetail;
