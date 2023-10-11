import "@testing-library/jest-dom";
import MatchMediaMock from "vitest-matchmedia-mock";
import { cleanup } from "@testing-library/react";
import { server } from "./server";
import { queryClient } from "../AppProviders";

const matchMediaMock = new MatchMediaMock();

Object.defineProperty(window, "scrollTo", {
  writable: true,
  configurable: true,
  value: vi.fn(),
});

beforeAll(() => server.listen());
afterAll(() => {
  server.close();
  matchMediaMock.destroy();
});
afterEach(() => {
  server.resetHandlers();
  matchMediaMock.clear();
  cleanup();
  queryClient.clear();
  localStorage.clear();
});
