import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RealBookAlbum } from "@/components/album/RealBookAlbum";
import { type AlbumConfig } from "@/components/types";
import { Button } from "@/components/ui/button";
import { SparklesText } from "@/components/ui/sparkles-text";

type AlbumProps = {
  onDone: () => void;
  onPageTurn: () => void;
};

export function Album({ onDone, onPageTurn }: AlbumProps) {
  const [data, setData] = useState<AlbumConfig | null>(null);
  const [readyToFinish, setReadyToFinish] = useState(false);

  useEffect(() => {
    fetch("/assets/data/albumData.json")
      .then((res) => res.json())
      .then((payload: AlbumConfig) => setData(payload));
  }, []);

  useEffect(() => {
    if (readyToFinish) {
      const timer = setTimeout(() => {
        onDone();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [readyToFinish, onDone]);

  if (!data) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-light-cream">
        <p className="text-body-text">Loading memories...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-light-cream px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl">
        <SparklesText
          text={data.title}
          as="h2"
          className="text-center text-3xl font-bold md:text-4xl"
        />
        <p className="mt-2 text-center text-body-text">{data.subtitle}</p>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: readyToFinish ? 0 : 1, y: readyToFinish ? -10 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <RealBookAlbum
            data={data}
            onPageTurn={onPageTurn}
            onReachedEnd={() => setReadyToFinish(true)}
          />
        </motion.div>
      </div>
    </section>
  );
}
