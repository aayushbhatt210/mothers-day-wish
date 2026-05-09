import { motion } from "framer-motion";
import { SparklesText } from "@/components/ui/sparkles-text";
import { Button } from "@/components/ui/button";

type LandingPageProps = {
  onStart: () => void;
};

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white via-cream to-light-cream px-6 pb-10 pt-16 text-center md:pt-10">
      <div className="absolute inset-0">
        <motion.div
          className="absolute left-[10%] top-[20%] h-20 w-20 rounded-full bg-primary-pink/30 blur-xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        <motion.div
          className="absolute right-[12%] top-[35%] h-24 w-24 rounded-full bg-accent-rose/25 blur-xl"
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 7 }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl overflow-visible">
        <SparklesText
          text="Happy Mother's Day"
          className="pb-2 text-4xl font-bold leading-[1.2] md:text-6xl"
        />
        <p className="mt-5 text-lg text-body-text md:text-xl">
          A celebration of memories with you.
        </p>
        <Button
          size="lg"
          className="mt-10 w-full max-w-xs"
          onClick={onStart}
          aria-label="Open album and start celebration"
        >
          <SparklesText
            text="Tap to Start"
            as="span"
            className="text-lg font-semibold text-white"
            sparkleCount={6}
            spawnRadius={15}
          />
        </Button>
      </div>
    </section>
  );
}
