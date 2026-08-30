"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "../../lib/motion";
import { Sparkles, ArrowRight } from "../../lib/icons";

interface ParticleIntroProps {
  onComplete: () => void;
}

export default function ParticleIntro({ onComplete }: ParticleIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stageText, setStageText] = useState("INICIALIZANDO SISTEMA...");
  const [isVisible, setIsVisible] = useState(true);

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 500);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Generate ~150 core particles
    const particleCount = 150;
    const particles = Array.from({ length: particleCount }, () => {
      const isRed = Math.random() > 0.5;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      return {
        x: width / 2,
        y: height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        targetX: (Math.random() - 0.5) * (width * 0.6) + width / 2,
        targetY: (Math.random() - 0.5) * 200 + height / 2,
        radius: Math.random() * 2.5 + 1,
        color: isRed ? "#FF4500" : "#00E5FF",
        alpha: Math.random() * 0.7 + 0.3,
      };
    });

    const startTime = Date.now();

    const render = () => {
      const elapsed = (Date.now() - startTime) / 1000;

      ctx.fillStyle = "rgba(7, 7, 7, 0.25)";
      ctx.fillRect(0, 0, width, height);

      // Phase 1: 0 - 2s (Particle Expansion)
      if (elapsed < 2) {
        if (stageText !== "DESPERTANDO ENERGÍA...") setStageText("DESPERTANDO ENERGÍA...");
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.95;
          p.vy *= 0.95;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        });
      }
      // Phase 2: 2 - 4s (Neural Connections & Emblem Formation)
      else if (elapsed < 4.5) {
        if (stageText !== "CONSTRUYENDO INNOCENTIA...") setStageText("CONSTRUYENDO INNOCENTIA...");
        particles.forEach((p, idx) => {
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          p.x += dx * 0.05;
          p.y += dy * 0.05;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();

          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 80) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = idx % 2 === 0 ? "rgba(255, 69, 0, 0.15)" : "rgba(0, 229, 255, 0.15)";
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        });
      }
      // Phase 3: 4.5 - 6s (Flash & Dissolve)
      else if (elapsed <= 6.5) {
        if (stageText !== "BIENVENIDO AL FUTURO") setStageText("BIENVENIDO AL FUTURO");
        const fadeProgress = (elapsed - 4.5) / 2;
        particles.forEach((p) => {
          p.x += (Math.random() - 0.5) * 4;
          p.y -= 2;
          p.alpha = Math.max(0, 1 - fadeProgress);

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        });

        if (elapsed >= 6.2) {
          handleSkip();
          return;
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#070707] flex flex-col items-center justify-center overflow-hidden"
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* Central Logo Overlay */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="relative z-10 flex flex-col items-center pointer-events-none text-center px-4"
          >
            {/* Glowing Orb Header */}
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FF4500] via-[#8A2BE2] to-[#00E5FF] blur-md animate-pulse" />
              <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#070707] border border-white/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#00E5FF] animate-spin" style={{ animationDuration: "12s" }} />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-widest text-white uppercase font-sans">
              INNOCENTIA<span className="text-[#00E5FF]">.TECH</span>
            </h1>
            <p className="mt-3 text-xs md:text-sm tracking-widest text-gray-400 font-mono uppercase">
              {stageText}
            </p>
          </motion.div>

          {/* Skip Intro Button: Clean pill at bottom left (never collides with bottom right chatbot) */}
          <button
            onClick={handleSkip}
            className="absolute bottom-8 left-8 z-50 px-5 py-2.5 rounded-full bg-black/80 border border-white/25 hover:border-[#00E5FF] backdrop-blur-xl text-xs font-mono text-white hover:text-[#00E5FF] flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:scale-105"
          >
            <span>SALTAR INTRO</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00E5FF]" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
