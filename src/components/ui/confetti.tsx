import { useMemo } from "react";
import { motion } from "framer-motion";

type ConfettiProps = {
  trigger: number;
  count?: number;
};

const palette = ["#FFC0CB", "#F4A6C1", "#E8D4B8", "#FFFFFF"];

export function Confetti({ trigger, count = 36 }: ConfettiProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: `${trigger}-${i}`,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 2.6 + Math.random(),
        rotation: Math.random() * 360,
        color: palette[Math.floor(Math.random() * palette.length)],
      })),
    [trigger, count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute top-0 h-3 w-2 rounded-sm"
          style={{ left: `${piece.left}%`, backgroundColor: piece.color }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, 1, 1, 0],
            rotate: piece.rotation,
            x: [0, -20, 20, -10],
          }}
          transition={{
            delay: piece.delay,
            duration: piece.duration,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
