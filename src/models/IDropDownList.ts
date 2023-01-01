export interface IDropDownItem {
  active: boolean;
  name: string | number;
  id?: string | number;
}

export default interface IDropDownList {
  listItmes: IDropDownItem[];
  click: (arg: string | number) => void;
  dropWidthClass?: "small" | "large" | "infinity";
  dropWidthStyles?: object;
  dropName?: string;
  label?: string;
}
