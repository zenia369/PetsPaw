import { useQuery } from "react-query";
import { getBreedById } from "../services/breeds.service";

const useBreedInfo = (id: string) => {
  return useQuery(["breed-info", id], () => getBreedById(id));
};

export default useBreedInfo;
