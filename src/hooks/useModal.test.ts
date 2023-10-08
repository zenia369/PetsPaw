import { act, renderHook } from "../test/test-utils";
import useModal from "./useModal";

test("hook should work", async () => {
  const { result } = renderHook(() => useModal());

  expect(result.current[0]).toBeFalsy();

  act(() => {
    if (typeof result.current[1] === "function") result.current[1]();
  });

  expect(result.current[0]).toBeTruthy();
});
