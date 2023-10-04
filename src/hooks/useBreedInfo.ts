import { useQuery } from "react-query";
import { getBreedById } from "../services/breeds.service";

export default (id: string) => {
  return useQuery(["breed-info", id], () => getBreedById(id));
};
