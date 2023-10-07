import {
  RouteObject,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import { screen, render, userEvent } from "../test/test-utils";
import FullPageErrorFallback from "../components/UI/Errors/FullPageErrorFallback";
import {
  Themes,
  useThemeContext,
  ThemeProvider,
  THEME_LOCAL_STORAGE_KEY,
} from "./theme.context";

function ThemeTestComponent() {
  const { toggleTheme, theme } = useThemeContext();
  return (
    <>
      <p>Theme: {theme}</p>
      <button onClick={toggleTheme} type="button">
        Click
      </button>
    </>
  );
}

const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

afterEach(() => {
  consoleErrorSpy.mockClear();
});

test("throw error on using theme context without theme provider", async () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <ThemeTestComponent />,
      errorElement: <FullPageErrorFallback />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
    initialIndex: 0,
  });

  render(<RouterProvider router={router} />, {
    wrapper: ({ children }) => children,
  });

  expect(consoleErrorSpy).toHaveBeenCalled();
  expect(screen.getByRole("alert")).toBeDefined();
  expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(`
  "Uh oh... There's a problem. Try refreshing the app.useThemeContext should be called in ThemeProvider"
  `);
});

test("changing theme should work", async () => {
  render(<ThemeTestComponent />, { wrapper: ThemeProvider });

  expect(
    document.documentElement.classList.contains(Themes.light)
  ).toBeTruthy();
  expect(document.documentElement.classList.contains(Themes.dark)).toBeFalsy();
  expect(screen.getByText(/theme:/i).textContent).toBe(
    `Theme: ${Themes.light}`
  );

  await userEvent.click(screen.getByRole("button", { name: /click/i }));

  expect(document.documentElement.classList.contains(Themes.light)).toBeFalsy();
  expect(document.documentElement.classList.contains(Themes.dark)).toBeTruthy();
  expect(screen.getByText(/theme:/i).textContent).toBe(`Theme: ${Themes.dark}`);
});

test("use theme from LS", async () => {
  localStorage.setItem(THEME_LOCAL_STORAGE_KEY, JSON.stringify(Themes.dark));

  render(<ThemeTestComponent />, { wrapper: ThemeProvider });

  expect(screen.getByText(/theme:/i).textContent).toBe(`Theme: ${Themes.dark}`);
  expect(document.documentElement.classList.contains(Themes.dark)).toBeTruthy();

  localStorage.clear();
});
