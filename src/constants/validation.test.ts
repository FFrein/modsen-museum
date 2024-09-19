import { searchSchema } from "./validation";

describe("searchSchema", () => {

  it("should validate a valid search query", async () => {
    await expect(
      searchSchema.validate({ search: "Valid Query" }),
    ).resolves.toEqual({ search: "Valid Query" });
  });

  it("should fail validation when search query is empty", async () => {
    await expect(searchSchema.validate({ search: "" })).rejects.toThrow(
      "Поисковый запрос обязателен",
    );
  });

  it("should fail validation when search query is less than 3 characters", async () => {
    await expect(searchSchema.validate({ search: "ab" })).rejects.toThrow(
      "Введите минимум 3 символа",
    );
  });

  it("should pass validation when search query is exactly 3 characters", async () => {
    await expect(searchSchema.validate({ search: "abc" })).resolves.toEqual({
      search: "abc",
    });
  });
});
