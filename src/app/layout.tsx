import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import FloatingChatWidget from "../components/common/FloatingChatWidget";

export const metadata: Metadata = {
  title: "Innocentia Tech • Desarrollo de Software, Apps Móviles e IA en México",
  description: "Laboratorio de ingeniería de software de alto impacto. Creamos aplicaciones móviles iOS/Android, plataformas web SaaS a medida y agentes de Inteligencia Artificial en México.",
  metadataBase: new URL("https://innocentia.tech"),
  alternates: {
    canonical: "https://innocentia.tech",
  },
  authors: [{ name: "Innocentia Tech", url: "https://innocentia.tech" }],
  openGraph: {
    title: "Innocentia Tech • Desarrollo de Software, Apps Móviles e IA en México",
    description: "Donde la imaginación se convierte en tecnología. Apps móviles nativas, plataformas web SaaS de alta escala y agentes inteligentes.",
    url: "https://innocentia.tech",
    siteName: "Innocentia Tech",
    images: [
      {
        url: "https://innocentia.tech/images/og_preview.png?v=11",
        secureUrl: "https://innocentia.tech/images/og_preview.png?v=11",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Innocentia Tech - Desarrollo de Software, Apps Móviles e Inteligencia Artificial",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Innocentia Tech • Desarrollo de Software, Apps Móviles e IA",
    description: "Ingeniería de software a medida, apps móviles fluidas a 60 FPS y soluciones con Inteligencia Artificial.",
    images: ["https://innocentia.tech/images/og_preview.png?v=11"],
  },
  icons: {
    icon: [
      { url: "/images/favicon_transparent.png?v=12", type: "image/png" },
      { url: "/favicon.ico?v=12" },
    ],
    shortcut: "/images/favicon_transparent.png?v=12",
    apple: "/apple-icon.png?v=12",
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
        
        {/* Favicon Transparente Oficial */}
        <link rel="icon" type="image/png" href="/images/favicon_transparent.png?v=12" />
        <link rel="shortcut icon" href="/favicon.ico?v=12" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=12" />

        {/* OpenGraph & Social Preview Fallbacks (Fondo Blanco Oficial para WhatsApp/Redes) */}
        <meta property="og:title" content="Innocentia Tech • Laboratorio de Software & IA" />
        <meta property="og:description" content="Donde la imaginación se convierte en tecnología. Apps móviles, desarrollo web de alta escala y soluciones con IA." />
        <meta property="og:image" content="https://innocentia.tech/images/og_preview.png?v=11" />
        <meta property="og:image:secure_url" content="https://innocentia.tech/images/og_preview.png?v=11" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Innocentia Tech" />
        <meta property="og:url" content="https://innocentia.tech" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://innocentia.tech/images/og_preview.png?v=11" />

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

        {/* Schema.org Structured Data (JSON-LD) para Google & SEO Local */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://innocentia.tech/#organization",
                  "name": "Innocentia Tech",
                  "legalName": "Innocentia Tech Core",
                  "url": "https://innocentia.tech",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://innocentia.tech/images/innocentia_logo_official.png",
                    "width": "512",
                    "height": "512",
                  },
                  "description":
                    "Laboratorio de ingeniería de software, desarrollo de aplicaciones móviles iOS/Android, plataformas web SaaS y agentes de Inteligencia Artificial.",
                  "contactPoint": [
                    {
                      "@type": "ContactPoint",
                      "telephone": "+52-960-177-1556",
                      "contactType": "sales",
                      "areaServed": ["MX", "US", "LATAM"],
                      "availableLanguage": ["Spanish", "English"],
                    },
                    {
                      "@type": "ContactPoint",
                      "email": "contacto@innocentia.tech",
                      "contactType": "customer service",
                    },
                  ],
                  "sameAs": ["https://wa.me/529601771556"],
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://innocentia.tech/#localbusiness",
                  "name": "Innocentia Tech • Desarrollo de Software e IA en Mérida Yucatán",
                  "image": "https://innocentia.tech/images/og_preview.png?v=11",
                  "url": "https://innocentia.tech",
                  "telephone": "+529601771556",
                  "priceRange": "$$$",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Mérida",
                    "addressRegion": "Yucatán",
                    "postalCode": "97000",
                    "addressCountry": "MX",
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 20.9674,
                    "longitude": -89.5926,
                  },
                  "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ],
                    "opens": "09:00",
                    "closes": "20:00",
                  },
                  "areaServed": [
                    "Mérida",
                    "Yucatán",
                    "Riviera Maya",
                    "Cancún",
                    "Quintana Roo",
                    "México",
                    "Estados Unidos",
                    "Latinoamérica",
                  ],
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Servicios de Software e IA",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Desarrollo de Aplicaciones Móviles iOS & Android",
                          "description":
                            "Creación de apps nativas e híbridas con rendimiento a 60 FPS, pasarelas de pago y notificaciones push.",
                        },
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Desarrollo Web y Plataformas SaaS",
                          "description":
                            "Arquitectura en Next.js 15, bases de datos PostgreSQL multi-tenant y microservicios serverless.",
                        },
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Agentes y Soluciones de Inteligencia Artificial",
                          "description":
                            "Implementación de LLMs, automatizaciones con IA y procesamiento de datos en tiempo real.",
                        },
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Cotizadores en Tiempo Real y Paneles de Control",
                          "description":
                            "Sistemas interactivos para cálculo de m2, presupuestos automáticos en PDF y sincronización con WhatsApp.",
                        },
                      },
                    ],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://innocentia.tech/#website",
                  "url": "https://innocentia.tech",
                  "name": "Innocentia Tech",
                  "publisher": {
                    "@id": "https://innocentia.tech/#organization",
                  },
                  "inLanguage": "es-MX",
                },
              ],
            }),
          }}
        />

        {/* Google tag (gtag.js) - Google Analytics 4 Oficial */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-N2Q3NC7MZ2"
        />
        <Script
          id="google-analytics-ga4"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-N2Q3NC7MZ2', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className="bg-[#040407] text-[#F3F4F6] antialiased selection:bg-[#00E5FF]/30 selection:text-white min-h-screen relative">
        {children}
        <FloatingChatWidget />
      </body>
    </html>
  );
}
