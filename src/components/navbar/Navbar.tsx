"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Globe, Menu, X, ArrowRight } from "../../lib/icons";

interface NavbarProps {
  onOpenProjectModal?: () => void;
}

export default function Navbar({ onOpenProjectModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Inicio");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#hero" },
    { name: "Filosofía", href: "#filosofia" },
    { name: "Capacidades", href: "#servicios" },
    { name: "Proyectos", href: "#proyectos" },
    { name: "Laboratorio", href: "#playground" },
    { name: "Identidad", href: "#ai-personas" },
    { name: "Preguntas", href: "/faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#040407]/90 backdrop-blur-2xl border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Official Innocentia Logo */}
        <a href="#hero" className="flex items-center group cursor-pointer">
          <img
            src="/images/logo_official_header.png?v=2"
            alt="INNOCENTIA"
            className="h-10 sm:h-12 w-auto max-w-[200px] sm:max-w-[240px] object-contain filter drop-shadow-[0_0_12px_rgba(255,56,88,0.4)] group-hover:scale-105 transition-transform duration-300"
          />
        </a>

        {/* Clean Navigation Menu (Single Line, No Awkward Wrap) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => {
            const isActive = activeLink === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveLink(link.name)}
                className={`relative text-xs sm:text-sm font-medium transition-all tracking-wide py-1.5 whitespace-nowrap ${
                  isActive ? "text-white font-bold drop-shadow-[0_0_10px_#FF3858]" : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF3858] to-[#FF7A00] rounded-full shadow-[0_0_10px_#FF3858]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA Button "Crear Proyecto" & "Portal" */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="/portal"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/15 hover:border-[#00D1FF]/60 text-xs font-bold text-gray-200 hover:text-white uppercase transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Portal</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-pulse" />
          </a>

          <button
            onClick={onOpenProjectModal}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FF3858] to-[#FF7A00] hover:from-[#FF4D6D] hover:to-[#FF8800] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(255,56,88,0.4)] hover:scale-105 cursor-pointer"
          >
            <span>Crear Proyecto</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-xs font-semibold text-gray-300">
            <Globe className="w-3.5 h-3.5 text-[#00D1FF]" />
            <span>ES</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href="/portal"
            className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white uppercase"
          >
            Portal
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07070D]/95 border-b border-white/10 p-6 space-y-4 backdrop-blur-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.name);
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-semibold text-gray-300 hover:text-white py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectModal?.();
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#FF3858] to-[#FF7A00] text-white font-bold text-xs uppercase flex items-center justify-center gap-2"
            >
              <span>Crear Proyecto</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
