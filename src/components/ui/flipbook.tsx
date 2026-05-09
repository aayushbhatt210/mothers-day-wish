import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type PageData } from "@/components/types";

type FlipbookProps = {
  page: PageData;
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
};

export function Flipbook({ page, currentPage, totalPages, onNext, onPrev }: FlipbookProps) {
  return (
    <div className="rounded-3xl border border-accent-rose/20 bg-white p-5 shadow-soft md:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {page.photos.map((photo, index) => (
          <img
            key={`${photo}-${index}`}
            src={`/assets/photos/${photo}`}
            alt={`Memory ${page.pageNumber} photo ${index + 1}`}
            loading="lazy"
            className="h-56 w-full rounded-2xl object-cover shadow-sm"
            onError={(event) => {
              event.currentTarget.src =
                "https://placehold.co/800x600/FFF9F7/C85A7C?text=Add+Photo";
            }}
          />
        ))}
      </div>
      <p className="mt-5 text-lg leading-relaxed text-body-text">{page.memory}</p>
      <p className="mt-2 text-sm font-semibold text-dark-rose">{page.date}</p>

      <div className="mt-7 flex items-center justify-between">
        <Button variant="secondary" onClick={onPrev} disabled={currentPage === 0}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Previous
        </Button>
        <span className="text-sm font-medium text-body-text">
          Page {currentPage + 1} of {totalPages}
        </span>
        <Button
          variant="secondary"
          onClick={onNext}
          disabled={currentPage === totalPages - 1}
        >
          Next <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
