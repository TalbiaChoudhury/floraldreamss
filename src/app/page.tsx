// page.tsx

import Hero from "@/components/hero";
import MiddleDivider from "@/components/middlerDivider";
import Navbar from "@/components/navbar";
import ProductList from "@/components/productList";
import FadeInOut from "@/components/fadeInOut";

export default function Home() {
  return (
    <section className="bg-background fade-in w-screen overflow-x-hidden">
      <Navbar />

      <FadeInOut>
        <Hero />
      </FadeInOut>

      <MiddleDivider />
      
      <FadeInOut>
        <ProductList />
      </FadeInOut>

    </section>
  );
}