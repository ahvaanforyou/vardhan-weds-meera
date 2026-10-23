"use client";

import React from "react";
import { weddingConfig } from "@/data/wedding-data";
import { FloralDivider } from "../traditional/OrnamentalBorders";
import { KalashIcon } from "../traditional/KalashIcon";
import { ArrowUp, Heart } from "lucide-react";

export const WeddingFooter: React.FC = () => {
  const { couple, weddingDateTime, shlokas } = weddingConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#FFF8E9] text-[#4A0B1A] pt-16 pb-12 px-4 sm:px-6 border-t-2 border-[#C9A45C]/50 overflow-hidden text-center select-none">
      {/* Decorative center Kalash icon */}
      <div className="flex justify-center mb-4">
        <KalashIcon size={46} />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Sacred Telugu Inscription */}
        <p className="font-telugu text-lg sm:text-xl font-bold text-[#8B1E2D] mb-1">
          {shlokas.teluguGanesha}
        </p>
        {shlokas.blessingTelugu?.trim() && (
          <p className="font-serif-royal text-sm text-[#9A7730] uppercase tracking-widest font-semibold mb-3">
            {shlokas.blessingTelugu}
          </p>
        )}

        {/* Thank You Note */}
        <p className="font-serif-elegant italic text-xl sm:text-2xl text-[#6D1429] my-4 leading-relaxed">
          &ldquo;Your presence, love, and sacred blessings mean the world to us as we begin this new chapter.&rdquo;
        </p>

        <p className="text-xs uppercase tracking-widest text-[#9A7730] font-semibold mt-6 mb-1">
          With Love and Gratitude,
        </p>

        {/* Couple Names */}
        <h3 className="font-serif-royal text-3xl sm:text-4xl font-extrabold text-[#6D1429] tracking-wide">
          {couple.groom.name} & {couple.bride.name}
        </h3>

        {/* Date */}
        <p className="font-serif-royal text-sm text-[#8B1E2D] font-medium tracking-wider mt-2">
          {weddingDateTime.dateFormatted} • {weddingConfig.venue.city}
        </p>

        <FloralDivider theme="maroon" className="my-8" />

        {/* Back to Top Button */}
        <div className="flex justify-center">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#C9A45C] bg-[#FFFDF8] text-xs font-serif-royal font-semibold text-[#8B1E2D] hover:bg-[#6D1429] hover:text-[#FFF8E9] hover:border-[#6D1429] transition-all duration-300 shadow-sm cursor-pointer group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Subtle Made with Love Line */}
        <div className="mt-8 text-xs text-[#8B1E2D]/60 flex items-center justify-center space-x-1 font-serif-royal">
          <span>Crafted with love for the wedding celebration of {couple.groom.name} & {couple.bride.name}</span>
        </div>
      </div>
    </footer>
  );
};
