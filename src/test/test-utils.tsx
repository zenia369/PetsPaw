import {
  cleanup,
  render as rednderRTL,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { afterEach } from "vitest";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

function render(ui: React.ReactElement, options = {}) {
  return rednderRTL(ui, {
    wrapper: ({ children }) => children,
    ...options,
  });
}

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByLabelText(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 }
  );

export * from "@testing-library/react";
export { render, userEvent, waitForLoadingToFinish };
