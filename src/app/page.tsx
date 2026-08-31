"use client";

import React, { useState } from "react";
import AmbientLivingCanvas from "../components/common/AmbientLivingCanvas";
import FloatingChatWidget from "../components/common/FloatingChatWidget";
import ProjectCreationModal from "../components/common/ProjectCreationModal";
import ParticleIntro from "../components/intro/ParticleIntro";
import Navbar from "../components/navbar/Navbar";
import HeroSection from "../components/hero/HeroSection";
import PhilosophySection from "../components/philosophy/PhilosophySection";
import AboutUsSection from "../components/about/AboutUsSection";
import ServicesNeuralNetwork from "../components/services/ServicesNeuralNetwork";
import InteractivePlayground from "../components/playground/InteractivePlayground";
import AIPersonasSection from "../components/ai-personas/AIPersonasSection";
import ProcessTimeline from "../components/process/ProcessTimeline";
import CaseStudiesSection from "../components/cases/CaseStudiesSection";
import FAQSection from "../components/faq/FAQSection";
import TechStackSection from "../components/tech/TechStackSection";
import CommunitySection from "../components/community/CommunitySection";
import PromptCTASection from "../components/cta/PromptCTASection";
import Footer from "../components/footer/Footer";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMaximized, setIsChatMaximized] = useState(false);

  const openProjectModal = () => setIsProjectModalOpen(true);
  const closeProjectModal = () => setIsProjectModalOpen(false);

  const openMaximizedChat = () => {
    setIsChatOpen(true);
    setIsChatMaximized(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setIsChatMaximized(false);
  };

  return (
    <main className="relative min-h-screen bg-[#040407] text-[#F3F4F6] overflow-x-hidden selection:bg-[#00E5FF]/30 selection:text-white">
      {/* Ambient Living Canvas (Partículas, Líneas vivas, Destellos sutiles Apple-style) */}
      <AmbientLivingCanvas />

      {/* 01 Particle Intro */}
      {!introFinished && (
        <ParticleIntro onComplete={() => setIntroFinished(true)} />
      )}

      {/* Floating Navbar */}
      <Navbar onOpenProjectModal={openProjectModal} />

      {/* 02 Hero Section */}
      <HeroSection
        onOpenProjectModal={openProjectModal}
        onOpenChatModal={openMaximizedChat}
      />

      {/* 03 Filosofía & Qué es Innocentia */}
      <PhilosophySection />

      {/* 04 Quiénes Somos / Manifiesto */}
      <AboutUsSection />

      {/* 05 Capacidades & Lo que somos capaces de construir */}
      <ServicesNeuralNetwork onOpenProjectModal={openProjectModal} />

      {/* 06 Interactive Playground (Chatbot Interactivo Sofía & Iván) */}
      <InteractivePlayground onOpenProjectModal={openProjectModal} />

      {/* 07 Sofía & Iván (AI Personas) */}
      <AIPersonasSection />

      {/* 08 Metodología & Pipeline */}
      <ProcessTimeline />

      {/* 09 Casos de Éxito */}
      <CaseStudiesSection
        onOpenProjectModal={openProjectModal}
        onOpenChatModal={openChat}
        onAskSofia={() => {
          setIsChatOpen(true);
          setIsChatMaximized(false);
        }}
        onAskIvan={() => {
          setIsChatOpen(true);
          setIsChatMaximized(false);
        }}
      />

      {/* 10 Preguntas Frecuentes (FAQ Sofía & Iván) */}
      <FAQSection />

      {/* 11 Tecnología & Stack */}
      <TechStackSection />

      {/* 12 Comunidad & Ecosistema */}
      <CommunitySection />

      {/* Prompt CTA Final (Comencemos) */}
      <PromptCTASection onOpenProjectModal={openProjectModal} />

      {/* Footer */}
      <Footer />

      {/* Floating Chatbot Widget ("¿Necesitas ayuda?" con soporte Maximizado) */}
      {introFinished && (
        <FloatingChatWidget
          onOpenProjectModal={openProjectModal}
          isOpenExternal={isChatOpen}
          isMaximizedExternal={isChatMaximized}
          onCloseExternal={closeChat}
        />
      )}

      {/* Ventana Flotante de Creación de Proyecto (Se abre como modal y se cierra al terminar) */}
      <ProjectCreationModal
        isOpen={isProjectModalOpen}
        onClose={closeProjectModal}
      />
    </main>
  );
}
