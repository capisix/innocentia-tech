"use client";

import React, { useEffect, useRef } from "react";

interface AmbientLivingCanvasProps {
  variant?: "default" | "branding" | "cyan" | "cosmic";
  starCount?: number;
  mouseRadius?: number;
  showVeins?: boolean;
  showGrid?: boolean;
}

export default function AmbientLivingCanvas({
  variant = "default",
  starCount = 140,
  mouseRadius = 180,
  showVeins = true,
  showGrid = true,
}: AmbientLivingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
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

    // Color palettes based on variant
    const paletteMap = {
      default: ["#FF3B5C", "#00E5FF", "#FF8800", "#A855F7", "#FFFFFF"],
      branding: ["#FF3858", "#FF7A00", "#FFD166", "#00E5FF", "#A855F7", "#EC4899", "#FFFFFF"],
      cyan: ["#00E5FF", "#38BDF8", "#818CF8", "#06B6D4", "#FFFFFF"],
      cosmic: ["#A855F7", "#EC4899", "#6366F1", "#00E5FF", "#FFFFFF"],
    };

    const colors = paletteMap[variant] || paletteMap.default;

    // Interactive Star Constellation Particles
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      baseVx: (Math.random() - 0.5) * 0.45,
      baseVy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2.4 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.65 + 0.35,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.03 + 0.01,
    }));

    // Twinkling Sparks
    const sparks = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.8 + 1,
      maxAlpha: Math.random() * 0.85 + 0.2,
      alpha: 0,
      fadeIn: true,
      color: "#FFFFFF",
      speed: Math.random() * 0.015 + 0.005,
    }));

    // Mouse Tracking with smooth interpolation
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      active: false,
      radius: mouseRadius,
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      mouse.active = true;
      if ("touches" in e) {
        if (e.touches.length > 0) {
          mouse.targetX = e.touches[0].clientX;
          mouse.targetY = e.touches[0].clientY;
        }
      } else {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
      }
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchstart", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("touchend", handlePointerLeave);

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.008;

      // Smooth mouse position lag
      if (mouse.active) {
        mouse.vx = mouse.targetX - mouse.prevX;
        mouse.vy = mouse.targetY - mouse.prevY;
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;

        mouse.x += (mouse.targetX - mouse.x) * 0.18;
        mouse.y += (mouse.targetY - mouse.y) * 0.18;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // 1. Subtle Cyber Grid lines (Fixed background overlay)
      if (showGrid) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.022)";
        ctx.lineWidth = 1;
        const step = 60;
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
      }

      // 2. Living Light Veins (Soft undulating ambient lines)
      if (showVeins) {
        const veinColor1 = variant === "branding" ? "rgba(255, 56, 88, 0.08)" : "rgba(255, 59, 92, 0.08)";
        const veinColor2 = variant === "branding" ? "rgba(255, 122, 0, 0.08)" : "rgba(0, 229, 255, 0.08)";

        ctx.beginPath();
        const waveY1 = Math.sin(time) * 110 + height * 0.35;
        const waveY2 = Math.cos(time * 0.7) * 130 + height * 0.65;
        ctx.moveTo(0, waveY1);
        ctx.bezierCurveTo(width * 0.35, waveY1 - 70, width * 0.65, waveY2 + 70, width, waveY2);
        ctx.strokeStyle = veinColor1;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, waveY2);
        ctx.bezierCurveTo(width * 0.35, waveY2 + 70, width * 0.65, waveY1 - 70, width, waveY1);
        ctx.strokeStyle = veinColor2;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 3. Mouse Glowing Pulse Aura
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const auraGradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
        const auraColor = variant === "branding" ? "rgba(255, 56, 88, 0.12)" : "rgba(0, 229, 255, 0.12)";
        auraGradient.addColorStop(0, auraColor);
        auraGradient.addColorStop(0.5, "rgba(255, 122, 0, 0.04)");
        auraGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fillStyle = auraGradient;
        ctx.fill();

        // Little center glowing core at mouse pointer
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = variant === "branding" ? "#FF3858" : "#00E5FF";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Interactive Constellation Star Particles & Dynamic Physics
      stars.forEach((s, i) => {
        // Natural drift
        s.x += s.vx;
        s.y += s.vy;

        // Damping back to base drift velocity
        s.vx += (s.baseVx - s.vx) * 0.05;
        s.vy += (s.baseVy - s.vy) * 0.05;

        // Screen wrap
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        // Pulsing alpha
        s.pulsePhase += s.pulseSpeed;
        const currentAlpha = Math.max(0.15, Math.min(1, s.alpha + Math.sin(s.pulsePhase) * 0.25));

        // Interactive Mouse Physics & Cursor Rays
        if (mouse.active && mouse.x > 0 && mouse.y > 0) {
          const dx = s.x - mouse.x;
          const dy = s.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 0) {
            const factor = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);

            // Gentle repulsion with fluid organic swirl
            const pushStrength = factor * 4.2;
            s.vx += Math.cos(angle) * pushStrength * 0.4;
            s.vy += Math.sin(angle) * pushStrength * 0.4;

            // Draw direct glowing Laser/Ray from mouse cursor to nearby star
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(s.x, s.y);

            const rayAlpha = Math.min(0.85, factor * 0.75);
            ctx.strokeStyle = s.color === "#FFFFFF"
              ? `rgba(255, 255, 255, ${rayAlpha})`
              : s.color.startsWith("#")
              ? `${s.color}${Math.floor(rayAlpha * 255).toString(16).padStart(2, "0")}`
              : `rgba(255, 56, 88, ${rayAlpha})`;
            ctx.lineWidth = factor * 1.6 + 0.4;
            ctx.shadowColor = s.color;
            ctx.shadowBlur = 8;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }

        // Draw Star Node
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        // Connect near constellation stars
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const dist = Math.hypot(s.x - s2.x, s.y - s2.y);
          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.18;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.strokeStyle =
              s.color === "#FF3858" || s.color === "#FF3B5C"
                ? `rgba(255,56,88,${lineAlpha})`
                : s.color === "#FF7A00" || s.color === "#FF8800"
                ? `rgba(255,122,0,${lineAlpha})`
                : `rgba(0,229,255,${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      });

      // 5. Twinkling Sparks
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
        ctx.shadowColor = variant === "branding" ? "#FF7A00" : "#00E5FF";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchstart", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("touchend", handlePointerLeave);
      cancelAnimationFrame(animId);
    };
  }, [variant, starCount, mouseRadius, showVeins, showGrid]);

  const orb1Color = variant === "branding" ? "bg-[#FF3858]/14" : "bg-[#FF3B5C]/12";
  const orb2Color = variant === "branding" ? "bg-[#FF7A00]/14" : "bg-[#00E5FF]/12";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Fixed Fullscreen Interactive Canvas */}
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Fixed Ambient Glowing Orbs */}
      <div
        className={`fixed top-[-10%] left-[10%] w-[750px] h-[750px] ${orb1Color} rounded-full blur-[190px] animate-pulse-glow pointer-events-none`}
      />
      <div
        className={`fixed bottom-[-10%] right-[10%] w-[750px] h-[750px] ${orb2Color} rounded-full blur-[190px] animate-pulse-glow pointer-events-none`}
      />
    </div>
  );
}

