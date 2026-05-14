import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { BrandShowcase } from "@/components/home/BrandShowcase";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <Philosophy />
        <BrandShowcase />
      </main>
      <Footer />
    </>
  );
}
