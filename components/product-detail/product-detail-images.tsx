import Image from "@/components/ui/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const ProductDetailImages = () => {
  const FixedImage = ({
    src,
    defaultSize,
  }: {
    src: string;
    defaultSize: number;
  }) => {
    return (
      <ResizablePanel
        defaultSize={defaultSize}
        className="overflow-hidden rounded-xl flex items-center"
      >
        <Image
          src={src || "/images/image1.png"}
          width={1000}
          height={600}
          quality={100}
        />
      </ResizablePanel>
    );
  };
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg space-x-6"
    >
      <FixedImage defaultSize={50} src="" />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical" className="space-y-6">
          <FixedImage defaultSize={50} src="" />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="horizontal" className="space-x-6">
              <FixedImage defaultSize={50} src="" />
              <FixedImage defaultSize={50} src="" />
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
export default ProductDetailImages;
