import type { Metadata } from "next";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import MarketingGrowthClient from "./MarketingGrowthClient";

export const metadata: Metadata = {
  title: "Campañas de Marketing Digital & Segmentación Cruzada • Innocentia Tech",
  description:
    "Estrategias de pauta digital especializada, segmentación cruzada de alto valor, captación de prospectos B2B y embudos de venta con WhatsApp API en México.",
  openGraph: {
    title: "Campañas de Marketing Digital & Segmentación Cruzada • Innocentia Tech",
    description:
      "Captación de prospectos calificados, segmentación cruzada y automatización de embudos de venta con Inteligencia Artificial.",
    url: "https://innocentia.tech/marketing",
    images: [{ url: "https://innocentia.tech/images/og_preview.png?v=11" }],
  },
};

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-[#040407] text-[#F3F4F6] selection:bg-[#00D1FF]/30 selection:text-white relative overflow-hidden">
      <Navbar />
      <MarketingGrowthClient />
      <Footer />
    </main>
  );
}
