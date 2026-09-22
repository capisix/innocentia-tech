import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import BrandingStudioClient from "./BrandingStudioClient";

export const metadata: Metadata = {
  title: "Estudio de Branding e Identidad Visual • Sofía | Innocentia Tech",
  description:
    "Diseño de logotipos vectoriales, manuales de identidad corporativa, psicología cromática y diseño de marca de alto impacto por Sofía en Innocentia Tech México.",
  openGraph: {
    title: "Estudio de Branding e Identidad Visual • Sofía | Innocentia Tech",
    description:
      "Donde la imaginación se convierte en identidad. Logotipos vectoriales, manuales de marca y diseño de experiencias memorables.",
    url: "https://innocentia.tech/branding",
    images: [{ url: "https://innocentia.tech/images/og_preview.png?v=11" }],
  },
};

export default function BrandingPage() {
  return (
    <main className="min-h-screen bg-[#040407] text-[#F3F4F6] selection:bg-[#FF3858]/30 selection:text-white relative overflow-hidden">
      <Navbar />
      <BrandingStudioClient />
      <Footer />
    </main>
  );
}
