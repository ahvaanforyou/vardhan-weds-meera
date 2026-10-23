"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { weddingConfig } from "@/data/wedding-data";
import { ToranHeader } from "../traditional/ToranHeader";
import { BrassDiya } from "../traditional/BrassDiya";
import { CornerOrnament } from "../traditional/OrnamentalBorders";
import { TempleBell } from "../traditional/TempleBell";
import { Sparkles } from "lucide-react";

interface InvitationCoverProps {
  isOpen: boolean;
  onOpen: () => void;
  onStartMusic?: () => void;
}

export const InvitationCover: React.FC<InvitationCoverProps> = ({
  isOpen,
  onOpen,
  onStartMusic,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    openButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const keepFocusInDialog = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();
      openButtonRef.current?.focus();
    }
  };

  const handleOpenClick = () => {
    if (isOpening) return;

    // Ask the persistent audio element to play as the first action in the
    // trusted click handler, before starting the invitation transition.
    try {
      onStartMusic?.();
    } catch {
      // Music is optional; the invitation should still open if audio fails.
    }

    setIsOpening(true);
    if (prefersReducedMotion) {
      onOpen();
    } else {
      window.setTimeout(() => onOpen(), 700);
    }
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: prefersReducedMotion ? 0.01 : 0.8, ease: "easeInOut" } }}
          role="dialog"
          aria-modal="true"
          aria-label="Wedding invitation opening"
          onKeyDown={keepFocusInDialog}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B050E]/90 backdrop-blur-md p-3 sm:p-6 overflow-y-auto overscroll-contain perspective-2000"
        >
          {/* Subtle Ambient Glow behind card */}
          <div className="absolute w-[80vw] h-[80vh] max-w-2xl max-h-[800px] bg-[#8B1E2D]/40 rounded-full blur-3xl pointer-events-none" />

          {/* Traditional Card Container */}
          <motion.div
            initial={{ scale: prefersReducedMotion ? 1 : 0.95, opacity: 1, y: prefersReducedMotion ? 0 : 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : {
              scale: 1.08,
              opacity: 0,
              rotateX: 10,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" }}
            className="relative w-full max-w-lg max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] flex flex-col rounded-2xl shadow-2xl overflow-hidden border-2 border-[#C9A45C] bg-gradient-to-b from-[#6D1429] via-[#520C1C] to-[#3B0713] text-[#FFF8E9] select-none"
          >
            {/* Silk cloth texture effect & border inlays */}
            <div className="absolute inset-2 sm:inset-3 border border-[#E3C98A]/50 rounded-xl pointer-events-none" />
            <div className="absolute inset-3 sm:inset-4 border border-dashed border-[#C9A45C]/30 rounded-lg pointer-events-none" />

            {/* Antique Gold Corner Ornaments */}
            <CornerOrnament position="top-left" size={54} color="#C9A45C" />
            <CornerOrnament position="top-right" size={54} color="#C9A45C" />
            <CornerOrnament position="bottom-left" size={54} color="#C9A45C" />
            <CornerOrnament position="bottom-right" size={54} color="#C9A45C" />

            {/* Hanging South Indian Temple Bells on Corners */}
            <div className="absolute top-0 left-12 hidden sm:block z-20">
              <TempleBell size={28} chainLength={25} />
            </div>
            <div className="absolute top-0 right-12 hidden sm:block z-20">
              <TempleBell size={28} chainLength={25} />
            </div>

            {/* Top Mango Leaf Toran */}
            <div className="relative z-20 w-full shrink-0 pt-1">
              <ToranHeader leafCount={7} />
            </div>

            {/* Central Invitation Card Body */}
            <div className="relative z-10 min-h-0 flex-[1_1_auto] overflow-y-auto overscroll-contain px-5 sm:px-8 py-2 sm:py-3 flex flex-col items-center justify-center text-center">
              <Image
                src="/images/ganesha-emblem.png"
                alt="Golden Ganesha emblem"
                width={1276}
                height={1233}
                priority
                unoptimized
                draggable={false}
                className="mb-4 h-auto w-[clamp(3rem,7vw,4rem)] shrink-0 object-contain"
              />

              {/* Sacred Sanskrit / Telugu Ganesha Invocation */}
              <div className="mb-2">
                <p className="font-serif-royal text-base sm:text-lg tracking-widest text-[#E3C98A] font-semibold drop-shadow-sm">
                  {weddingConfig.shlokas.sanskritGanesha}
                </p>
                <p className="font-telugu text-sm sm:text-base text-[#FFE5A3] mt-0.5 opacity-90">
                  {weddingConfig.shlokas.teluguGanesha}
                </p>
              </div>

              {/* Blessings line */}
              <p className="text-xs sm:text-sm tracking-wider uppercase text-[#E3C98A]/90 font-light mt-1 mb-2">
                With the blessings of our families
              </p>

              {/* Decorative separator line */}
              <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent my-1" />

              <p className="text-[11px] sm:text-xs tracking-widest uppercase text-[#FFF8E9]/80 font-medium my-1">
                You are cordially invited to celebrate the wedding of
              </p>

              {/* Couple Names - Strongest visual elements */}
              <div className="my-2 sm:my-3">
                <h1 className="font-serif-royal text-3xl sm:text-4.5xl md:text-5xl font-bold tracking-wide gold-gradient-text drop-shadow-md leading-tight">
                  {weddingConfig.couple.bride.name}
                </h1>

                {/* Telugu Wedding '&' / 'weds' flourish */}
                <div className="flex items-center justify-center space-x-3 my-1">
                  <span className="w-8 h-[1px] bg-[#E3C98A]/40" />
                  <span className="font-serif-elegant italic text-2xl sm:text-3xl text-[#E3C98A]">
                    &
                  </span>
                  <span className="w-8 h-[1px] bg-[#E3C98A]/40" />
                </div>

                <h1 className="font-serif-royal text-3xl sm:text-4.5xl md:text-5xl font-bold tracking-wide gold-gradient-text drop-shadow-md leading-tight">
                  {weddingConfig.couple.groom.name}
                </h1>
              </div>

              {/* Wedding Date & Muhurtham Highlights */}
              <div className="mt-2 mb-1 p-2 sm:p-2.5 rounded-lg bg-[#3B0713]/60 border border-[#C9A45C]/40 max-w-sm w-full">
                <p className="font-serif-royal text-sm sm:text-base text-[#FFF8E9] font-medium tracking-wide">
                  {weddingConfig.weddingDateTime.dateFormatted}
                </p>
                <p className="font-telugu text-xs sm:text-sm text-[#E3C98A] mt-0.5">
                  {weddingConfig.weddingDateTime.muhurthamTelugu}
                </p>
              </div>

              {/* Brass Diya illustration */}
              <div className="mt-1 mb-0">
                <BrassDiya size={50} />
              </div>
            </div>

            {/* Bottom Tap to Open Interactive Button */}
            <div className="relative z-20 shrink-0 pb-3 sm:pb-4 pt-1 flex flex-col items-center bg-gradient-to-b from-transparent to-[#3B0713]">
              <motion.button
                ref={openButtonRef}
                onClick={handleOpenClick}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                aria-busy={isOpening}
                className="group relative min-h-12 px-6 sm:px-9 py-3 rounded-full bg-gradient-to-r from-[#9A7730] via-[#D4AF37] to-[#9A7730] text-[#3B0713] font-serif-royal font-bold text-sm sm:text-base tracking-widest uppercase shadow-xl hover:shadow-[#D4AF37]/50 transition-all duration-300 border border-[#FFF2B2] overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFF2B2]/70"
              >
                {/* Button Shimmer Beam */}
                {!prefersReducedMotion && <div className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />}

                <span className="relative flex items-center space-x-2">
                  <span> Tap to Open </span>
                </span>
              </motion.button>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
