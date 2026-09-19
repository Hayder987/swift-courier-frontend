import Hero from "@/components/layout/public/Home/Hero/Hero";
import Services from "@/components/layout/public/Home/Services/Services";
import LogisticsShowcase from "@/components/layout/public/Home/Warehouse/logistics-showcase";

export default function HomePage() {
  return (
    <div className="">
      <Hero />
      <Services />
      <LogisticsShowcase />
    </div>
  );
}
