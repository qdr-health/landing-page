import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Hero } from "@/components/sections/hero";
import { ProductIntro } from "@/components/sections/product-intro";
import { Partners } from "@/components/sections/partners";
import { Team } from "@/components/sections/team";
import { Mission } from "@/components/sections/mission";

export default function Home() {
  return (
    <>
      <Header />
      <SidebarNav />
      <main className="mx-auto max-w-4xl px-6">
        <Hero />
        <ProductIntro />
        <Partners />
        <Team />
        <Mission />
      </main>
      <Footer />
    </>
  );
}
