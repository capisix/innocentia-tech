import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INNOCENTIA.TECH | Laboratorio de Software e Inteligencia Artificial",
  description: "No desarrollamos aplicaciones. Transformamos ideas en experiencias digitales de alto impacto con IA y arquitectura de vanguardia.",
  keywords: ["INNOCENTIA", "IA", "Artificial Intelligence", "Software Studio", "React", "Next.js", "App Development", "Spatial Computing"],
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
