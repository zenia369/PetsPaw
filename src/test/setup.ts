import "@testing-library/dom";
import MatchMediaMock from "vitest-matchmedia-mock";
import { server } from "./server";

const matchMediaMock = new MatchMediaMock();

beforeAll(() => server.listen());
afterAll(() => {
  server.close();
  matchMediaMock.destroy();
});
afterEach(() => {
  server.resetHandlers();
  matchMediaMock.clear();
});
