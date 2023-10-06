import setActiveItem from "./setActiveItem";

const mockData = [
  { id: 1, value: "value 1" },
  { id: 2, value: "value 2" },
  { id: 3, value: "value 3" },
];
const mockResultData = [
  { id: 1, value: "value 1", active: false },
  { id: 2, value: "value 2", active: true },
  { id: 3, value: "value 3", active: false },
];

test("should work correctly", () => {
  const result = setActiveItem(mockData, 2, "id");

  expect(result.newList).toStrictEqual(mockResultData);
  expect(result.newActive).toBe(2);
});
