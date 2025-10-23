"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  pageIndex: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({
  pageIndex,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  const canPrev = pageIndex > 0;
  const canNext = pageIndex < totalPages - 1;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => canPrev && onPageChange(pageIndex - 1)}
            aria-disabled={!canPrev}
            className={`rounded-md px-2 py-1 transition 
              ${
                !canPrev
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100 active:bg-gray-200"
              }
            `}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => onPageChange(page)}
              isActive={pageIndex === page}
              className={`rounded-md px-3 py-1 transition ${
                pageIndex === page
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100 active:bg-gray-200"
              }`}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => canNext && onPageChange(pageIndex + 1)}
            aria-disabled={!canNext}
            className={`rounded-md px-2 py-1 transition 
              ${
                !canNext
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100 active:bg-gray-200"
              }
            `}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
