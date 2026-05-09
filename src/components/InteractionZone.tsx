import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Balloons } from "@/components/ui/balloons";
import { Confetti } from "@/components/ui/confetti";
import { SparklesText } from "@/components/ui/sparkles-text";

type InteractionZoneProps = {
  onContinue: () => void;
  onPlayEffect: (effect: "balloon" | "heart" | "sparkle" | "confetti" | "message") => void;
  onAnyButtonClick: () => void;
};

const rotatingMessages = [
  "Happy Mother's Day!",
  "You mean the world to me",
  "Thank you for everything, Mom",
  "Love you so much",
];

export function InteractionZone({ onContinue, onPlayEffect, onAnyButtonClick }: InteractionZoneProps) {
  const [balloonTrigger, setBalloonTrigger] = useState(0);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [heartTrigger, setHeartTrigger] = useState(0);
  const [sparkleTrigger, setSparkleTrigger] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [typedMessage, setTypedMessage] = useState("");
  const typingTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  const hearts = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: `${heartTrigger}-${i}`,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
      })),
    [heartTrigger]
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: `${sparkleTrigger}-${i}`,
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
      })),
    [sparkleTrigger]
  );

  const typeMessage = (message: string) => {
    if (typingTimerRef.current) window.clearInterval(typingTimerRef.current);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    setTypedMessage("");
    let i = 0;
    typingTimerRef.current = window.setInterval(() => {
      i += 1;
      setTypedMessage(message.slice(0, i));
      if (i >= message.length) {
        if (typingTimerRef.current) window.clearInterval(typingTimerRef.current);
        hideTimerRef.current = window.setTimeout(() => setTypedMessage(""), 2600);
      }
    }, 45);
  };

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) window.clearInterval(typingTimerRef.current);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-cream px-5 py-10 md:px-10">
      {balloonTrigger > 0 && <Balloons trigger={balloonTrigger} />}
      {confettiTrigger > 0 && <Confetti trigger={confettiTrigger} />}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute top-0 text-primary-pink"
            style={{ left: `${heart.left}%` }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ y: 700, opacity: [0, 1, 1, 0], rotate: [0, 12, -12] }}
            transition={{ delay: heart.delay, duration: 5, ease: "easeOut" }}
          >
            <Heart className="h-5 w-5 fill-current" />
          </motion.div>
        ))}

        <div className="absolute left-1/2 top-1/2">
          {sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              className="absolute h-2 w-2 rounded-full bg-warm-gold"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: sparkle.x, y: sparkle.y }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl rounded-3xl border border-accent-rose/20 bg-white/70 p-6 shadow-soft backdrop-blur">
        <SparklesText
          text="Celebrate Mom"
          as="h2"
          className="text-center text-2xl font-semibold md:text-3xl"
        />
        <p className="mt-2 text-center text-body-text">Tap the buttons to trigger magical moments.</p>

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
          <Button onClick={() => { setBalloonTrigger((v) => v + 1); onPlayEffect("balloon"); onAnyButtonClick(); }}>
            <SparklesText text="Launch Balloons" as="span" className="text-sm font-semibold text-white" sparkleCount={4} spawnRadius={12} />
          </Button>
          <Button onClick={() => { setHeartTrigger((v) => v + 1); onPlayEffect("heart"); onAnyButtonClick(); }}>
            <SparklesText text="Falling Hearts" as="span" className="text-sm font-semibold text-white" sparkleCount={4} spawnRadius={12} />
          </Button>
          <Button onClick={() => { setSparkleTrigger((v) => v + 1); onPlayEffect("sparkle"); onAnyButtonClick(); }}>
            <SparklesText text="Sparkles Burst" as="span" className="text-sm font-semibold text-white" sparkleCount={4} spawnRadius={12} />
          </Button>
          <Button onClick={() => { setConfettiTrigger((v) => v + 1); onPlayEffect("confetti"); onAnyButtonClick(); }}>
            <SparklesText text="Confetti Celebration" as="span" className="text-sm font-semibold text-white" sparkleCount={4} spawnRadius={12} />
          </Button>
          <Button
            className="md:col-span-2"
            onClick={() => {
              onPlayEffect("message");
              onAnyButtonClick();
              const next = messageIndex % rotatingMessages.length;
              setMessageIndex(next);
              typeMessage(rotatingMessages[next]);
              setMessageIndex((value) => (value + 1) % rotatingMessages.length);
            }}
          >
            <SparklesText text="Message Display" as="span" className="text-sm font-semibold text-white" sparkleCount={6} spawnRadius={15} />
          </Button>
        </div>

        {typedMessage ? (
          <div className="mt-6 text-center">
            <SparklesText
              text={typedMessage}
              as="h3"
              className="text-xl font-semibold"
              sparkleCount={8}
            />
          </div>
        ) : null}

        <div className="mt-8 text-center">
          <Button variant="secondary" size="lg" onClick={onContinue}>
            <SparklesText
              text="Continue to Memories"
              as="span"
              className="text-lg font-semibold"
              sparkleCount={6}
              spawnRadius={15}
            />
          </Button>
        </div>
      </div>
    </section>
  );
}
