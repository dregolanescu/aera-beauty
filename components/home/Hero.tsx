import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="max-w-4xl">
          <p className="eyebrow mb-8">AERA Beauty</p>

          <h1 className="hero-title">
            For the love of
            <br />
            <span style={{ fontStyle: "italic" }}>Beauty.</span>
          </h1>

          <p className="page-title mt-4 max-w-3xl">
            Frumusețe curată,
            <br />
            <span style={{ fontStyle: "italic" }}>aleasă cu discernământ.</span>
          </p>

          <p
            className="body-large mt-8 max-w-2xl"
            style={{ color: "var(--color-cocoa-700)" }}
          >
            AERA Beauty aduce în România branduri premium de skincare și
            haircare, selectate pentru formule, texturi și rezultate care
            respectă pielea, părul și ritmul tău.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Button href="#precomanda" variant="primary">
              Precomandă
            </Button>
            <Button href="#branduri" variant="ghost">
              Descoperă brandurile
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
