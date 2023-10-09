import appApi from "./appApi";
import ICategory from "../models/ICategory";

export default async () => {
  return (await appApi.get<ICategory[]>("images/search")).data[0];
};
