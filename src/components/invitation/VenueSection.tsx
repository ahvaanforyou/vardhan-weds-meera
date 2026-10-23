"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/data/wedding-data";
import { FloralDivider, CornerOrnament } from "../traditional/OrnamentalBorders";
import { Navigation, Calendar, Car, Compass, ExternalLink } from "lucide-react";

export const VenueSection: React.FC = () => {
  const { venue, weddingDateTime } = weddingConfig;
  const mapsUrl = venue.googleMapsUrl?.trim();
  const mapEmbedUrl = venue.googleMapsEmbedUrl?.trim();
  const showMapEmbed = venue.showMapEmbed && Boolean(mapEmbedUrl);

  const getGoogleCalendarUrl = () => {
    const text = encodeURIComponent(`Wedding Ceremony: ${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name}`);
    const details = encodeURIComponent(
      `Join us for the sacred wedding ceremony.\\nMuhurtham: ${weddingDateTime.muhurthamTime}\\nVenue: ${venue.name}\\n${venue.address}`
    );
    const location = encodeURIComponent(`${venue.name}, ${venue.address}`);
    // Format YYYYMMDDTHHmmssZ
    const start = new Date(weddingDateTime.iso);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const toGoogleDate = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${toGoogleDate(start)}/${toGoogleDate(end)}&details=${details}&location=${location}`;
  };

  return (
    <section
      id="venue"
      className="relative py-24 px-4 sm:px-6 bg-[#FFF8E9] text-[#4A0B1A] overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="font-telugu text-lg text-[#8B1E2D] font-bold block mb-1">
          కళ్యాణ వేదిక & మార్గదర్శి
        </span>
        <h2 className="font-serif-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#6D1429] tracking-wide">
          Wedding Venue & Directions
        </h2>
        <p className="font-serif-elegant italic text-lg sm:text-xl text-[#8B1E2D] mt-2 max-w-xl mx-auto">
          We eagerly look forward to welcoming you with folded hands and warm hearts.
        </p>
        <FloralDivider theme="maroon" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Venue Information Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 bg-gradient-to-b from-[#6D1429] via-[#5A0F21] to-[#420A17] text-[#FFF8E9] rounded-2xl p-5 sm:p-8 border-2 border-[#C9A45C] shadow-2xl flex flex-col justify-between overflow-hidden"
        >
          <CornerOrnament position="top-left" size={44} color="#E3C98A" />
          <CornerOrnament position="top-right" size={44} color="#E3C98A" />
          <CornerOrnament position="bottom-left" size={44} color="#E3C98A" />
          <CornerOrnament position="bottom-right" size={44} color="#E3C98A" />

          <div className="relative z-10">
            {/* Venue Names */}
            <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#FFF8E9] tracking-wide">
              {venue.name}
            </h3>
            {venue.teluguName?.trim() && (
              <span className="font-telugu text-base text-[#E3C98A] font-semibold block mt-1">
                {venue.teluguName}
              </span>
            )}

            {showMapEmbed && <div className="relative z-20 mt-5 overflow-hidden rounded-xl border-2 border-[#C9A45C] shadow-lg">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="380"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Interactive map for ${venue.name}, ${venue.city}`}
                className="h-[320px] w-full sm:h-[380px]"
              />
            </div>}

            <p className="mt-3 text-sm font-medium leading-relaxed text-[#FFF8E9]">
              {venue.address}
            </p>
            {mapsUrl && <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-9 w-fit items-center gap-1.5 rounded-full border border-[#E3C98A] px-3.5 py-1.5 font-serif-royal text-xs font-semibold text-[#E3C98A] transition-colors hover:bg-[#E3C98A]/20"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>}

            {/* Date & Muhurtham Reminder */}
            <div className="space-y-3 text-xs sm:text-sm text-[#FFF8E9]/90 border-t border-[#C9A45C]/30 pt-4">
              <div className="flex items-center space-x-2.5">
                <Calendar className="w-4 h-4 text-[#E3C98A]" />
                <span className="font-serif-royal font-semibold text-[#FFF8E9]">
                  {weddingDateTime.dateFormatted}
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Navigation className="w-4 h-4 text-[#E3C98A]" />
                <span>
                  <strong>Sumuhurtham:</strong> {weddingDateTime.muhurthamTime} ({weddingDateTime.muhurthamTelugu})
                </span>
              </div>
              {venue.landmarks?.trim() && (
                <div className="flex items-start space-x-2.5">
                  <Compass className="w-4 h-4 text-[#E3C98A] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Landmark:</strong> {venue.landmarks}
                  </span>
                </div>
              )}
              {venue.parkingNotes?.trim() && (
                <div className="flex items-start space-x-2.5">
                  <Car className="w-4 h-4 text-[#E3C98A] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Parking:</strong> {venue.parkingNotes}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Direction & Calendar Buttons */}
          <div className="relative z-10 pt-6 mt-6 border-t border-[#C9A45C]/40 flex flex-wrap gap-3">
            {/* Google Calendar Link */}
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border border-[#E3C98A] text-[#E3C98A] font-serif-royal font-semibold text-xs sm:text-sm hover:bg-[#E3C98A]/20 transition-all duration-200 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Google Cal</span>
            </a>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
