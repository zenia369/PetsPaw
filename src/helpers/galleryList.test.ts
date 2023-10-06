import galleryList from "./galleryList";

test("should return correct array", () => {
  const result = galleryList([1, 2, 3, 4], 2);

  expect(result).toStrictEqual([
    [1, 2],
    [3, 4],
  ]);
});
