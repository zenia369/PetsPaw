import { useQuery, useQueryClient } from "react-query";
import { getBreeds, getListWithParams } from "../services/breeds.service";
import setActiveItem from "../helpers/setActiveItem";
import getBreedsId from "../helpers/getBreedsId";

interface IUseBreeds {
  params: object;
  pageQueryTag: string;
  addPetsPhotosTagToQuery?: boolean;
}

export default ({
  params,
  pageQueryTag,
  addPetsPhotosTagToQuery = true,
}: IUseBreeds) => {
  const queryClient = useQueryClient();

  const { data: breeds, isFetched: isFetchedBreeds } = useQuery(
    ["breeds", pageQueryTag],
    getBreeds,
    {
      refetchOnMount: false,
    }
  );

  const {
    data: petsPhotos,
    isFetching: isFetchingPetsPhotos,
    refetch: refetchPetsPhotos,
  } = useQuery(
    [
      "pet-photos",
      pageQueryTag,
      addPetsPhotosTagToQuery && getBreedsId(breeds),
    ],
    ({ queryKey }) => {
      const [, , reducedBreedsId] = queryKey;
      return getListWithParams({
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

  const isLoading =
    isFetchedBreeds && breeds && !isFetchingPetsPhotos && petsPhotos;

  return {
    isLoading,
    petsPhotos,
    breeds,
    refetchPetsPhotos,
    setActiveBreeds,
  };
};
