import { getItemLS, setItemLS } from "./localStorage";

const mockLSKey = "MOCK_LS_KEY";
const mockLSValue = JSON.stringify("MOCK_LS_VALUE");
const mockLSValueTwo = JSON.stringify("MOCK_LS_VALUE_TWO");
const mockLSDATA = new Map<string, string>().set(mockLSKey, mockLSValue);

const getItemSpy = vi
  .spyOn(Storage.prototype, "getItem")
  .mockImplementation((key) => mockLSDATA.get(key) ?? null);
const setItemSpy = vi
  .spyOn(Storage.prototype, "setItem")
  .mockImplementation((key, value) => mockLSDATA.set(key, value));

afterEach(() => {
  getItemSpy.mockClear();
  setItemSpy.mockClear();
});

test("throw error on get value from LS", async () => {
  const mockLSKeyTwo = "MOCK_LS_KEY_TWO";

  await expect(() => getItemLS(mockLSKeyTwo)).toThrowError("empy item");
});

test("get value from LS", async () => {
  getItemLS(mockLSKey);

  expect(localStorage.getItem).toHaveBeenCalledOnce();
  expect(localStorage.getItem).toHaveBeenCalledWith(mockLSKey);
  expect(localStorage.getItem).toHaveReturnedWith(mockLSValue);
});

test("set value from LS", async () => {
  setItemLS(mockLSKey, JSON.parse(mockLSValueTwo));

  expect(localStorage.setItem).toHaveBeenCalledOnce();
  expect(localStorage.setItem).toHaveBeenCalledWith(mockLSKey, mockLSValueTwo);

  getItemLS(mockLSKey);

  expect(localStorage.getItem).toHaveBeenCalledOnce();
  expect(localStorage.getItem).toHaveBeenCalledWith(mockLSKey);
  expect(localStorage.getItem).toHaveReturnedWith(mockLSValueTwo);
});
