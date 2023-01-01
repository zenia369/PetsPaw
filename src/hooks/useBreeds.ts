import { useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";

import { BREEDS_QUERYTAG, getBreeds } from "../services/breeds.service";
import setActiveItem from "../helpers/setActiveItem";
import { IDropDownItem } from "../models/IDropDownList";

export default () => {
  const queryClient = useQueryClient();

  const { data: breeds, isFetched: isFetchedBreeds } = useQuery(
    BREEDS_QUERYTAG,
    getBreeds,
    {
      refetchOnMount: false,
    }
  );

  const setActiveBreeds = useCallback(
    (arg: string | number) => {
      if (breeds) {
        queryClient.setQueryData(
          BREEDS_QUERYTAG,
          setActiveItem(breeds, arg, "name").newList
        );
      }
    },
    [breeds, queryClient]
  );

  const reducedBreedsId = useMemo(() => {
    if (breeds) {
      const activeB = breeds.find((b) => b.active) as IDropDownItem;
      return activeB.name === "All"
        ? breeds.map((b) => b.id).toString()
        : activeB.id;
    }
    return "";
  }, [breeds]);

  return {
    breeds,
    isFetchedBreeds,
    reducedBreedsId,
    setActiveBreeds,
  };
};
