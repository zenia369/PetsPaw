import stopPropagation from "./stopPropagation";

const mockStopPropagation = vi.fn();
const mockEvent = {
  stopPropagation: mockStopPropagation,
};

test("should work correctly", () => {
  stopPropagation(mockEvent);

  expect(mockStopPropagation).toHaveBeenCalledOnce();
});

test("should throw error", () => {
  expect(() => stopPropagation({})).toThrowError(
    "event.stopPropagation is not a function"
  );
});
