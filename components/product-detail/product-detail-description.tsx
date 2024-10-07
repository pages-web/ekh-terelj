import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BedDouble,
  CarFront,
  CreditCard,
  House,
  Users,
  Wifi,
} from "lucide-react";
import { PropsWithChildren, ReactNode } from "react";
import IconWithTitle from "../icon-with-title/icon-with-title";

const ProductDetailDescription = () => {
  const Tab = ({ value, children }: PropsWithChildren & { value: string }) => {
    return (
      <TabsTrigger
        value={value}
        className="px-4 py-3 font-bold border data-[state=active]:bg-[#3E4095] data-[state=active]:text-white"
      >
        {children}
      </TabsTrigger>
    );
  };

  const tabs = [
    { value: "overview", children: "Overview" },
    { value: "included", children: "What's included" },
    { value: "faq", children: "FAQ" },
    { value: "policies", children: "Policies" },
  ];
  const facilities = [
    { title: "1 King Bed", icon: <BedDouble className="w-6 h-6" /> },
    { title: "Free WiFi", icon: <Wifi className="w-6 h-6" /> },
    { title: "Free self parking", icon: <CarFront className="w-6 h-6" /> },
    { title: "Sleeps 3", icon: <Users className="w-6 h-6" /> },
    { title: "452 sq ft", icon: <House className="w-6 h-6" /> },
    {
      title: "Reserve now, pay later",
      icon: <CreditCard className="w-6 h-6" />,
    },
  ];
  return (
    <Tabs defaultValue="overview" className="w-[60%] flex flex-col gap-10">
      <TabsList className="bg-transparent flex self-start gap-3">
        {tabs.map((tab, index) => {
          return (
            <Tab value={tab.value} key={index}>
              {tab.children}
            </Tab>
          );
        })}
      </TabsList>
      <TabsContent value="overview" className="space-y-12">
        <div className="flex flex-col gap-6">
          <h3 className="text-displaysm">Overview</h3>
          <p className="line-clamp-4 text-textsm">
            Luxury eco-certified hotel refurbished in 2019 and located near
            Sükhbaatar Square located close to National Academic Theatre of
            Opera and Ballet of Mongolia and The Fine Arts Zanabazar Museum,
            Kempinski Hotel Khan Palace provides a shopping mall on site, a hair
            salon, and dry cleaning/laundry services. Treat yourself to
            reflexology, a manicure/pedicure, or aromatherapy at Kempinski Aster
            Spa, the onsite spa. Enjoy Japanese cuisine and brunch at the two
            onsite restaurants. Stay connected with free in-room WiFi, and
            guests can find other amenities such as a bar and a 24-hour gym.
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="text-displaysm">Room best facilities</h3>
          <div className="grid grid-cols-3 gap-6">
            {facilities.map((facility, index) => {
              return (
                <IconWithTitle
                  title={facility.title}
                  icon={facility.icon}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="included">What's included</TabsContent>
      <TabsContent value="faq">FAQ</TabsContent>
      <TabsContent value="policies">Policies</TabsContent>
    </Tabs>
  );
};
export default ProductDetailDescription;
