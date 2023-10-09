import appApi from "./appApi";

import IBreed from "../models/IBreed";
import { IDropDownItem } from "../models/IDropDownList";

export const ALL_BREEDS = "All";
export const MOCK_BREEDS_ITEM = {
  name: ALL_BREEDS,
  active: true,
  id: crypto.randomUUID(),
};

export const getBreedById = async (id: string) => {
  const { data } = await appApi.get<IBreed>(`images/${id}`);
  return data;
};

export const getBreeds = async () => {
  const { data } = await appApi.get<IDropDownItem[]>("breeds");
  return [MOCK_BREEDS_ITEM, ...data];
};

export const getBreedsWithParams = async (params: {
  limit?: number;
  order?: string;
  breed_ids?: string;
}) => {
  const { data } = await appApi.get<IBreed[]>("images/search", {
    params,
  });
  return data;
};
