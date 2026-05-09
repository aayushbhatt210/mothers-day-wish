import { forwardRef, useState } from "react";
import { type BookPageLayout, type PageData } from "@/components/types";
import { Button } from "@/components/ui/button";

type BookPageProps = {
  page: PageData;
  side: "left" | "right";
  onAction?: () => void;
};

function getLayout(layout: BookPageLayout | undefined, count: number) {
  if (layout) return layout;
  if (count <= 2) return "grid2";
  if (count === 3) return "heroPlusThumbs";
  return "grid3";
}

function Photo({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [rotated, setRotated] = useState(false);

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <div
        className={`relative transition-all duration-500 ${
          rotated ? "h-[70.4%] w-[142%] rotate-90" : "h-full w-full"
        }`}
      >
        <img
          src={`/assets/photos/${src}`}
          alt={alt}
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth > img.naturalHeight) {
              setRotated(true);
            }
          }}
          className={`${className} h-full w-full object-contain`}
          onError={(event) => {
            event.currentTarget.src = "https://placehold.co/800x600/FFF9F7/C85A7C?text=Add+Photo";
          }}
        />
      </div>
    </div>
  );
}

export const BookPage = forwardRef<HTMLDivElement, BookPageProps>(function BookPage(
  { page, side, onAction, ...rest },
  ref
) {
  const layout = getLayout(page.layout, page.photos.length);
  const isVideoPage = page.mediaType === "video";
  const isFullMedia = page.layout === "fullMedia";
  const isMessagePage = page.layout === "message";

  return (
    <div
      ref={ref}
      {...rest}
      className={`relative h-full w-full overflow-hidden border border-[#e8d4b8]/60 bg-[#fffaf8] shadow-[0_8px_24px_rgba(0,0,0,0.12)] will-change-transform ${
        isFullMedia || isMessagePage ? "p-3 md:p-6" : "p-4 md:p-6"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.75),transparent_40%)]" />
      <div
        className={`pointer-events-none absolute top-0 h-full w-8 z-10 ${
          side === "left"
            ? "right-0 bg-gradient-to-l from-black/8 to-transparent"
            : "left-0 bg-gradient-to-r from-black/8 to-transparent"
        }`}
      />

      {isMessagePage ? (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#fffaf8] to-[#f8eee8] px-8 text-center">
          <h2 className="font-[Playfair_Display,serif] text-4xl font-bold text-dark-rose md:text-5xl">
            {page.memory || "Thank you and Love you"}
          </h2>
          <p className="mt-6 text-body-text opacity-80">Every moment with you is a treasure.</p>
          <Button size="lg" className="mt-12 scale-110" onClick={onAction}>
            Return to Home
          </Button>
        </div>
      ) : null}

      {isVideoPage && !isMessagePage ? (
        <div
          className={`${
            isFullMedia ? "h-full w-full" : "flex h-full flex-col gap-3"
          }`}
        >
          <div
            className={`${
              isFullMedia
                ? "h-full w-full"
                : "h-full w-full rounded-lg bg-black/10 p-2"
            }`}
          >
            <video
              src={`/assets/photos/${page.video ?? "video1.mp4"}`}
              controls
              playsInline
              preload="metadata"
              className={`h-full w-full object-contain bg-black ${
                isFullMedia ? "" : "rounded-lg"
              }`}
            />
          </div>
        </div>
      ) : null}

      {!isVideoPage && !isMessagePage && !isFullMedia && layout === "grid2" ? (
        <div className="grid h-full grid-cols-1 gap-3">
          {page.photos.slice(0, 2).map((photo, idx) => (
            <Photo
              key={photo}
              src={photo}
              alt={`Memory page ${page.pageNumber} photo ${idx + 1}`}
              className="h-full w-full rounded-lg object-cover"
            />
          ))}
        </div>
      ) : null}

      {!isVideoPage && !isMessagePage && !isFullMedia && layout === "grid3" ? (
        <div className="grid h-full grid-cols-2 gap-3">
          {page.photos.slice(0, 4).map((photo, idx) => (
            <Photo
              key={photo}
              src={photo}
              alt={`Memory page ${page.pageNumber} photo ${idx + 1}`}
              className={
                idx === 0
                  ? "col-span-2 h-full w-full rounded-lg object-cover"
                  : "h-full w-full rounded-lg object-cover"
              }
            />
          ))}
        </div>
      ) : null}

      {!isVideoPage && !isMessagePage && !isFullMedia && layout === "heroPlusThumbs" ? (
        <div className="grid h-full grid-cols-3 gap-3">
          <Photo
            src={page.photos[0]}
            alt={`Memory page ${page.pageNumber} hero`}
            className="col-span-2 h-full w-full rounded-lg object-cover"
          />
          <div className="grid grid-rows-2 gap-3">
            {page.photos.slice(1, 3).map((photo, idx) => (
              <Photo
                key={photo}
                src={photo}
                alt={`Memory page ${page.pageNumber} detail ${idx + 1}`}
                className="h-full w-full rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
      ) : null}

      {!isVideoPage && !isMessagePage && isFullMedia && (
        <div className="h-full w-full">
          <Photo
            src={page.photos[0]}
            alt={`Memory page ${page.pageNumber} full`}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
});
