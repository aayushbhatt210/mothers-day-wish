import { forwardRef } from "react";
import { SparklesText } from "@/components/ui/sparkles-text";

type BookCoverProps = {
  title: string;
  subtitle: string;
  back?: boolean;
};

export const BookCover = forwardRef<HTMLDivElement, BookCoverProps>(function BookCover(
  { title, subtitle, back = false },
  ref
) {
  return (
    <div
      ref={ref}
      data-density="hard"
      className={`relative flex h-full w-full flex-col justify-center overflow-hidden border border-dark-rose/20 bg-gradient-to-br from-[#f7bfd0] via-[#f4a6c1] to-[#c85a7c] px-8 text-white shadow-[0_18px_30px_rgba(200,90,124,0.35)] ${
        back ? "rounded-l-md" : "rounded-r-md"
      }`}
      style={{
        boxShadow: back
          ? "-4px 0 0 rgba(0,0,0,0.1), -8px 0 0 rgba(0,0,0,0.05), 0 18px 30px rgba(200,90,124,0.35)"
          : "4px 0 0 rgba(0,0,0,0.1), 8px 0 0 rgba(0,0,0,0.05), 0 18px 30px rgba(200,90,124,0.35)",
      }}
    >
      <div
        className={`absolute top-0 h-full w-6 bg-gradient-to-r from-black/20 to-transparent ${
          back ? "right-0" : "left-0"
        }`}
      />
      <div
        className={`absolute top-0 h-full w-[2px] bg-white/10 ${
          back ? "right-6" : "left-6"
        }`}
      />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-6 top-10 h-24 w-24 rounded-full border border-white/60" />
        <div className="absolute bottom-14 right-10 h-16 w-16 rounded-full border border-white/60" />
      </div>
      {back ? (
        <div className="text-center">
          <SparklesText
            text="With Love"
            as="p"
            className="font-[Playfair_Display,serif] text-2xl text-white md:text-3xl"
            sparkleColors={["#FFFFFF", "#E8D4B8", "#FFB6D9"]}
          />
          <p className="mt-3 text-sm opacity-90 md:text-base">Thank you for every memory, Mom.</p>
        </div>
      ) : (
        <>
          <p className="text-xs uppercase tracking-[0.25em] text-white/85">Memories in Bloom</p>
          <SparklesText
            text={title}
            as="h2"
            className="mt-5 font-[Playfair_Display,serif] text-4xl leading-tight text-white md:text-5xl"
            sparkleColors={["#FFFFFF", "#E8D4B8", "#FFB6D9"]}
          />
          <p className="mt-5 text-sm text-white/90 md:text-base">{subtitle}</p>
        </>
      )}
    </div>
  );
});
