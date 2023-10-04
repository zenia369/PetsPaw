import {
  createContext,
  useState,
  useContext,
  useMemo,
  useLayoutEffect,
  useCallback,
  ReactNode,
} from "react";
import { getItemLS, setItemLS } from "../helpers/localStorage";

const THEME_LOCAL_STORAGE_KEY = "PETS_PAW_THEME_LOCAL_STORAGE_KEY";

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

const getThemeFromLS = () => {
  try {
    const themeFromLS = getItemLS<Themes>(THEME_LOCAL_STORAGE_KEY);
    return themeFromLS;
  } catch (error) {
    return Themes.light;
  }
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Themes>(getThemeFromLS);

  useLayoutEffect(() => {
    document.documentElement.classList.add(theme);
    document.documentElement.classList.remove(
      theme === Themes.dark ? Themes.light : Themes.dark
    );
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === Themes.light ? Themes.dark : Themes.light;
      setItemLS(THEME_LOCAL_STORAGE_KEY, newTheme);
      return newTheme;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext should be called in ThemeProvider");
  }
  return context;
}
