export const getPaginationRange = (
  total_pages: number,
  page: number,
): number[] => {
  const totalPages = Math.max(total_pages, 1);
  const currentPage = Math.max(page, 1);
  const start = Math.max(1, currentPage - Math.floor(5 / 2));
  const end = Math.min(totalPages, start + 5 - 1);

  if (totalPages <= 1) {
    return [1];
  }

  if (end - start + 1 < 5) {
    return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
  }

  return Array.from({ length: 5 }, (_, idx) => start + idx);
};
