import { currentTime } from "./getDate";

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  localStorage.clear();
  vi.useRealTimers();
});

test("should return correct time", () => {
  const date = new Date("2023-10-10T11:08:00");
  vi.setSystemTime(date);

  const returnDate = currentTime();

  expect(returnDate).toBe(`${date.getHours()}:08`);
});
