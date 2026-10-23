import { weddingConfig } from "@/data/wedding-data";
import { FloralDivider } from "../traditional/OrnamentalBorders";

export const RSVPSection = () => {
  const { rsvp } = weddingConfig;

  if (!rsvp.enabled) return null;

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden bg-[#F5EBD8] px-4 py-8 text-[#4A0B1A] sm:px-5 sm:py-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-kolam-pattern opacity-[0.035]" aria-hidden="true" />

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
      </div>
    </section>
  );
};
