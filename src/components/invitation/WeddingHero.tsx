"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { weddingConfig } from "@/data/wedding-data";
import { TempleArch } from "../traditional/TempleArch";
import { KalashIcon } from "../traditional/KalashIcon";
import { FloralDivider } from "../traditional/OrnamentalBorders";
import { ChevronDown, Calendar, Clock, MapPin } from "lucide-react";

export const WeddingHero: React.FC = () => {
  const scrollToNext = () => {
    const coupleElement = document.getElementById("couple");
    if (coupleElement) {
      coupleElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center bg-gradient-to-b from-[#FFFDF8] via-[#FFF8E9] to-[#F5EBD8] text-[#4A0B1A] pt-36 pb-8 px-4 sm:px-6 overflow-hidden select-none"
    >
      {/* Main Temple Arch Card Framing the Couple */}
      <div className="w-full max-w-2xl my-auto py-4">
        <TempleArch theme="gold">
          <div className="flex flex-col items-center text-center">
            {/* Sacred Telugu Invocation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2 mb-2"
            >
              <KalashIcon size={32} />
              <div>
                <p className="font-telugu text-lg sm:text-xl font-bold text-[#8B1E2D] tracking-wide">
                  {weddingConfig.shlokas.teluguGanesha}
                </p>
                {weddingConfig.shlokas.blessingTelugu?.trim() && (
                  <p className="font-serif-royal text-xs text-[#9A7730] tracking-widest uppercase">
                    {weddingConfig.shlokas.blessingTelugu}
                  </p>
                )}
              </div>
              <KalashIcon size={32} />
            </motion.div>

            {/* Invitation Greeting */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-1 mb-4"
            >
              <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-[#8B1E2D]/80">
                Together with our families
              </p>
              <p className="font-serif-elegant italic text-base sm:text-lg text-[#6D1429]">
                We joyfully invite you to celebrate the wedding of
              </p>
            </motion.div>

            <Image
              src={weddingConfig.images.ganeshaEmblem}
              alt="Golden Ganesha emblem"
              width={1276}
              height={1233}
              priority
              unoptimized
              draggable={false}
              className="mb-4 h-auto w-[clamp(4.5rem,10vw,5.5rem)] shrink-0 object-contain"
            />

            {/* Couple's Names */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="my-2 sm:my-3"
            >
              <h1 className="font-serif-royal text-3xl sm:text-5xl font-extrabold text-[#6D1429] tracking-wide drop-shadow-sm">
                {weddingConfig.couple.groom.name}
              </h1>

              {/* weds emblem */}
              <div className="flex items-center justify-center space-x-3 my-2">
                <span className="w-12 h-[1px] bg-[#C9A45C]" />
                <span className="font-serif-elegant italic text-2xl sm:text-3xl font-semibold text-[#8B1E2D]">
                  weds
                </span>
                <span className="w-12 h-[1px] bg-[#C9A45C]" />
              </div>

              <h1 className="font-serif-royal text-3xl sm:text-5xl font-extrabold text-[#6D1429] tracking-wide drop-shadow-sm">
                {weddingConfig.couple.bride.name}
              </h1>
            </motion.div>

            {/* Floral Divider */}
            <FloralDivider className="my-3" theme="gold" />

            {/* Wedding Muhurtham & Date Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-full max-w-lg bg-[#6D1429] text-[#FFF8E9] rounded-xl p-4 sm:p-5 shadow-md border border-[#E3C98A]/60 flex flex-col items-center space-y-2"
            >
              <div className="flex items-center space-x-2 text-[#E3C98A] font-serif-royal text-sm sm:text-base font-semibold tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>{weddingConfig.weddingDateTime.dateFormatted}</span>
              </div>

              <div className="flex items-center space-x-2 text-[#FFF8E9] text-xs sm:text-sm">
                <Clock className="w-4 h-4 text-[#E3C98A]" />
                <span className="font-medium">
                  {weddingConfig.weddingDateTime.muhurthamTime} ({weddingConfig.weddingDateTime.muhurthamTelugu})
                </span>
              </div>

              <div className="h-[1px] w-full bg-[#E3C98A]/30 my-1" />

              <div className="flex items-center space-x-2 text-[#E3C98A]/90 text-xs sm:text-sm text-center">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="font-serif-royal font-medium">{weddingConfig.venue.name}, {weddingConfig.venue.city}</span>

              </div>
            </motion.div>
          </div>
        </TempleArch>
      </div>

      {/* Scroll to Explore Downward Indicator */}
      <motion.button
        onClick={scrollToNext}
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="flex flex-col items-center text-[#8B1E2D] hover:text-[#6D1429] transition-colors focus:outline-none cursor-pointer group mt-2"
        aria-label="Scroll to explore wedding details"
      >
        <span className="text-[11px] font-serif-royal uppercase tracking-widest text-[#9A7730] group-hover:text-[#6D1429] mb-1 font-semibold">
          Scroll to Explore
        </span>
        <div className="w-8 h-8 rounded-full border border-[#C9A45C] flex items-center justify-center bg-[#FFF8E9]/80 shadow-sm group-hover:bg-[#FFF8E9]">
          <ChevronDown className="w-4 h-4 text-[#8B1E2D]" />
        </div>
      </motion.button>
    </section>
  );
};
