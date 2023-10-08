import { useState, useLayoutEffect } from "react";

interface IScreens {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const screens = [
  "(max-width: 767px)",
  "(min-width: 768px) and (max-width: 1199px)",
  "(min-width: 1200px)",
];

export default () => {
  const mediaQueryLists = screens.map((s) => window.matchMedia(s));
  const screenMatches = () => mediaQueryLists.map((s) => s.matches);
  const [state, setState] = useState(screenMatches);

  useLayoutEffect(() => {
    const handler = () => {
      // console.log("mediaQueryLists", mediaQueryLists, screenMatches);

      setState(screenMatches);
    };
    mediaQueryLists.forEach((s) => s.addEventListener("change", handler));

    return () =>
      mediaQueryLists.forEach((s) => s.removeEventListener("change", handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ["isMobile", "isTablet", "isDesktop"].reduce(
    (acc, s, idx) => ({ ...acc, [s]: state[idx] }),
    {}
  ) as IScreens;
};
