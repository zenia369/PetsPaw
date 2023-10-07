import {
  RenderOptions,
  cleanup,
  render as rednderRTL,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter } from "react-router-dom";
import { ReactNode } from "react";
import AppProviders from "../AppProviders";
import router from "../routes/root";

type CustomeRenderOptions = RenderOptions &
  Partial<{
    route: string | null;
    isWrapperIncluded: boolean;
  }>;

afterEach(() => {
  cleanup();
});

function TestAppWrapper({ children }: { children: ReactNode }) {
  return (
    <AppProviders appRouter={createMemoryRouter(router)}>
      {children}
    </AppProviders>
  );
}

function render(
  ui: React.ReactElement,
  {
    route = null,
    wrapper = TestAppWrapper,
    ...options
  }: CustomeRenderOptions = {}
) {
  if (route) window.history.pushState({}, "Test page", route);

  return rednderRTL(ui, {
    wrapper,
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
export { render, screen, userEvent, waitForLoadingToFinish };
