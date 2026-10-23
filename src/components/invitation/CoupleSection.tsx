"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { weddingConfig } from "@/data/wedding-data";
import { FloralDivider, CornerOrnament } from "../traditional/OrnamentalBorders";
import { KalashIcon } from "../traditional/KalashIcon";

export const CoupleSection: React.FC = () => {
  const { groom, bride } = weddingConfig.couple;

  return (
    <section
      id="couple"
      className="relative py-20 px-4 sm:px-6 bg-[#F5EBD8] text-[#4A0B1A] overflow-hidden"
    >
      {/* Decorative Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="font-telugu text-lg text-[#8B1E2D] font-bold block mb-1">
          వధూవరుల పరిచయం
        </span>
        <h2 className="font-serif-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#6D1429] tracking-wide">
          Meet the Groom & Bride
        </h2>
        <p className="font-serif-elegant italic text-lg sm:text-xl text-[#8B1E2D] mt-2 max-w-xl mx-auto">
          Two souls, blessed by tradition and guided by love, embarking upon life’s greatest journey.
        </p>
        <FloralDivider theme="maroon" />
      </div>

      {/* Couple Cards Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-stretch relative">
        {/* Central Floral Divider Motif (Visible on desktop between cards) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center z-20 pointer-events-none">
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent to-[#C9A45C]" />
          <div className="my-3 p-2 bg-[#FFF8E9] rounded-full border border-[#C9A45C] shadow-md">
            <KalashIcon size={34} />
          </div>
          <div className="h-16 w-[1px] bg-gradient-to-t from-transparent to-[#C9A45C]" />
        </div>

        {/* Groom Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative bg-[#FFF8E9] rounded-2xl p-6 sm:p-8 border-2 border-[#C9A45C]/70 shadow-xl flex flex-col items-center text-center overflow-hidden"
        >
          <CornerOrnament position="top-left" size={36} color="#8B1E2D" />
          <CornerOrnament position="top-right" size={36} color="#8B1E2D" />

          {/* Groom Tag */}
          <span className="px-4 py-1 rounded-full bg-[#234B38]/10 text-[#234B38] font-serif-royal text-xs font-semibold tracking-widest uppercase mb-4 border border-[#234B38]/20">
            {groom.role}
          </span>

          {/* Softly Arched Portrait Frame */}
          <div className="relative w-44 h-56 sm:w-48 sm:h-60 rounded-t-full rounded-b-2xl p-1.5 bg-gradient-to-b from-[#C9A45C] via-[#E3C98A] to-[#9A7730] shadow-md mb-6">
            <div className="relative w-full h-full rounded-t-full rounded-b-xl overflow-hidden bg-[#E8D3B9]">
              <Image
                src={groom.image}
                alt={groom.name}
                fill
                sizes="(max-width: 768px) 192px, 220px"
                className="object-cover object-center transition-transform duration-500"
                priority
              />
            </div>
            {/* Small floral emblem at arch apex */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#234B38] border border-[#FFF8E9] shadow-sm flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E3C98A]" />
            </div>
          </div>

          {/* Name & Telugu Name */}
          <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#6D1429] tracking-wide">
            {groom.name}
          </h3>
          <span className="font-telugu text-base text-[#8B1E2D] font-semibold mt-0.5">
            ({groom.teluguName})
          </span>

          {/* Parents / Family Lineage */}
          <div className="my-3 py-2 px-4 rounded-lg bg-[#F5EBD8]/70 border border-[#C9A45C]/30 w-full">
            <p className="text-xs uppercase tracking-wider text-[#9A7730] font-semibold">
              Son of
            </p>
            <p className="font-serif-royal text-sm sm:text-base font-semibold text-[#4A0B1A] mt-0.5">
              {groom.parents}
            </p>
            {groom.grandparents?.trim() && (
              <p className="text-xs text-[#6D1429]/80 mt-1 italic">
                {groom.grandparents}
              </p>
            )}
          </div>

          {/* Short Bio / Description */}
          {groom.description?.trim() && (
            <p className="text-sm text-[#4A0B1A]/85 leading-relaxed font-sans mt-2">
              {groom.description}
            </p>
          )}
        </motion.div>
        {/* Bride Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative bg-[#FFF8E9] rounded-2xl p-6 sm:p-8 border-2 border-[#C9A45C]/70 shadow-xl flex flex-col items-center text-center overflow-hidden"
        >
          <CornerOrnament position="top-left" size={36} color="#8B1E2D" />
          <CornerOrnament position="top-right" size={36} color="#8B1E2D" />

          {/* Bride Tag */}
          <span className="px-4 py-1 rounded-full bg-[#8B1E2D]/10 text-[#8B1E2D] font-serif-royal text-xs font-semibold tracking-widest uppercase mb-4 border border-[#8B1E2D]/20">
            {bride.role}
          </span>

          {/* Softly Arched Portrait Frame */}
          <div className="relative w-44 h-56 sm:w-48 sm:h-60 rounded-t-full rounded-b-2xl p-1.5 bg-gradient-to-b from-[#C9A45C] via-[#E3C98A] to-[#9A7730] shadow-md mb-6">
            <div className="relative w-full h-full rounded-t-full rounded-b-xl overflow-hidden bg-[#E8D3B9]">
              <Image
                src={bride.image}
                alt={bride.name}
                fill
                sizes="(max-width: 768px) 192px, 220px"
                className="object-cover object-[65%_42%] transition-transform duration-500"
                priority
              />
            </div>
            {/* Small floral emblem at arch apex */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#8B1E2D] border border-[#FFF8E9] shadow-sm flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E3C98A]" />
            </div>
          </div>

          {/* Name & Telugu Name */}
          <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#6D1429] tracking-wide">
            {bride.name}
          </h3>
          <span className="font-telugu text-base text-[#8B1E2D] font-semibold mt-0.5">
            ({bride.teluguName})
          </span>

          {/* Parents / Family Lineage */}
          <div className="my-3 py-2 px-4 rounded-lg bg-[#F5EBD8]/70 border border-[#C9A45C]/30 w-full">
            <p className="text-xs uppercase tracking-wider text-[#9A7730] font-semibold">
              Daughter of
            </p>
            <p className="font-serif-royal text-sm sm:text-base font-semibold text-[#4A0B1A] mt-0.5">
              {bride.parents}
            </p>
            {bride.grandparents?.trim() && (
              <p className="text-xs text-[#6D1429]/80 mt-1 italic">
                {bride.grandparents}
              </p>
            )}
          </div>

          {/* Short Bio / Description */}
          {bride.description?.trim() && (
            <p className="text-sm text-[#4A0B1A]/85 leading-relaxed font-sans mt-2">
              {bride.description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};
