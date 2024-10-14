import Image from "@/components/ui/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PaymentPart = () => {
  const FixedTab = ({ src, value }: { src: string; value: string }) => {
    return (
      <TabsTrigger
        value={value}
        className="w-fit bg-transparent data-[state=active]:border data-[state=active]:border-blue-800 data-[state=active]:bg-transparent p-1"
      >
        <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] overflow-hidden rounded-md">
          <Image
            src={src || "/images/payments/golomt.png"}
            width={128}
            height={128}
            quality={100}
            className="w-fit"
          />
        </div>
      </TabsTrigger>
    );
  };

  const payments = [
    { value: "qpay", src: "/images/payments/qpay.png" },
    { value: "golomt", src: "/images/payments/golomt.png" },
    { value: "paypal", src: "/images/payments/paypal.png" },
    { value: "pocket", src: "/images/payments/pocket.png" },
    { value: "socialpay", src: "/images/payments/socialpay.png" },
    { value: "storepay", src: "/images/payments/storepay.png" },
  ];
  return (
    <Tabs defaultValue="qpay" className="md:min-w-[400px] space-y-10">
      <TabsList className="flex justify-start no-scrollbar overflow-x-scroll p-1 gap-2 md:gap-4 h-fit bg-transparent">
        {payments.map((payment, index) => {
          return (
            <FixedTab value={payment.value} src={payment.src} key={index} />
          );
        })}
      </TabsList>
      {/* <TabsContent value="account"> */}
      <div className="w-full md:max-w-[250px]">
        <Image src="/images/qr.png" width={512} height={512} quality={100} className="w-full"/>
      </div>
      {/* </TabsContent> */}
    </Tabs>
  );
};
export default PaymentPart;
