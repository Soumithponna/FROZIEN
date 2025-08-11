import { Hero } from "@/components/hero/hero";
import { Flavours } from "@/components/flavours/flavours";
import { WhyWeExist } from "@/components/why-we-exist/why-we-exist";
import { LayerAdvantage } from "@/components/layer-advantage/layer-advantage";
// import { Benefits } from "@/components/benefits/benefits";
import { DesignedToBeSeen } from "@/components/designed-to-be-seen/designed-to-be-seen";
import { Protein } from "@/components/protein/protein";

export default function Home() {
  return (
    <div className="font-sans">
      <div id="top" />
      <Hero />
      <section id="protein"><Protein gramsPerCup={15} /></section>

      <section id="flavours"><Flavours /></section>
      <section id="why"><WhyWeExist items={[{ num: "2", label: "Founders" }, { num: "100+", label: "Recipes" }, { num: "1", label: "Formula" }]} /></section>
      <section id="layers"><LayerAdvantage /></section>
      {/* <section id="benefits"><Benefits /></section> */}
      <DesignedToBeSeen />
      {/* <StickyOrderDock /> */}

    </div>
  );
}
