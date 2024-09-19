import { getPaginationRange } from "./paginationUtils";

describe("getPaginationRange", () => {
  test("should return correct range when there are multiple pages", () => {
    expect(getPaginationRange(10, 5)).toEqual([3, 4, 5, 6, 7]);
  });

  test("should return the first page when there is only one page", () => {
    expect(getPaginationRange(1, 1)).toEqual([1]);
  });

  test("should return a range that includes the current page when there are fewer pages than the range", () => {
    expect(getPaginationRange(4, 2)).toEqual([1, 2, 3, 4]);
  });

  test("should handle current page at the beginning of the range", () => {
    expect(getPaginationRange(10, 1)).toEqual([1, 2, 3, 4, 5]);
  });

  test("should handle when total_pages is zero", () => {
    expect(getPaginationRange(0, 1)).toEqual([1]);
  });

  test("should handle when page is less than 1", () => {
    expect(getPaginationRange(10, 0)).toEqual([1, 2, 3, 4, 5]);
  });
});
