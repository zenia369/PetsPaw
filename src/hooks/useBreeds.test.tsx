import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";
import { act, renderHook, waitFor } from "../test/test-utils";
import useBreeds from "./useBreeds";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

afterEach(() => {
  queryClient.clear();
});

type TUserBreeds = Parameters<typeof useBreeds>[0];

const renderUseBreedsHook = async (options?: Partial<TUserBreeds>) => {
  const renderedHook = renderHook(
    () =>
      useBreeds({
        params: options?.params ?? { limit: 5, order: "ASC" },
        pageQueryTag: options?.pageQueryTag ?? "test",
        addPetsPhotosTagToQuery: options?.addPetsPhotosTagToQuery ?? true,
      }),
    {
      wrapper,
    }
  );

  await waitFor(() =>
    expect(renderedHook.result.current.isLoading).toBeFalsy()
  );

  return renderedHook;
};

const mockBreedName = "Munchkin";

test("render hook should not fail", async () => {
  const { result } = await renderUseBreedsHook();

  expect(result.current).toEqual({
    isLoading: false,
    petsPhotos: expect.any(Array),
    breeds: expect.any(Array),
    refetchPetsPhotos: expect.any(Function),
    setActiveBreeds: expect.any(Function),
  });
  expect(result.current.petsPhotos?.length).toBe(5);
});

test("call setActiveBreeds to update petsPhotos", async () => {
  const { result } = await renderUseBreedsHook();

  await act(async () => {
    await result.current.setActiveBreeds(mockBreedName);
  });

  expect(
    result.current.petsPhotos
      ?.map((p) => p.breeds[0].name)
      .every((name) => name === mockBreedName)
  ).toBeTruthy();
});

test("call refetchPetsPhotos to update petsPhotos", async () => {
  const { result } = await renderUseBreedsHook({
    addPetsPhotosTagToQuery: false,
  });

  await act(async () => {
    await result.current.setActiveBreeds(mockBreedName);
  });

  expect(
    result.current.petsPhotos
      ?.map((p) => p.breeds[0].name)
      .every((name) => name === mockBreedName)
  ).toBeFalsy();

  await act(async () => {
    await result.current.refetchPetsPhotos();
  });

  expect(
    result.current.petsPhotos
      ?.map((p) => p.breeds[0].name)
      .every((name) => name === mockBreedName)
  ).toBeTruthy();
});
