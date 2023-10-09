import appApi from "./appApi";
import getUserIdLocal from "../helpers/getUserIdLocal";

export const getListImgById = async (ids: string[]) => {
  return Promise.all(
    ids.map((id) => appApi.get(`images/${id}`).catch((e) => e.response))
  ).then((responses) => responses.map((res) => res.data));
};

export const uploadPhoto = (file: File) => {
  const data = new FormData();
  data.append("file", file, "file");
  data.append("sub_id", getUserIdLocal());

  return appApi.post("images/upload", data);
};
