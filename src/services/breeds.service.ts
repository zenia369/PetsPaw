import appApi from "./appApi";

import IBreed from "../models/IBreed";
import ICategory from "../models/ICategory";
import { IDropDownItem } from "../models/IDropDownList";

const ALL_CATEGORIES_NAME = "All Cateories";
export const ALL_BREEDS = "All";

export const getCategories = async (): Promise<IDropDownItem[]> => {
  const { data } = await appApi.get<IDropDownItem[]>("categories");

  return [
    { id: "all categories", name: ALL_CATEGORIES_NAME, active: true },
    ...data.map((el) => ({ ...el, active: false })),
  ];
};

function createFetchListItem(id: string | number | undefined, limit: number) {
  return appApi.get(`images/search?category_ids=${id}&limit=${limit}`);
}

export const getList = async (
  categories: IDropDownItem[] | undefined,
  limit: number
): Promise<ICategory[]> => {
  const list: ICategory[][] = [];
  if (categories) {
    const activeCategories = categories.find((c) => c.active) as IDropDownItem;

    if (activeCategories.name === ALL_CATEGORIES_NAME) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].id) {
          const { id } = categories[i];
          // eslint-disable-next-line no-await-in-loop
          const { data } = await createFetchListItem(id, limit);
          list.push(data);
        }
      }
    } else {
      const { data } = await createFetchListItem(activeCategories.id, limit);
      list.push(data);
    }

    return list.reduce((acc, c) => [...acc, ...c], []);
  }
  return Promise.resolve([]);
};

export const getBreedById = async (id: string) => {
  const { data } = await appApi.get<IBreed>(`images/${id}`);
  return data;
};

export const getBreeds = async () => {
  const { data } = await appApi.get<IDropDownItem[]>("breeds");

  return [
    {
      name: ALL_BREEDS,
      active: true,
      id: Date.now(),
    },
    ...data,
  ];
};

export const getListWithParams = async (params: object) => {
  const { data } = await appApi.get<IBreed[]>("images/search", {
    params,
  });

  return data;
};
