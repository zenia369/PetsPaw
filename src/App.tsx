import { createBrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

import router from "./routes/root";
import routerAdaptive from "./routes/root.adaptive";

import useMatchMedia from "./hooks/useMatchMedia";

import AppProviders from "./AppProviders";
import "./App.scss";

function App() {
  const { isDesktop } = useMatchMedia();
  return (
    <AppProviders
      appRouter={createBrowserRouter(isDesktop ? router : routerAdaptive)}
    >
      <ReactQueryDevtools initialIsOpen={false} />
    </AppProviders>
  );
}

export default App;
