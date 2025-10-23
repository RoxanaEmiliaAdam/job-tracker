import { useState, useEffect } from "react";

export function usePaginatedData<T>(
  data: T[],
  pageSize: number,
  resetDeps: unknown[] = []
) {
  const [pageIndex, setPageIndex] = useState(0);
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  // Reset page index when dependencies change (filters/search)
  useEffect(() => {
    setPageIndex(0);
  }, resetDeps);
  return { paginatedData, pageIndex, setPageIndex, totalPages };
}
