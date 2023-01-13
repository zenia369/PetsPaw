import {
  createContext,
  useState,
  useContext,
  useMemo,
  useLayoutEffect,
} from "react";

export enum Themes {
  light = "light-theme",
  dark = "dark-theme",
}

const ThemeContext = createContext<{
  theme: Themes;
  toggleTheme: () => void;
}>({
  theme: Themes.light,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: JSX.Element }) {
  const [theme, setTheme] = useState(Themes.light);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle(Themes.light);
    document.documentElement.classList.toggle(Themes.dark);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === Themes.light ? Themes.dark : Themes.light));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Should be context");
  }
  return context;
}
