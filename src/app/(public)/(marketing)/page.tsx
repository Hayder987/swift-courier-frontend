import Hero from "@/components/layout/public/Home/Hero/Hero";
import ImageSlider from "@/components/layout/public/Home/ImageSlider/ImageSlider";
import Services from "@/components/layout/public/Home/Services/Services";
import ShipmentTracking from "@/components/layout/public/Home/ShipmentTracking/ShipmentTracking";
import LogisticsShowcase from "@/components/layout/public/Home/Warehouse/logistics-showcase";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20 md:gap-28 lg:gap-36">
      <Hero />
      <Services />
      <LogisticsShowcase />
      <ShipmentTracking />
      <ImageSlider />
    </div>
  );
}
