import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />

        {/* Placeholder secțiuni următoare — le construim pe rând */}
        <section id="branduri" className="mx-auto max-w-7xl px-6 lg:px-12 py-24 border-t border-stone-200">
          <p className="eyebrow mb-4">În construcție</p>
          <p className="page-title">Mai jos urmează secțiunile de branduri, produse și formularul de precomandă.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
