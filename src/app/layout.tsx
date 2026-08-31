import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INNOCENTIA.TECH | Laboratorio de Software e Inteligencia Artificial",
  description: "Donde la imaginación se convierte en tecnología. Creamos aplicaciones móviles, SaaS escalable y arquitecturas con agentes de Inteligencia Artificial.",
  metadataBase: new URL("https://innocentia.tech"),
  alternates: {
    canonical: "https://innocentia.tech",
  },
  keywords: [
    "INNOCENTIA",
    "Innocentia Tech",
    "Laboratorio de Software",
    "Desarrollo de Apps",
    "Inteligencia Artificial",
    "Next.js 15",
    "Diseño UX",
    "Sofía e Iván",
  ],
  authors: [{ name: "Innocentia Tech", url: "https://innocentia.tech" }],
  openGraph: {
    title: "INNOCENTIA.TECH | Donde la Imaginación se Convierte en Tecnología",
    description: "Laboratorio de software, aplicaciones móviles, desarrollo web de alta escala e integración de agentes de Inteligencia Artificial.",
    url: "https://innocentia.tech",
    siteName: "Innocentia Tech",
    images: [
      {
        url: "https://innocentia.tech/images/og_preview.png",
        width: 1200,
        height: 630,
        alt: "Innocentia Tech - Laboratorio de Software e Inteligencia Artificial",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INNOCENTIA.TECH | Software & Inteligencia Artificial",
    description: "Donde la imaginación se convierte en tecnología. Apps móviles, SaaS y agentes inteligentes.",
    images: ["https://innocentia.tech/images/og_preview.png"],
  },
  icons: {
    icon: "/images/logo_official_header.png",
    shortcut: "/images/logo_official_header.png",
    apple: "/images/logo_official_header.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* OpenGraph & Social Preview Fallbacks */}
        <meta property="og:title" content="INNOCENTIA.TECH | Donde la Imaginación se Convierte en Tecnología" />
        <meta property="og:description" content="Laboratorio de software, aplicaciones móviles y agentes de Inteligencia Artificial." />
        <meta property="og:image" content="https://innocentia.tech/images/og_preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://innocentia.tech" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://innocentia.tech/images/og_preview.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&family=Outfit:wght@400;600;800;900&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet" />
        
        {/* Standalone Tailwind Engine for Instant 100% Reliable Render */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: 'class',
                theme: {
                  extend: {
                    colors: {
                      sofia: {
                        orange: '#FF3B5C',
                        warm: '#FF8800'
                      },
                      ivan: {
                        blue: '#00E5FF',
                        purple: '#8A2BE2'
                      }
                    }
                  }
                }
              }
            `,
          }}
        />
        <link rel="stylesheet" href="/tailwind.css" />
      </head>
      <body className="bg-[#040407] text-[#F3F4F6] antialiased selection:bg-[#00E5FF]/30 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
