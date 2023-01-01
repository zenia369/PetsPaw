import appApi from "./appApi";
import ICategory from "../models/ICategory";

export default async () => {
  const { data } = await appApi.get<ICategory[]>("images/search");

  return data[0];
};
