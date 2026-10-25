import { ContactModal } from "@/components/contact-modal";
import { Hero } from "@/components/hero";
import { Location } from "@/components/location";
import { PropertyCatalog } from "@/components/property-catalog";
import { Reviews } from "@/components/reviews";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <PropertyCatalog />
      <Reviews />
      <Location />
      <SiteFooter />
      <ContactModal />
    </main>
  );
}
