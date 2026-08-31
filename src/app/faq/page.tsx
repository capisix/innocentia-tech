import { Metadata } from "next";
import FAQClient from "../../components/faq/FAQClient";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes & Terminal Interactiva • Innocentia Tech",
  description: "Respuestas directas de Sofía e Iván sobre costos, tiempos de MVP, arquitectura, diseño y viabilidad técnica.",
};

export default function FAQPage() {
  return <FAQClient />;
}
