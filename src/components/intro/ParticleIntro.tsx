"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "../../lib/motion";
import { Sparkles, ArrowRight, Volume2, VolumeX } from "../../lib/icons";

interface ParticleIntroProps {
  onComplete: () => void;
}

export default function ParticleIntro({ onComplete }: ParticleIntroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 600);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hasCompleted = false;

    const doComplete = () => {
      if (hasCompleted) return;
      hasCompleted = true;
      try {
        sessionStorage.setItem("innocentia_intro_viewed", "true");
      } catch (e) {}
      setIsVisible(false);
      setTimeout(onComplete, 600);
    };

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
        // If within 0.3s of the end, trigger completion smoothly
        if (video.currentTime >= video.duration - 0.3) {
          doComplete();
        }
      }
    };

    const handleEnded = () => {
      doComplete();
    };

    const handleLoadedMetadata = () => {
      if (video.duration && isFinite(video.duration)) {
        // Safety watchdog timer: force complete 0.5s after natural duration
        setTimeout(doComplete, (video.duration + 0.5) * 1000);
      }
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Attempt auto-play
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });

    // Fast fallback: If video data hasn't loaded within 1.8s, skip immediately
    const fastBufferFallback = setTimeout(() => {
      if (!isVideoLoaded) {
        doComplete();
      }
    }, 1800);

    // Fallback maximum safety timeout in case video event stalls
    const maxSafetyTimeout = setTimeout(doComplete, 7500);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      clearTimeout(fastBufferFallback);
      clearTimeout(maxSafetyTimeout);
    };
  }, [onComplete, isVideoLoaded]);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#040407] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#040407] via-transparent to-[#040407]/80 z-10 pointer-events-none" />

          {/* Cinematic Fullscreen Video */}
          <video
            ref={videoRef}
            src="/videos/innocentia_intro.mp4"
            autoPlay
            playsInline
            muted={isMuted}
            preload="metadata"
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Top Header Watermark Badge */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl pointer-events-none shadow-xl">
            <img
              src="/images/favicon_transparent.png"
              alt="Innocentia"
              className="w-4 h-4 object-contain animate-pulse"
            />
            <span className="text-[10px] font-mono font-bold tracking-widest text-gray-300 uppercase">
              INNOCENTIA TECH • OFFICIAL INTRO
            </span>
          </div>

          {/* Audio Toggle Control (Top Right) */}
          <button
            type="button"
            onClick={toggleMute}
            className="absolute top-6 right-6 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 hover:border-[#00D1FF] backdrop-blur-xl text-white transition-all cursor-pointer shadow-xl hover:scale-105"
            title={isMuted ? "Activar Sonido" : "Silenciar"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-gray-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#00D1FF] animate-pulse" />
            )}
          </button>

          {/* Bottom Controls Bar */}
          <div className="absolute bottom-8 left-8 right-8 z-20 flex items-center justify-between gap-4">
            {/* Progress Bar Container */}
            <div className="hidden sm:flex items-center gap-3 flex-1 max-w-md bg-black/50 border border-white/10 p-2 rounded-full backdrop-blur-xl">
              <span className="text-[9px] font-mono text-gray-400 pl-2">EXPERIENCIA INICIAL</span>
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FF3858] via-purple-500 to-[#00D1FF] rounded-full transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Skip Intro Button */}
            <button
              onClick={handleSkip}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 hover:border-[#00D1FF] backdrop-blur-2xl text-xs font-mono font-bold text-white hover:text-[#00D1FF] flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_25px_rgba(0,0,0,0.9)] hover:scale-105 active:scale-95 ml-auto"
            >
              <span>SALTAR INTRO</span>
              <ArrowRight className="w-4 h-4 text-[#00D1FF]" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

