import { useQuery } from "react-query";

import { getListWithParams } from "../services/breeds.service";

interface IUseBreedsList {
  isFetchedBreeds: boolean;
  params: object;
  queryTags: string[];
  reducedBreedsId: string | number | undefined;
}

export default ({
  isFetchedBreeds,
  params,
  queryTags,
  reducedBreedsId,
}: IUseBreedsList) => {
  const {
    data,
    isFetching: isFetchingList,
    refetch: refetchList,
  } = useQuery(
    queryTags,
    () =>
      getListWithParams({
        breed_ids: reducedBreedsId,
        ...params,
      }),
    {
      enabled: isFetchedBreeds,
      refetchOnMount: false,
    }
  );

  return {
    breedsList: data,
    isFetchingList,
    refetchList,
  };
};
