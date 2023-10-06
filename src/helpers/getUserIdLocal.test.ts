import getUserIdLocal, { USER_ID } from "./getUserIdLocal";

const mockUserId = "MOCK_USER_ID";

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  localStorage.clear();
  vi.useRealTimers();
});

test("should return correct user id", () => {
  localStorage.setItem(USER_ID, JSON.stringify(mockUserId));

  const returnedUserId = getUserIdLocal();

  expect(returnedUserId).toBe(mockUserId);
});

test("should generate new user id", () => {
  const date = Date.now();
  vi.setSystemTime(date);

  const returnedUserId = getUserIdLocal();

  expect(returnedUserId).toBe(date.toString());
});
