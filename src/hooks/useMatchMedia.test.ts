import MatchMediaMock from "vitest-matchmedia-mock";
import { renderHook } from "../test/test-utils";
import useMatchMedia from "./useMatchMedia";

const matchMediaMock = new MatchMediaMock();

afterEach(() => {
  matchMediaMock.clear();
});
afterAll(() => {
  matchMediaMock.destroy();
});

test("screen in desktop", async () => {
  matchMediaMock.useMediaQuery("(min-width: 1200px)");
  const { result } = renderHook(() => useMatchMedia());

  expect(result.current).toEqual({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });
});

test("screen in tablet", () => {
  matchMediaMock.useMediaQuery("(min-width: 768px) and (max-width: 1199px)");
  const { result } = renderHook(() => useMatchMedia());

  expect(result.current).toEqual({
    isMobile: false,
    isTablet: true,
    isDesktop: false,
  });
});

test("screen in mobile", () => {
  matchMediaMock.useMediaQuery("(max-width: 767px)");
  const { result } = renderHook(() => useMatchMedia());

  expect(result.current).toEqual({
    isMobile: true,
    isTablet: false,
    isDesktop: false,
  });
});
