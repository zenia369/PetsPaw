import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";
import { renderHook, waitFor } from "../test/test-utils";
import useBreedInfo from "./useBreedInfo";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

afterEach(() => {
  queryClient.clear();
});

test("render hook should work", async () => {
  const mockId = "N-94oSJ5T";
  const { result } = renderHook(() => useBreedInfo(mockId), { wrapper });

  await waitFor(() => expect(result.current.isLoading).toBeFalsy());

  expect(result.current.data).toEqual({
    id: mockId,
    url: expect.any(String),
    breeds: expect.any(Array),
    width: expect.any(Number),
    height: expect.any(Number),
  });
  expect(result.current.data?.breeds.length).toBeTruthy();
});
