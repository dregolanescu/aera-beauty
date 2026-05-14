import { Button } from "@/components/ui/Button";
import { ShaderBackground } from "./ShaderBackground";

export function Hero() {
  return (
    <ShaderBackground>
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-28 pb-32 md:pt-40 md:pb-48">
        <div className="max-w-5xl">
          <h1 className="hero-title">For the love of Beauty</h1>

          <p
            className="section-title mt-6 md:mt-8 max-w-3xl"
            style={{ fontStyle: "italic", color: "var(--color-cocoa-700)" }}
          >
            Frumusețe curată, aleasă cu discernământ
          </p>

          <p
            className="body-large mt-10 md:mt-12 max-w-2xl"
            style={{ color: "var(--color-cocoa-700)" }}
          >
            AERA Beauty aduce în România branduri premium de skincare și
            haircare, selectate pentru formule, texturi și rezultate care
            respectă pielea, părul și ritmul tău.
          </p>

          <div className="mt-14 md:mt-16 flex flex-col sm:flex-row gap-4">
            <Button href="#precomanda" variant="primary">
              Precomandă
            </Button>
            <Button href="#branduri" variant="ghost">
              Descoperă brandurile
            </Button>
          </div>
        </div>
      </div>
    </ShaderBackground>
  );
}
