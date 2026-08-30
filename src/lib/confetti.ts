"use client";

export default function confetti(options?: any) {
  if (typeof window === "undefined") return;
  const count = options?.particleCount || 80;
  const defaults = {
    origin: { y: 0.7 },
  };

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100vw";
  container.style.height = "100vh";
  container.style.pointerEvents = "none";
  container.style.zIndex = "99999";
  document.body.appendChild(container);

  const colors = ["#FF4500", "#00E5FF", "#8A2BE2", "#FFD700", "#FF1493"];

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 8 + 4;
    const startX = (options?.origin?.x ?? 0.5) * window.innerWidth;
    const startY = (options?.origin?.y ?? 0.6) * window.innerHeight;

    particle.style.position = "absolute";
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.opacity = "1";
    particle.style.transition = "transform 1.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.5s ease-out";

    container.appendChild(particle);

    const angle = (Math.random() - 0.5) * Math.PI * 1.5;
    const velocity = Math.random() * 350 + 150;
    const destX = Math.cos(angle) * velocity;
    const destY = Math.sin(angle) * velocity - 200;

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${destX}px, ${destY}px) rotate(${Math.random() * 720}deg)`;
      particle.style.opacity = "0";
    });
  }

  setTimeout(() => {
    container.remove();
  }, 1600);
}
