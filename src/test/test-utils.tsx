import {
  RenderOptions,
  render as rednderRTL,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter } from "react-router-dom";
import { ReactNode } from "react";
import AppProviders from "../AppProviders";
import router from "../routes/root";

type TRenderWithRoute = RenderOptions & { route: string };

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByLabelText(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 }
  );

function TestAppWrapper({
  children,
  route,
}: {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
  // eslint-disable-next-line react/require-default-props
  route?: string;
}) {
  return (
    <AppProviders
      appRouter={createMemoryRouter(router, {
        initialEntries: [route ?? "/"],
      })}
    >
      {children}
    </AppProviders>
  );
}

function render(
  ui: React.ReactElement,
  { wrapper = TestAppWrapper, ...options }: RenderOptions = {}
) {
  return rednderRTL(ui, {
    wrapper,
    ...options,
  });
}

async function renderWithRoute({ route, ...options }: TRenderWithRoute) {
  const renderedRoute = rednderRTL(<TestAppWrapper route={route} />, options);

  await waitForLoadingToFinish();

  return renderedRoute;
}

export * from "@testing-library/react";
export { render, renderWithRoute, screen, userEvent, waitForLoadingToFinish };
