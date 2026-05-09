import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookCover } from "@/components/album/BookCover";
import { BookPage } from "@/components/album/BookPage";
import { Button } from "@/components/ui/button";
import { type AlbumConfig, type PageData } from "@/components/types";
import { SparklesText } from "@/components/ui/sparkles-text";

type RealBookAlbumProps = {
  data: AlbumConfig;
  onReachedEnd: () => void;
  onPageTurn: () => void;
};

type SpreadSide = 
  | { type: "cover"; back: boolean; data?: undefined } 
  | { type: "page"; data: PageData; back?: undefined }
  | { type: "empty"; data?: undefined; back?: undefined };

type Spread = {
  left: SpreadSide;
  right: SpreadSide;
};

export function RealBookAlbum({ data, onReachedEnd, onPageTurn }: RealBookAlbumProps) {
  const [activeSpreadIndex, setActiveSpreadIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);

  // Map flat pages to spreads with a realistic book structure
  const spreads = useMemo<Spread[]>(() => {
    const s: Spread[] = [];
    
    // Spread 0: Closed book (Empty | Front Cover)
    s.push({
      left: { type: "empty" },
      right: { type: "cover", back: false }
    });

    // Inner Pages: (Page 1 | Page 2), (Page 3 | Page 4), etc.
    for (let i = 0; i < data.pages.length; i += 2) {
      s.push({
        left: { type: "page", data: data.pages[i] },
        right: data.pages[i + 1] ? { type: "page", data: data.pages[i + 1] } : { type: "empty" }
      });
    }

    // Last Spread: (Back Cover | Empty) or (Last Page | Back Cover)
    const lastSpread = s[s.length - 1];
    if (lastSpread.right.type === "empty") {
      lastSpread.right = { type: "cover", back: true };
    } else {
      s.push({
        left: { type: "cover", back: true },
        right: { type: "empty" }
      });
    }

    return s;
  }, [data]);

  // Displayed state for synchronization
  const [displayedLeft, setDisplayedLeft] = useState<SpreadSide>(spreads[0].left);
  const [displayedRight, setDisplayedRight] = useState<SpreadSide>(spreads[0].right);

  const baseWidth = isMobile ? Math.min(viewportWidth - 36, 360) : 420;
  const baseHeight = Math.round(baseWidth * 1.42);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNext = useCallback(() => {
    if (isFlipping || activeSpreadIndex >= spreads.length - 1) return;

    const nextIndex = activeSpreadIndex + 1;
    const nextPage = spreads[nextIndex];

    setIsFlipping(true);
    setFlipDirection("next");
    onPageTurn();

    // 30% timing (150ms of 500ms): Update the right side content early
    setTimeout(() => {
      setDisplayedRight(nextPage.right);
    }, 150);

    // 100% timing (500ms): Update left side and complete
    setTimeout(() => {
      setDisplayedLeft(nextPage.left);
      setActiveSpreadIndex(nextIndex);
      setIsFlipping(false);
      if (nextIndex === spreads.length - 1) onReachedEnd();
    }, 500);
  }, [activeSpreadIndex, spreads, isFlipping, onPageTurn, onReachedEnd]);

  const handlePrev = useCallback(() => {
    if (isFlipping || activeSpreadIndex <= 0) return;

    const prevIndex = activeSpreadIndex - 1;
    const prevPage = spreads[prevIndex];

    setIsFlipping(true);
    setFlipDirection("prev");
    onPageTurn();

    // Reverse timing for back-flip
    setTimeout(() => {
      setDisplayedLeft(prevPage.left);
    }, 150);

    setTimeout(() => {
      setDisplayedRight(prevPage.right);
      setActiveSpreadIndex(prevIndex);
      setIsFlipping(false);
    }, 500);
  }, [activeSpreadIndex, spreads, isFlipping, onPageTurn]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNext, handlePrev]);

  const progressLabel = `Spread ${activeSpreadIndex + 1} of ${spreads.length}`;
  const allPhotos = useMemo(() => data.pages.flatMap((p) => p.photos), [data]);

  const renderSide = (side: SpreadSide, sideName: "left" | "right") => {
    if (side.type === "empty") {
      return <div className="h-full w-full bg-cream/20" />;
    }
    if (side.type === "cover") {
      return <BookCover title={data.title} subtitle={data.subtitle} back={!!side.back} />;
    }
    return <BookPage page={side.data} side={sideName} />;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="fixed -z-50 h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        {allPhotos.map((src) => (
          <img key={src} src={`/assets/photos/${src}`} alt="preload" />
        ))}
      </div>

      <div className="book-shell relative mt-8 flex w-full max-w-[980px] items-center justify-center perspective-[2000px]">
        {/* Book Container */}
        <div 
          className="relative flex shadow-2xl"
          style={{ width: baseWidth * 2, height: baseHeight }}
        >
          {/* Left Side Container */}
          <div 
            className={`relative overflow-hidden ${displayedLeft.type !== 'empty' ? 'border-r border-black/5' : ''}`}
            style={{ width: baseWidth, height: baseHeight, backgroundColor: displayedLeft.type === 'empty' ? 'transparent' : '#fffaf8' }}
          >
            {renderSide(displayedLeft, "left")}
            {displayedLeft.type !== 'empty' && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/5 to-transparent" />
            )}
          </div>

          {/* Right Side Container */}
          <div 
            className={`relative overflow-hidden ${displayedRight.type !== 'empty' ? 'border-l border-black/5' : ''}`}
            style={{ width: baseWidth, height: baseHeight, backgroundColor: displayedRight.type === 'empty' ? 'transparent' : '#fffaf8' }}
          >
            {renderSide(displayedRight, "right")}
            {displayedRight.type !== 'empty' && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-black/5 to-transparent" />
            )}
          </div>

          {/* Flipping Page Overlay */}
          <AnimatePresence>
            {isFlipping && (
              <motion.div
                key={`flip-${activeSpreadIndex}-${flipDirection}`}
                className="absolute top-0 z-50 origin-left overflow-visible"
                style={{ 
                  left: baseWidth, 
                  width: baseWidth, 
                  height: baseHeight,
                  transformStyle: "preserve-3d"
                }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: flipDirection === "next" ? -180 : 0 }}
                exit={{ rotateY: flipDirection === "next" ? -180 : 0 }}
                transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1.000] }}
              >
                {/* Front Side of the flipping page */}
                <div 
                  className="absolute inset-0 h-full w-full shadow-2xl"
                  style={{ backfaceVisibility: "hidden", zIndex: 2 }}
                >
                  {renderSide(spreads[activeSpreadIndex][flipDirection === "next" ? "right" : "left"], flipDirection === "next" ? "right" : "left")}
                  <motion.div 
                    className="absolute inset-0 bg-black/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Back Side of the flipping page */}
                <div 
                  className="absolute inset-0 h-full w-full"
                  style={{ 
                    backfaceVisibility: "hidden", 
                    transform: "rotateY(180deg)",
                    zIndex: 1
                  }}
                >
                  {renderSide(spreads[activeSpreadIndex + (flipDirection === "next" ? 1 : -1)][flipDirection === "next" ? "left" : "right"], flipDirection === "next" ? "left" : "right")}
                  <motion.div 
                    className="absolute inset-0 bg-black/5"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 flex w-full max-w-xl items-center justify-between gap-3">
        <Button variant="secondary" onClick={handlePrev} disabled={isFlipping || activeSpreadIndex === 0}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          <SparklesText text="Previous" as="span" className="text-sm font-semibold" sparkleCount={4} />
        </Button>
        <p className="text-sm font-medium text-body-text">{progressLabel}</p>
        <Button variant="secondary" onClick={handleNext} disabled={isFlipping || activeSpreadIndex === spreads.length - 1}>
          <SparklesText text="Next" as="span" className="text-sm font-semibold" sparkleCount={4} />
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
