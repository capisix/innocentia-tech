"use client";

import React, { useEffect, useRef } from "react";

export default function AmbientLivingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Interactive Constellation Star Particles
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2.2 + 0.8,
      color: Math.random() > 0.5 ? "#FF3B5C" : Math.random() > 0.25 ? "#00E5FF" : "#FF8800",
      alpha: Math.random() * 0.7 + 0.3,
    }));

    // Twinkling Sparks
    const sparks = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      maxAlpha: Math.random() * 0.85 + 0.15,
      alpha: 0,
      fadeIn: true,
      color: "#FFFFFF",
      speed: Math.random() * 0.015 + 0.005,
    }));

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.008;

      // 1. Cyber Grid lines (Fixed background overlay)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const step = 55;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Living Light Veins (Soft undulating ambient lines)
      ctx.beginPath();
      const waveY1 = Math.sin(time) * 100 + height * 0.35;
      const waveY2 = Math.cos(time * 0.7) * 120 + height * 0.65;
      ctx.moveTo(0, waveY1);
      ctx.bezierCurveTo(width * 0.35, waveY1 - 70, width * 0.65, waveY2 + 70, width, waveY2);
      ctx.strokeStyle = "rgba(255, 59, 92, 0.08)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, waveY2);
      ctx.bezierCurveTo(width * 0.35, waveY2 + 70, width * 0.65, waveY1 - 70, width, waveY1);
      ctx.strokeStyle = "rgba(0, 229, 255, 0.08)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // 3. Constellation Star Particles & Dynamic Line Connections
      stars.forEach((s, i) => {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.fill();

        // Connect near constellation stars
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const dist = Math.hypot(s.x - s2.x, s.y - s2.y);
          if (dist < 125) {
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.strokeStyle = s.color === "#FF3B5C" ? "rgba(255,59,92,0.12)" : "rgba(0,229,255,0.12)";
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      });

      // 4. Twinkling Sparks
      sparks.forEach((sp) => {
        if (sp.fadeIn) {
          sp.alpha += sp.speed;
          if (sp.alpha >= sp.maxAlpha) sp.fadeIn = false;
        } else {
          sp.alpha -= sp.speed;
          if (sp.alpha <= 0) {
            sp.x = Math.random() * width;
            sp.y = Math.random() * height;
            sp.fadeIn = true;
          }
        }

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.shadowColor = "#00E5FF";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Fixed Fullscreen Canvas */}
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Fixed Ambient Glowing Orbs */}
      <div className="fixed top-[-10%] left-[10%] w-[700px] h-[700px] bg-[#FF3B5C]/12 rounded-full blur-[180px] animate-pulse-glow" />
      <div className="fixed bottom-[-10%] right-[10%] w-[700px] h-[700px] bg-[#00E5FF]/12 rounded-full blur-[180px] animate-pulse-glow" />
    </div>
  );
}
