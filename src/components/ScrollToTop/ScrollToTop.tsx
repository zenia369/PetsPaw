import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return children;
};

export default ScrollToTop;
