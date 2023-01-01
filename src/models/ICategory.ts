export default interface ICategory {
  breeds: any[];
  categories: {
    id: number;
    name: string;
  }[];
  id: string;
  url: string;
  width: number;
  height: number;
}
