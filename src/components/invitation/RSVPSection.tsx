"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, Send, Users } from "lucide-react";
import { weddingConfig } from "@/data/wedding-data";
import { CornerOrnament, FloralDivider } from "../traditional/OrnamentalBorders";

export const RSVPSection: React.FC = () => {
  const { rsvp, events } = weddingConfig;
  const maxGuestCount = Math.max(1, Math.floor(rsvp.maxGuests));
  const [fullName, setFullName] = useState("");
  const [attendance, setAttendance] = useState<"attending" | "declining">("attending");
  const [guestCount, setGuestCount] = useState(() => Math.min(2, maxGuestCount));
  const [selectedEvents, setSelectedEvents] = useState<string[]>(() => events.map((event) => event.id));
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const isSubmittingRef = useRef(false);

  if (!rsvp.enabled) return null;

  const handleEventToggle = (eventId: string) => {
    setSelectedEvents((current) =>
      current.includes(eventId)
        ? current.filter((id) => id !== eventId)
        : [...current, eventId]
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmittingRef.current) return;
    setErrorMsg("");

    const name = fullName.trim();
    if (!name) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (attendance === "attending" && events.length > 0 && selectedEvents.length === 0) {
      setErrorMsg("Please select at least one ceremony you will attend.");
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    try {
      const savedValue = JSON.parse(localStorage.getItem("wedding_rsvps") || "[]");
      const existing = Array.isArray(savedValue) ? savedValue : [];
      existing.push({
        name,
        attendance,
        guestCount: attendance === "attending" ? Math.min(guestCount, maxGuestCount) : 0,
        events: attendance === "attending" ? selectedEvents : [],
        message: message.trim(),
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("wedding_rsvps", JSON.stringify(existing));
      window.setTimeout(() => {
        isSubmittingRef.current = false;
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 450);
    } catch {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
      setErrorMsg("Your response could not be saved on this device. Please try again.");
    }
  };

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden bg-[#F5EBD8] px-4 py-8 text-[#4A0B1A] sm:px-5 sm:py-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-kolam-pattern opacity-[0.035]" aria-hidden="true" />
      {/*
      <div className="relative z-10 mx-auto mb-4 max-w-3xl text-center sm:mb-5">
        <span className="font-telugu mb-1 block text-base font-bold text-[#8B1E2D]">
          మీ రాక మాకు ఆనందం
        </span>
        <h2 className="font-serif-royal text-2xl font-bold tracking-wide text-[#6D1429] sm:text-3xl md:text-4xl">
          We Would Love to Celebrate With You
        </h2>
        <p className="font-serif-elegant mx-auto mt-1 max-w-xl text-sm italic text-[#8B1E2D] sm:text-base">
          Please let us know if you will be joining us for our special day.
        </p>
        <FloralDivider theme="maroon" className="!my-2" />
        {rsvp.deadline?.trim() && (
          <p className="mt-1 font-serif-royal text-xs font-semibold uppercase tracking-widest text-[#9A7730]">
            Kindly RSVP by {rsvp.deadline}
          </p>
        )}
      </div> */}
      <FloralDivider theme="maroon" className="!my-2" />

      <div className="relative z-10 mx-auto max-w-[640px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border-2 border-[#C9A45C] bg-[#FFF8E9] p-3 shadow-lg sm:p-4"
        >
          <CornerOrnament position="top-left" size={40} color="#8B1E2D" />
          <CornerOrnament position="top-right" size={40} color="#8B1E2D" />
          <CornerOrnament position="bottom-left" size={40} color="#8B1E2D" />
          <CornerOrnament position="bottom-right" size={40} color="#8B1E2D" />

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-7 text-center"
                role="status"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#8B1E2D] bg-[#8B1E2D]/10 text-[#8B1E2D]">
                  <Heart className="h-8 w-8 fill-[#8B1E2D]" aria-hidden="true" />
                </div>
                <h3 className="font-serif-royal text-2xl font-bold text-[#6D1429] sm:text-3xl">
                  Dhanyavadhamulu!
                </h3>
                <span className="font-telugu mt-1 block text-lg font-bold text-[#8B1E2D]">
                  మీ శుభాకాంక్షలకు ధన్యవాదాలు
                </span>
                <p className="font-serif-elegant mt-3 max-w-md text-lg italic text-[#4A0B1A]">
                  Thank you, <strong>{fullName.trim()}</strong>. We have joyfully received your RSVP and look forward to celebrating with you.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 min-h-11 rounded-full border border-[#C9A45C] px-6 py-2 font-serif-royal text-xs font-semibold text-[#8B1E2D] transition-colors hover:bg-[#F5EBD8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A45C]/40"
                >
                  Edit Response
                </button>
              </motion.div>
            ) : (
              <form key="form" onSubmit={handleSubmit} className="relative space-y-3.5 sm:space-y-4" aria-busy={isSubmitting}>
                {errorMsg && (
                  <div id="rsvp-error" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800" role="alert">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label htmlFor="fullName" className="mb-1 block font-serif-royal text-sm font-bold uppercase tracking-wide text-[#6D1429] sm:text-base">
                    Guest Name(s) <span className="text-red-700" aria-hidden="true">*</span>
                    <span className="sr-only"> required</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="e.g., Smt. Lakshmi & Sri Venkatesh"
                    aria-invalid={Boolean(errorMsg && !fullName.trim())}
                    aria-describedby={errorMsg && !fullName.trim() ? "rsvp-error" : undefined}
                    className="h-11 w-full rounded-lg border border-[#C9A45C]/60 bg-[#FFFDF8] px-3.5 py-2 text-sm text-[#4A0B1A] placeholder:text-[#8B1E2D]/45 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A45C]/35 sm:text-base"
                  />
                </div>

                <fieldset>
                  <legend className="mb-1.5 font-serif-royal text-sm font-bold uppercase tracking-wide text-[#6D1429] sm:text-base">
                    Will You Be Joining Us? <span className="text-red-700" aria-hidden="true">*</span>
                  </legend>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
                    {([
                      { value: "attending", label: "Joyfully Accepts" },
                      { value: "declining", label: "Regretfully Declines" },
                    ] as const).map((option) => {
                      const isSelected = attendance === option.value;
                      return (
                        <label key={option.value} className="relative block cursor-pointer">
                          <input
                            className="peer sr-only"
                            type="radio"
                            name="attendance"
                            value={option.value}
                            checked={isSelected}
                            onChange={() => setAttendance(option.value)}
                            required
                          />
                          <span className={`flex min-h-[4.5rem] items-center gap-2.5 rounded-xl border-2 px-3 py-2.5 transition-colors peer-focus-visible:ring-4 peer-focus-visible:ring-[#C9A45C]/40 sm:min-h-[5.25rem] sm:px-3.5 ${isSelected ? "border-[#D4AF37] bg-[#6D1429] text-[#FFF8E9] shadow-sm" : "border-[#C9A45C]/55 bg-[#FFFDF8] text-[#6D1429] hover:bg-[#F5EBD8]"}`}>
                            <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${isSelected ? "border-[#E3C98A] bg-[#FFF8E9] text-[#6D1429]" : "border-[#9A7730] text-transparent"}`}>
                              {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                            </span>
                            <span className="font-serif-royal text-xs font-bold uppercase leading-snug tracking-wide sm:text-sm">
                              {option.label}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {attendance === "attending" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3.5 pt-0.5 sm:space-y-4"
                  >
                    <div>
                      <label htmlFor="guestCount" className="mb-1 block font-serif-royal text-sm font-bold uppercase tracking-wide text-[#6D1429] sm:text-base">
                        Number of Attending Guests
                      </label>
                      <div className="flex items-center gap-2.5">
                        <Users className="h-4 w-4 shrink-0 text-[#8B1E2D]" aria-hidden="true" />
                        <select
                          id="guestCount"
                          name="guestCount"
                          value={guestCount}
                          onChange={(event) => setGuestCount(Math.min(Number(event.target.value), maxGuestCount))}
                          className="h-10 min-w-32 rounded-lg border border-[#C9A45C]/60 bg-[#FFFDF8] px-3 py-1 text-sm text-[#4A0B1A] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A45C]/35"
                        >
                          {Array.from({ length: maxGuestCount }, (_, index) => index + 1).map((count) => (
                            <option key={count} value={count}>{count} {count === 1 ? "Guest" : "Guests"}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <fieldset>
                      <legend className="mb-1.5 font-serif-royal text-sm font-bold uppercase leading-snug tracking-wide text-[#6D1429] sm:text-base">
                        Which Ceremonies Will You Attend?
                      </legend>
                      {events.length > 0 ? (
                        <div className="space-y-1.5">
                          {events.map((weddingEvent) => {
                            const isSelected = selectedEvents.includes(weddingEvent.id);
                            const eventInputId = `event-${weddingEvent.id}`;
                            return (
                              <label
                                key={weddingEvent.id}
                                htmlFor={eventInputId}
                                className={`flex min-h-[3.625rem] cursor-pointer items-center justify-between gap-2.5 rounded-lg border px-2.5 py-2 transition-colors focus-within:ring-4 focus-within:ring-[#C9A45C]/35 sm:min-h-[3.75rem] sm:px-3 sm:py-2.5 ${isSelected ? "border-[#8B1E2D]/70 bg-[#F5EBD8]/70" : "border-[#C9A45C]/45 bg-[#FFFDF8] hover:bg-[#F5EBD8]/50"}`}
                              >
                                <span className="min-w-0 flex-1">
                                  <span className="font-serif-royal block break-words text-xs font-bold leading-snug text-[#6D1429] sm:text-sm">
                                    {weddingEvent.title}
                                  </span>
                                  <span className="mt-0.5 block break-words text-[11px] leading-snug text-[#8B1E2D]/80 sm:text-xs">
                                    {weddingEvent.date} <span aria-hidden="true">·</span> {weddingEvent.time}
                                  </span>
                                </span>
                                <input
                                  id={eventInputId}
                                  type="checkbox"
                                  name="events"
                                  value={weddingEvent.id}
                                  checked={isSelected}
                                  onChange={() => handleEventToggle(weddingEvent.id)}
                                  className="h-3.5 w-3.5 shrink-0 accent-[#8B1E2D] focus-visible:outline-none"
                                  aria-label={`Attend ${weddingEvent.title}`}
                                />
                              </label>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="rounded-xl border border-dashed border-[#C9A45C]/70 bg-[#FFFDF8] px-4 py-5 font-serif-elegant text-base italic text-[#736044]">
                          Ceremony details will be shared soon.
                        </p>
                      )}
                    </fieldset>
                  </motion.div>
                )}

                <div>
                  <label htmlFor="message" className="mb-1 block font-serif-royal text-sm font-bold uppercase leading-snug tracking-wide text-[#6D1429] sm:text-base">
                    Blessings &amp; Message to the Couple <span className="text-xs font-medium normal-case tracking-normal text-[#9A7730] sm:text-sm">(Optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Share your heartfelt wishes or dietary notes..."
                    className="h-[5.5rem] min-h-[5.5rem] w-full resize-y rounded-lg border border-[#C9A45C]/60 bg-[#FFFDF8] px-3 py-2.5 text-sm leading-relaxed text-[#4A0B1A] placeholder:text-[#8B1E2D]/45 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A45C]/35"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#FFF2B2] bg-gradient-to-r from-[#9A7730] via-[#D4AF37] to-[#9A7730] px-5 font-serif-royal text-sm font-bold uppercase tracking-[0.14em] text-[#3B0713] shadow transition hover:brightness-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6D1429]/35 disabled:cursor-wait disabled:opacity-65"
                >
                  <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{isSubmitting ? "Submitting RSVP…" : "Submit RSVP"}</span>
                </button>

                {rsvp.contactPhone?.trim() && (
                  <p className="text-center font-serif-elegant text-sm italic text-[#8B1E2D]/75">
                    For assistance, please contact {rsvp.contactPhone}.
                  </p>
                )}
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
