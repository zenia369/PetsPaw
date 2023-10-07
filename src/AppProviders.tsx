import { ReactNode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "./context/theme.context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function AppProviders({
  children,
  appRouter,
}: {
  children: ReactNode;
  appRouter: ReturnType<typeof createBrowserRouter>;
}) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={appRouter} />
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
