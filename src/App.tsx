import { RouterProvider } from "react-router-dom";
import "./App.scss";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import router from "./routes/root";
import routerAdaptive from "./routes/root.adaptive";
import { ThemeProvider } from "./context/theme.context";

import useMatchMedia from "./hooks/useMatchMedia";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { isDesktop } = useMatchMedia();
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={isDesktop ? router : routerAdaptive} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
