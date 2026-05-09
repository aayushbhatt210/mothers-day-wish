import { useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookCover } from "@/components/album/BookCover";
import { BookPage } from "@/components/album/BookPage";
import { Button } from "@/components/ui/button";
import { type AlbumConfig } from "@/components/types";
import { SparklesText } from "@/components/ui/sparkles-text";

type RealBookAlbumProps = {
  data: AlbumConfig;
  onReachedEnd: () => void;
  onPageTurn: () => void;
};

type FlipBookRef = {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    getCurrentPageIndex: () => number;
  };
};

export function RealBookAlbum({ data, onReachedEnd, onPageTurn }: RealBookAlbumProps) {
  const PageFlip = HTMLFlipBook as any;
  const [activePage, setActivePage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const flipRef = useRef<FlipBookRef | null>(null);
  const needsFiller = data.pages.length % 2 !== 0;
  const totalPhysicalPages = data.pages.length + 2 + (needsFiller ? 1 : 0);
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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const goNext = () => flipRef.current?.pageFlip().flipNext();
  const goPrev = () => flipRef.current?.pageFlip().flipPrev();

  const isAtEnd = activePage >= totalPhysicalPages - 1;
  const isAtStart = activePage === 0;
  const isCollapsed = isAtEnd || isAtStart;

  const progressLabel = `Page ${Math.max(1, activePage + 1)} of ${totalPhysicalPages}`;
  const allPhotos = useMemo(() => data.pages.flatMap((p) => p.photos), [data]);

  return (
    <div className="flex flex-col items-center">
      {/* Hidden pre-loader to ensure all photos are cached and ready for smooth flipping */}
      <div className="fixed -z-50 h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        {allPhotos.map((src) => (
          <img key={src} src={`/assets/photos/${src}`} alt="preload" />
        ))}
      </div>

      <div
        className={`book-shell relative mt-8 w-full max-w-[980px] overflow-visible rounded-2xl p-4 md:p-8 ${
          isCollapsed ? "book-collapsed" : "book-stack-effect"
        }`}
      >
        <div className="pointer-events-none absolute left-1/2 top-6 hidden h-[78%] w-5 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#c85a7c] to-[#f4a6c1] opacity-80 blur-[1px] md:block" />
        <div className="relative overflow-hidden rounded-lg bg-light-cream/50 shadow-inner">
          <PageFlip
            width={baseWidth}
            height={baseHeight}
            size={isMobile ? "fixed" : "stretch"}
            minWidth={Math.max(280, baseWidth - 24)}
            maxWidth={baseWidth}
            minHeight={Math.max(420, baseHeight - 40)}
            maxHeight={baseHeight}
            maxShadowOpacity={0.75}
            mobileScrollSupport
            showCover
            usePortrait={isMobile}
            ref={flipRef}
            className="mx-auto"
            startPage={0}
            flippingTime={800}
            useMouseEvents={true}
            disableFlipByClick={false}
            showPageCorners={true}
            drawShadow={true}
            onFlip={(event: any) => {
              const nextPage = event.data;
              setActivePage(nextPage);
              onPageTurn();
              if (nextPage >= totalPhysicalPages - 1) onReachedEnd();
            }}
          >
            {[
              <BookCover key="front-cover" title={data.title} subtitle={data.subtitle} data-density="soft" />,
              ...data.pages.map((page, idx) => (
                <BookPage
                  key={page.pageNumber}
                  page={{ ...page, pageNumber: idx + 1 }}
                  side={(idx + 1) % 2 === 0 ? "left" : "right"}
                  onAction={onReachedEnd}
                  data-density="soft"
                />
              )),
              needsFiller ? (
                <div key="filler-page" className="h-full w-full bg-[#fffaf8]" data-density="soft" />
              ) : null,
              <BookCover key="back-cover" title={data.title} subtitle={data.subtitle} back data-density="soft" />
            ].filter(Boolean)}
          </PageFlip>
        </div>
      </div>

      <div className="mt-6 flex w-full max-w-xl items-center justify-between gap-3">
        <Button variant="secondary" onClick={goPrev} aria-label="Previous page">
          <ChevronLeft className="mr-1 h-4 w-4" />
          <SparklesText
            text="Previous"
            as="span"
            className="text-sm font-semibold"
            sparkleCount={4}
            spawnRadius={10}
          />
        </Button>
        <p className="text-sm font-medium text-body-text">{progressLabel}</p>
        <Button variant="secondary" onClick={goNext} aria-label="Next page">
          <SparklesText
            text="Next"
            as="span"
            className="text-sm font-semibold"
            sparkleCount={4}
            spawnRadius={10}
          />
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
