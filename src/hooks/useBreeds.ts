import { useQuery, useQueryClient } from "react-query";
import { getBreeds, getBreedsWithParams } from "../services/breeds.service";
import setActiveItem from "../helpers/setActiveItem";
import getBreedsId from "../helpers/getBreedsId";

interface IUseBreeds {
  params: {
    limit: number;
    order: string;
    mime_types?: string;
  };
  pageQueryTag: string;
  addPetsPhotosTagToQuery?: boolean;
}

export default ({
  params,
  pageQueryTag,
  addPetsPhotosTagToQuery = true,
}: IUseBreeds) => {
  const queryClient = useQueryClient();

  const {
    data: breeds,
    isLoading: isLoadingBreeds,
    isFetched: isFetchedBreeds,
  } = useQuery(["breeds", pageQueryTag], getBreeds, {
    refetchOnMount: false,
  });

  const {
    data: petsPhotos,
    refetch: refetchPetsPhotos,
    isLoading: isLoadingPetsPhotos,
  } = useQuery(
    [
      "pet-photos",
      pageQueryTag,
      addPetsPhotosTagToQuery && getBreedsId(breeds),
    ],
    ({ queryKey }) => {
      const [, , reducedBreedsId] = queryKey;
      return getBreedsWithParams({
        breed_ids: reducedBreedsId || getBreedsId(breeds),
        ...params,
      });
    },
    {
      enabled: isFetchedBreeds,
      refetchOnMount: false,
    }
  );

  const setActiveBreeds = (arg: string | number) => {
    if (breeds) {
      queryClient.setQueryData(
        ["breeds", pageQueryTag],
        setActiveItem(breeds, arg, "name").newList
      );
    }
  };

  const isLoading = (isLoadingBreeds && isLoadingPetsPhotos) || !petsPhotos;

  return {
    isLoading,
    petsPhotos,
    breeds,
    refetchPetsPhotos,
    setActiveBreeds,
  };
};
