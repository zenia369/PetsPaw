import IBreed from "./IBreed";

export default interface ICategory {
  breeds: IBreed[];
  categories: {
    id: number;
    name: string;
  }[];
  id: string;
  url: string;
  width: number;
  height: number;
}
