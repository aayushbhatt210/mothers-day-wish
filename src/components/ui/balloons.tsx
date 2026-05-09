import { motion } from "framer-motion";

type BalloonsProps = {
  trigger: number;
  count?: number;
};

const colors = ["#FFC0CB", "#F4A6C1", "#E8D4B8"];

export function Balloons({ trigger, count = 12 }: BalloonsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = (i / count) * 100 + Math.random() * 5;
        const duration = 3 + Math.random() * 2;
        const color = colors[i % colors.length];
        return (
          <motion.div
            key={`${trigger}-${i}`}
            className="absolute bottom-[-60px]"
            style={{ left: `${left}%` }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -900, opacity: [0, 1, 1, 0], x: [0, -8, 8, 0] }}
            transition={{ duration, ease: "easeOut" }}
          >
            <div
              className="h-12 w-9 rounded-[50%] shadow-soft"
              style={{ backgroundColor: color }}
            />
            <div className="mx-auto h-8 w-[1px] bg-dark-rose/30" />
          </motion.div>
        );
      })}
    </div>
  );
}
