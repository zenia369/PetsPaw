import appApi from "./appApi";
import getUserIdLocal from "../helpers/getUserIdLocal";

export const getImgById = async (id: string) => {
  const { data } = await appApi.get(`images/${id}`);
  return data;
};

export const getListImgById = async (ids: string[]) => {
  const list: any[] = [];

  for (let i = 0; i < ids.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const { data } = await appApi.get(`images/${ids[i]}`);
    list.push(data);
  }

  return list;
};

export const getBreedsByQuery = async (search: string[]) => {
  const { data } = await appApi.get(
    `images/search?limit=10&breed_ids=${search}`
  );
  return data;
};

export const getGalleryList = (
  order: string,
  limit: number,
  breed_ids: string,
  mime_types: string
) =>
  appApi.get("images/search", {
    params: {
      order,
      limit,
      breed_ids,
      mime_types,
    },
  });

export const uploadPhoto = (file: File) => {
  const data = new FormData();
  data.append("file", file, "file");
  data.append("sub_id", getUserIdLocal());

  return appApi.post("images/upload", data);
};

export default {};
