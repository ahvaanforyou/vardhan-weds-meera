"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/data/wedding-data";
import { FloralDivider } from "../traditional/OrnamentalBorders";
import { Calendar, Clock, ExternalLink, MapPin } from "lucide-react";

const FootprintPair: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 36 48" className={className} style={style}>
    <g fill="currentColor" fillOpacity="0.84">
      <g transform="translate(3 2) rotate(-13 8 8)">
        <g transform="translate(0 28) scale(1 -1)">
          <path d="M8 9C3 9 2 15 4 21c1.2 3.5 3.1 6 5 5.7 3.1-.4 4.7-5.2 4.4-9.8C13.1 12.7 11.2 9 8 9Z" />
          <circle cx="4" cy="5" r="2.1" /><circle cx="8" cy="3.6" r="2.2" /><circle cx="12" cy="5" r="1.9" />
        </g>
      </g>
      <g transform="translate(17 22) rotate(12 8 8)">
        <g transform="translate(0 28) scale(1 -1)">
          <path d="M8 9C3 9 2 15 4 21c1.2 3.5 3.1 6 5 5.7 3.1-.4 4.7-5.2 4.4-9.8C13.1 12.7 11.2 9 8 9Z" />
          <circle cx="4" cy="5" r="2.1" /><circle cx="8" cy="3.6" r="2.2" /><circle cx="12" cy="5" r="1.9" />
        </g>
      </g>
    </g>
  </svg>
);

type MobileFootstep = {
  key: string;
  left: number;
  top: number;
  rotation: number;
};

const EventIllustration: React.FC<{ icon: string }> = ({ icon }) => (
  <svg aria-hidden="true" viewBox="0 0 120 120" className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24">
    {icon === "kalash" && (
      <g stroke="#8B1E2D" strokeWidth="2" strokeLinejoin="round">
        <path d="M47 43h26l-3 10c-2 12-7 19-10 21-4-3-9-10-10-21z" fill="#C9A45C" />
        <path d="M43 43h34M51 39h18l-2 4H53zM48 76h24l-3 5H51z" fill="#E3C98A" />
        <path d="M60 37V18M60 30c-11-2-17-9-17-16 10 1 16 7 17 16ZM61 28c2-10 9-16 18-17 0 9-7 16-18 18Z" fill="#718456" />
        <circle cx="60" cy="57" r="3" fill="#8B1E2D" stroke="none" />
      </g>
    )}
    {icon === "mehendi" && (
      <g stroke="#8B1E2D" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M45 89c-6-9-8-17-7-27l2-20c.3-4 6-4 7 0l2 13 1-30c.2-5 7-5 7 0v27l3-35c.4-5 7-4 7 1l-1 34 5-27c1-5 8-3 7 2l-4 34 7-17c2-4 8-1 6 4l-9 30c-2 8-8 14-16 16l-10 2z" fill="#E8D3B9" />
        <path d="M50 69c7-7 15-7 22 0-7 8-15 8-22 0Z" fill="none" />
        <circle cx="61" cy="69" r="2" fill="#C9A45C" /><circle cx="54" cy="56" r="1.8" fill="#C9A45C" /><circle cx="69" cy="54" r="1.8" fill="#C9A45C" />
      </g>
    )}
    {icon === "mandapam" && (
      <g stroke="#8B1E2D" strokeWidth="2" strokeLinejoin="round" fill="none">
        <path d="M25 47 60 24l35 23H25Z" fill="#C9A45C" />
        <path d="M33 50h54M37 52v42m46-42v42M31 96h58M45 53v39m30-39v39" />
        <path d="M30 47c3-8 8-10 13-3 4-10 9-10 14-1 4-9 10-9 14 0 5-7 10-5 13 4" stroke="#9A7730" />
        <circle cx="60" cy="18" r="4" fill="#8B1E2D" />
        <path d="M52 99h16l-8 8z" fill="#C9A45C" />
      </g>
    )}
    {icon === "reception" && (
      <g transform="rotate(-24 60 60)" stroke="#8B1E2D" strokeWidth="2" strokeLinejoin="round">
        <path d="M34 47c0-6 12-11 26-11s26 5 26 11v26c0 7-12 12-26 12S34 80 34 73z" fill="#C9A45C" />
        <ellipse cx="60" cy="47" rx="26" ry="11" fill="#E3C98A" />
        <ellipse cx="60" cy="73" rx="26" ry="12" fill="#B8843D" />
        <path d="M45 40v41m15-45v49m15-45v41" fill="none" />
      </g>
    )}
  </svg>
);

export const EventsTimeline: React.FC = () => {
  const { events } = weddingConfig;
  const stepsPerGap = 9;
  const mobileTimelineRef = useRef<HTMLDivElement>(null);
  const [mobileFootsteps, setMobileFootsteps] = useState<MobileFootstep[]>([]);

  useEffect(() => {
    const timeline = mobileTimelineRef.current;
    if (!timeline) return;

    const updateTrail = () => {
      const bounds = timeline.getBoundingClientRect();
      const markers = Array.from(timeline.querySelectorAll<HTMLElement>("[data-event-marker]"));
      if (bounds.width === 0 || markers.length < 2) {
        setMobileFootsteps([]);
        return;
      }

      const markerCenters = markers.map((marker) => {
        const rect = marker.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - bounds.left,
          y: rect.top + rect.height / 2 - bounds.top,
        };
      });
      const nextFootsteps: MobileFootstep[] = [];

      markerCenters.slice(0, -1).forEach((start, segmentIndex) => {
        const end = markerCenters[segmentIndex + 1];
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        if (dy <= 0) return;

        const amplitude = Math.min(56, bounds.width * 0.16);
        const waveDirection = segmentIndex % 2 === 0 ? 1 : -1;
        const pointAt = (t: number) => {
          const easedProgress = 3 * t * t - 2 * t * t * t;
          const envelope = Math.sin(Math.PI * t) ** 2;
          const wave = envelope * Math.sin(2 * Math.PI * t);
          const envelopeSlope = Math.PI * Math.sin(2 * Math.PI * t);
          const waveSlope = envelopeSlope * Math.sin(2 * Math.PI * t)
            + envelope * 2 * Math.PI * Math.cos(2 * Math.PI * t);
          const horizontalSlope = dx * 6 * t * (1 - t) + waveDirection * amplitude * waveSlope;
          return {
            x: Math.max(8, Math.min(bounds.width - 8, start.x + dx * easedProgress + waveDirection * amplitude * wave)),
            y: start.y + dy * t,
            rotation: Math.atan2(-horizontalSlope, dy) * (180 / Math.PI),
          };
        };

        // Approximate the path length so each pair is spaced evenly along the curve.
        const samples = Array.from({ length: 121 }, (_, index) => pointAt(index / 120));
        const lengths = [0];
        for (let index = 1; index < samples.length; index += 1) {
          const previous = samples[index - 1];
          const current = samples[index];
          lengths.push(lengths[index - 1] + Math.hypot(current.x - previous.x, current.y - previous.y));
        }

        const totalLength = lengths[lengths.length - 1];
        const stepCount = Math.max(12, Math.min(30, Math.ceil(totalLength / 16)));
        for (let step = 0; step < stepCount; step += 1) {
          const targetLength = totalLength * (step + 1) / (stepCount + 1);
          let sampleIndex = lengths.findIndex((length) => length >= targetLength);
          if (sampleIndex < 1) sampleIndex = 1;
          const previousLength = lengths[sampleIndex - 1];
          const segmentLength = lengths[sampleIndex] - previousLength || 1;
          const sampleProgress = (targetLength - previousLength) / segmentLength;
          const t = ((sampleIndex - 1) + sampleProgress) / 120;
          const point = pointAt(t);
          nextFootsteps.push({
            key: `${segmentIndex}-${step}`,
            left: point.x,
            top: point.y,
            rotation: point.rotation,
          });
        }
      });

      setMobileFootsteps(nextFootsteps);
    };

    updateTrail();
    const observer = new ResizeObserver(updateTrail);
    observer.observe(timeline);
    timeline.querySelectorAll<HTMLElement>("[data-event-marker]").forEach((marker) => observer.observe(marker));
    window.addEventListener("resize", updateTrail);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateTrail);
    };
  }, [events.length]);

  return (
    <section
      id="events"
      className="relative z-[2] scroll-mt-20 overflow-hidden bg-[#FFF8E9] px-3 pt-16 pb-28 text-[#4A0B1A] sm:px-6 sm:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-35">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="events-kolam-pattern" width="112" height="112" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="#C9A45C" strokeOpacity="0.26" strokeWidth="0.8">
                <path d="M56 12c0 18-20 18-20 44s20 26 20 44c0-18 20-18 20-44S56 30 56 12Z" />
                <path d="M12 56c18 0 18-20 44-20s26 20 44 20c-18 0-18 20-44 20S30 56 12 56Z" />
                <circle cx="56" cy="56" r="3" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#events-kolam-pattern)" />
        </svg>
      </div>

      {/* Section Header */}
      <div className="relative z-10 mx-auto mb-16 max-w-4xl text-center">
        <span className="font-telugu text-lg text-[#8B1E2D] font-bold block mb-1">
          శుభకార్య వివరాలు
        </span>
        <h2 className="font-serif-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#6D1429] tracking-wide">
          Wedding Ceremonies & Events
        </h2>
        <p className="font-serif-elegant italic text-lg sm:text-xl text-[#8B1E2D] mt-2 max-w-xl mx-auto">
          We invite you to join every auspicious celebration as our families unite.
        </p>
        <FloralDivider theme="maroon" />
      </div>

      {/* Desktop journey: preserve the established alternating layout. */}
      <div className="relative z-10 mx-auto hidden max-w-6xl md:block">
        {events.slice(0, -1).flatMap((event, segmentIndex) =>
          Array.from({ length: stepsPerGap }, (_, stepIndex) => {
            const progress = (stepIndex + 1) / (stepsPerGap + 1);
            const direction = segmentIndex % 2 === 0 ? 1 : -1;
            const amplitude = 52;
            const desktopOffset = direction * amplitude * Math.cos(Math.PI * progress);
            const verticalSpan = 31 * 16;
            const rotation = Math.atan2(
              -direction * amplitude * Math.PI * Math.sin(Math.PI * progress),
              verticalSpan
            ) * (180 / Math.PI);

            return (
              <FootprintPair
                key={`footsteps-${event.id}-${stepIndex}`}
                className="pointer-events-none absolute left-[calc(50%_+_var(--desktop-offset))] z-10 h-10 w-8 text-[#8B1E2D] md:h-11 md:w-9"
                style={{
                  top: `${((segmentIndex + 0.5 + progress) / events.length) * 100}%`,
                  transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                  "--desktop-offset": `${desktopOffset}px`,
                } as React.CSSProperties}
              />
            );
          })
        )}

        <div className="relative">
          {events.map((event, index) => {
            const isEven = index % 2 === 0;
            const eventMapUrl = event.googleMapsUrl?.trim();

            return (
              <div
                key={event.id}
                className="relative grid min-h-[31rem] grid-cols-[minmax(0,1fr)_9rem_minmax(0,1fr)] items-center gap-0"
              >
                {/* Numbered markers remain separate from the footprint trail. */}
                <div
                  aria-hidden="true"
                  className={`absolute left-1/2 top-1/2 z-20 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#C9A45C] bg-[#FFF8E9] shadow-sm md:h-11 md:w-11 ${
                    isEven
                    ? "left-[calc(50%+43px)]"
                      : "left-[calc(50%-43px)]"
                  }`}
                >
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full md:h-9 md:w-9 ${
                    event.isMainEvent ? "bg-[#8B1E2D] text-[#FFF8E9]" : "bg-[#C9A45C]/20 text-[#8B1E2D]"
                  }`}>
                    <span className="font-serif-royal text-xs font-bold">{index + 1}</span>
                  </div>
                </div>

                {/* Alternating illustration */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`flex w-full items-center py-4 ${
                    isEven ? "col-start-1 justify-end pr-3" : "col-start-3 justify-start pl-3"
                  }`}
                >
                  <EventIllustration icon={event.icon} />
                </motion.div>

                {/* Event information; no card surface keeps the journey open and light. */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                className={`min-w-0 w-full max-w-[22rem] py-4 text-center ${isEven ? "col-start-3 justify-self-start" : "col-start-1 justify-self-end"}`}
                >
                  {event.teluguTitle?.trim() && (
                    <span className="font-telugu block text-[11px] font-semibold leading-snug text-[#8B1E2D] sm:text-xs">
                      {event.teluguTitle}
                    </span>
                  )}
                  <h3 className={`font-serif-royal text-lg font-bold leading-tight text-[#6D1429] sm:text-xl md:text-2xl ${event.teluguTitle?.trim() ? "mt-1" : ""}`}>
                    {event.title}
                  </h3>

                  <div className="font-serif-elegant mt-2 space-y-0.5 text-sm leading-snug text-[#8B1E2D] sm:text-base">
                    <p className="flex items-start justify-center gap-1.5">
                      <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9A7730]" />
                      <span>{event.date}</span>
                    </p>
                    <p className="flex items-start justify-center gap-1.5">
                      <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9A7730]" />
                      <span>{event.time}</span>
                    </p>
                  </div>

                  <div className="mt-2 text-[11px] leading-snug text-[#736044] sm:text-xs">
                    <p className="flex items-start justify-center gap-1.5 font-semibold text-[#6D1429]">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9A7730]" />
                      <span>{event.venue}</span>
                    </p>
                  </div>
                  {event.address && <p className="mt-1 text-[11px] leading-snug text-[#736044] sm:text-xs">{event.address}</p>}

                  {eventMapUrl && (
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                    <a
                      href={eventMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 rounded-full border border-[#C9A45C] px-3 py-1.5 font-serif-royal text-[10px] font-semibold uppercase tracking-wider text-[#8B1E2D] transition-colors hover:bg-[#6D1429] hover:text-[#FFF8E9] sm:text-[11px]"
                    >
                      <MapPin className="h-3 w-3" />
                      <span>View Map</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile journey keeps the event copy in the wide track and the art in
          the narrow track. The tracks swap sides on alternating events. */}
      <div ref={mobileTimelineRef} className="relative z-10 mx-auto max-w-[430px] md:hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
          {mobileFootsteps.map((footstep) => (
            <FootprintPair
              key={footstep.key}
              className="absolute h-3 w-[9px] text-[#8B1E2D]"
              style={{
                left: `${footstep.left}px`,
                top: `${footstep.top}px`,
                transform: `translate(-50%, -50%) rotate(${footstep.rotation}deg)`,
              }}
            />
          ))}
        </div>
        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          const eventMapUrl = event.googleMapsUrl?.trim();
          return (
            <React.Fragment key={event.id}>
              <article className={`relative z-20 grid items-center gap-2 py-2 ${isEven ? "grid-cols-[minmax(0,1fr)_4rem] sm:grid-cols-[minmax(0,1fr)_5rem]" : "grid-cols-[4rem_minmax(0,1fr)] sm:grid-cols-[5rem_minmax(0,1fr)]"}`}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45 }}
                  className={`min-w-0 py-1 ${isEven ? "col-start-1 row-start-1 text-left" : "col-start-2 row-start-1 text-right"}`}
                >
                  {event.teluguTitle?.trim() && <span className="font-telugu block text-[11px] font-semibold leading-snug text-[#8B1E2D]">{event.teluguTitle}</span>}
                  <h3 className={`font-serif-royal text-[17px] font-bold leading-tight text-[#6D1429] ${event.teluguTitle?.trim() ? "mt-1" : ""}`}>{event.title}</h3>
                  <div className="font-serif-elegant mt-2 space-y-1 text-[13px] leading-snug text-[#8B1E2D]">
                    <p className={`flex items-start gap-1.5 ${isEven ? "justify-start" : "justify-end"}`}><Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9A7730]" /><span>{event.date}</span></p>
                    <p className={`flex items-start gap-1.5 ${isEven ? "justify-start" : "justify-end"}`}><Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9A7730]" /><span>{event.time}</span></p>
                  </div>
                  <div className="mt-2 text-[11px] leading-snug text-[#736044]">
                    <p className={`flex items-start gap-1.5 font-semibold text-[#6D1429] ${isEven ? "justify-start" : "justify-end"}`}><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9A7730]" /><span>{event.venue}</span></p>
                  </div>
                  {event.address && <p className={`mt-1 text-[11px] leading-snug text-[#736044] ${isEven ? "text-left" : "text-right"}`}>{event.address}</p>}
                  {eventMapUrl && <div className={`mt-3 flex flex-wrap gap-2 ${isEven ? "justify-start" : "justify-end"}`}>
                    <a href={eventMapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center justify-center gap-1 rounded-full border border-[#C9A45C] px-3 py-1.5 font-serif-royal text-[10px] font-semibold uppercase tracking-wide text-[#8B1E2D]">
                      <MapPin className="h-3 w-3" /><span>View Map</span><ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>}
                </motion.div>
                <div className={`flex min-w-0 flex-col items-center gap-2 ${isEven ? "col-start-2 row-start-1" : "col-start-1 row-start-1"}`}>
                  <span data-event-marker={index} aria-hidden="true" className={`relative z-30 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#C9A45C] bg-[#FFF8E9] shadow-sm ${event.isMainEvent ? "text-[#FFF8E9]" : "text-[#8B1E2D]"}`}>
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full font-serif-royal text-xs font-bold ${event.isMainEvent ? "bg-[#8B1E2D]" : "bg-[#C9A45C]/20"}`}>{index + 1}</span>
                  </span>
                  <EventIllustration icon={event.icon} />
                </div>
              </article>
              {index < events.length - 1 && (
                <div aria-hidden="true" className="h-28" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};
